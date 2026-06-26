'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Property } from '@/lib/types/property'

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')

  useEffect(() => {
    createClient()
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProperties(data ?? [])
        setLoading(false)
      })
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      const matchesType = !filterType || p.type === filterType
      return matchesSearch && matchesType
    })
  }, [properties, searchQuery, filterType])

  async function deleteProperty(id: string): Promise<void> {
    const supabase = createClient()
    await supabase.from('properties').delete().eq('id', id)
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  return {
    properties: filteredProperties,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    deleteProperty,
  }
}
