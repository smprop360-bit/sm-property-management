'use client'

import type { LucideIcon } from 'lucide-react'

interface AdminStatsCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  loading?: boolean
}

export function AdminStatsCard({ label, value, icon: Icon, loading }: AdminStatsCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-shadow duration-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.09)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-brand-muted">{label}</p>
          {loading ? (
            <div className="h-10 w-20 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="text-4xl font-semibold tracking-tight text-brand-navy">{value}</p>
          )}
          <p className="mt-2 text-xs text-slate-400">נתונים מעודכנים בזמן אמת</p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold transition-transform duration-200 group-hover:-translate-y-0.5">
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
