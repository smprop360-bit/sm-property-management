'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { createClient } from '@/lib/supabase/client'

interface DayCount {
  day: string
  count: number
}

export function LeadsChart() {
  const [data, setData] = useState<DayCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: rows } = await supabase
        .from('leads')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())

      const counts: Record<string, number> = {}
      const today = new Date()
      for (let i = 29; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        counts[key] = 0
      }
      for (const row of rows ?? []) {
        const key = (row.created_at as string).slice(0, 10)
        if (key in counts) counts[key]++
      }

      setData(
        Object.entries(counts).map(([day, count]) => ({
          day: day.slice(5),
          count,
        }))
      )
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-[220px] bg-gray-50 animate-pulse rounded" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-base font-semibold text-brand-navy mb-4">לידים — 30 יום אחרונים</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Bar dataKey="count" name="לידים" fill="#C9A227" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
