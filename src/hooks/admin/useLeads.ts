'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Lead, LeadStatus } from '@/lib/types/lead'

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setLeads(data ?? [])
        setLoading(false)
      })
  }, [])

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        lead.full_name.toLowerCase().includes(q) ||
        lead.phone.includes(q)
      const matchesType = !filterType || lead.property_type === filterType
      const matchesStatus = !filterStatus || lead.status === filterStatus
      return matchesSearch && matchesType && matchesStatus
    })
  }, [leads, searchQuery, filterType, filterStatus])

  async function updateStatus(id: number, status: LeadStatus): Promise<void> {
    const supabase = createClient()
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)))
  }

  async function saveNotes(id: number, notes: string): Promise<void> {
    const supabase = createClient()
    await supabase.from('leads').update({ notes }).eq('id', id)
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, notes } : l)))
  }

  return {
    leads: filteredLeads,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    updateStatus,
    saveNotes,
  }
}
