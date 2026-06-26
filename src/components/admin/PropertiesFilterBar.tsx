'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'
import { Search, Plus } from 'lucide-react'

interface PropertiesFilterBarProps {
  searchQuery: string
  onSearchChange: (v: string) => void
  filterType: string
  onTypeChange: (v: string) => void
}

export function PropertiesFilterBar({
  searchQuery,
  onSearchChange,
  filterType,
  onTypeChange,
}: PropertiesFilterBarProps) {
  return (
    <div className="flex gap-3 flex-wrap items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400 pointer-events-none"
        />
        <Input
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="חיפוש לפי כותרת או עיר"
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
      <Link
        href="/admin/properties/new"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand-gold text-white font-medium text-sm hover:bg-brand-gold/90"
      >
        <Plus size={16} />
        הוסף נכס
      </Link>
    </div>
  )
}
