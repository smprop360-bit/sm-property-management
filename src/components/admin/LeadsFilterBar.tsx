'use client'

import { Input } from '@/components/ui/input'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'
import { LEAD_STATUSES } from '@/lib/types/lead'
import { Search } from 'lucide-react'

interface LeadsFilterBarProps {
  searchQuery: string
  onSearchChange: (v: string) => void
  filterType: string
  onTypeChange: (v: string) => void
  filterStatus: string
  onStatusChange: (v: string) => void
}

export function LeadsFilterBar({
  searchQuery,
  onSearchChange,
  filterType,
  onTypeChange,
  filterStatus,
  onStatusChange,
}: LeadsFilterBarProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400 pointer-events-none" />
        <Input
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="חיפוש לפי שם או טלפון"
          className="ps-9"
        />
      </div>
      <select
        value={filterType}
        onChange={e => onTypeChange(e.target.value)}
        className="h-10 rounded-lg border border-input bg-white px-3 text-sm min-w-[140px]"
      >
        <option value="">כל הסוגים</option>
        {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <select
        value={filterStatus}
        onChange={e => onStatusChange(e.target.value)}
        className="h-10 rounded-lg border border-input bg-white px-3 text-sm min-w-[160px]"
      >
        <option value="">כל הסטטוסים</option>
        {LEAD_STATUSES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}
