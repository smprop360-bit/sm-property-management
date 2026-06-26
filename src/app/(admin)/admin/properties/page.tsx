'use client'

import { useProperties } from '@/hooks/admin/useProperties'
import { PropertiesFilterBar } from '@/components/admin/PropertiesFilterBar'
import { PropertiesTable } from '@/components/admin/PropertiesTable'

export default function AdminPropertiesPage() {
  const {
    properties,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    deleteProperty,
  } = useProperties()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">ניהול נכסים</h1>
      <PropertiesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterType={filterType}
        onTypeChange={setFilterType}
      />
      <PropertiesTable
        properties={properties}
        loading={loading}
        onDelete={deleteProperty}
      />
    </div>
  )
}
