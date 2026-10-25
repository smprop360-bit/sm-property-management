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
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <div className="h-[220px] animate-pulse rounded-xl bg-slate-50" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand-muted">פעילות אחרונה</p>
          <h3 className="mt-1 text-lg font-semibold text-brand-navy">לידים — 30 יום אחרונים</h3>
        </div>
        <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold">לידים</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf3" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
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
          <Bar dataKey="count" name="לידים" fill="#C8902E" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
