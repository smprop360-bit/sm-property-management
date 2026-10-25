'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Building2, Plus, UserPlus, Users } from 'lucide-react'
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
    <div className="mx-auto w-full max-w-[1500px] space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-7 text-white shadow-[0_18px_45px_rgba(8,39,79,0.16)] sm:px-8">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-brand-gold-soft">סקירה כללית</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">דשבורד</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
              תמונת מצב של הלידים והנכסים שלך, במקום אחד מסודר וברור.
            </p>
          </div>
          <Link
            href="/admin/properties/new"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            <Plus size={17} aria-hidden="true" />
            הוסף נכס חדש
          </Link>
        </div>
        <div className="pointer-events-none absolute -start-16 -top-24 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -end-10 -bottom-36 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </section>

      <section aria-label="מדדים מרכזיים" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <LeadsChart />
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-brand-muted">קיצורי דרך</p>
              <h2 className="mt-1 text-lg font-semibold text-brand-navy">מה תרצה לעשות?</h2>
            </div>
            <div className="rounded-xl bg-brand-gold/10 p-2.5 text-brand-gold">
              <ArrowLeft size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <Link
              href="/admin/leads"
              className="group flex min-h-12 items-center justify-between rounded-xl border border-slate-200 px-4 text-sm font-medium text-brand-navy transition-colors hover:border-brand-gold/50 hover:bg-brand-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <span className="flex items-center gap-3">
                <span className="rounded-lg bg-brand-navy/5 p-2 text-brand-navy"><Users size={16} aria-hidden="true" /></span>
                ניהול לידים
              </span>
              <ArrowLeft size={16} className="text-slate-400 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/admin/properties"
              className="group flex min-h-12 items-center justify-between rounded-xl border border-slate-200 px-4 text-sm font-medium text-brand-navy transition-colors hover:border-brand-gold/50 hover:bg-brand-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <span className="flex items-center gap-3">
                <span className="rounded-lg bg-brand-gold/10 p-2 text-brand-gold"><Building2 size={16} aria-hidden="true" /></span>
                צפייה בנכסים
              </span>
              <ArrowLeft size={16} className="text-slate-400 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <RecentLeadsTable />
    </div>
  )
}
