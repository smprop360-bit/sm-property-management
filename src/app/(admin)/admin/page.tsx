'use client'

import { useEffect, useState } from 'react'
import { UserPlus, Users, Building2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AdminStatsCard } from '@/components/admin/AdminStatsCard'
import { LeadsChart } from '@/components/admin/LeadsChart'
import { RecentLeadsTable } from '@/components/admin/RecentLeadsTable'

export default function AdminDashboardPage() {
  const [todayCount, setTodayCount] = useState(0)
  const [weekCount, setWeekCount] = useState(0)
  const [activeProperties, setActiveProperties] = useState(0)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      sevenDaysAgo.setHours(0, 0, 0, 0)

      const [{ count: todayC }, { count: weekC }, { count: propC }] = await Promise.all([
        supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString()),
        supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString()),
        supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active'),
      ])

      setTodayCount(todayC ?? 0)
      setWeekCount(weekC ?? 0)
      setActiveProperties(propC ?? 0)
      setStatsLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">דשבורד</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatsCard
          label="לידים חדשים היום"
          value={todayCount}
          icon={UserPlus}
          loading={statsLoading}
        />
        <AdminStatsCard
          label="לידים השבוע"
          value={weekCount}
          icon={Users}
          loading={statsLoading}
        />
        <AdminStatsCard
          label="נכסים פעילים"
          value={activeProperties}
          icon={Building2}
          loading={statsLoading}
        />
      </div>
      <LeadsChart />
      <RecentLeadsTable />
    </div>
  )
}
