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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          {loading ? (
            <div className="h-9 w-16 bg-gray-100 animate-pulse rounded" />
          ) : (
            <p className="text-4xl font-bold text-brand-navy">{value}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
          <Icon size={24} className="text-brand-gold" />
        </div>
      </div>
    </div>
  )
}
