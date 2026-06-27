'use client'

import { useState } from 'react'
import { PropertyCard } from '@/components/shared/PropertyCard'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import type { Property } from '@/lib/types/property'

interface PropertiesFiltersProps {
  properties: Property[]
}

export function PropertiesFilters({ properties }: PropertiesFiltersProps) {
  const [filterType, setFilterType] = useState('')
  const [filterDeal, setFilterDeal] = useState('')

  const filtered = properties.filter(p => {
    const matchesType = !filterType || p.type === filterType
    const matchesDeal = !filterDeal || p.deal_type === filterDeal
    return matchesType && matchesDeal
  })

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          aria-label="סוג נכס"
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm min-w-[140px]"
        >
          <option value="">כל הסוגים</option>
          {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <select
          value={filterDeal}
          onChange={e => setFilterDeal(e.target.value)}
          aria-label="סוג עסקה"
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm min-w-[140px]"
        >
          <option value="">כל סוגי העסקה</option>
          {Object.entries(DEAL_TYPE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">אין נכסים זמינים כרגע</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
