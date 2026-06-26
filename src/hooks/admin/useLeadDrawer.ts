'use client'

import { useState } from 'react'
import type { Lead } from '@/lib/types/lead'

export function useLeadDrawer() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [notesValue, setNotesValue] = useState('')

  const open = selectedLead !== null

  function openDrawer(lead: Lead) {
    setSelectedLead(lead)
    setNotesValue(lead.notes ?? '')
  }

  function closeDrawer() {
    setSelectedLead(null)
    setNotesValue('')
  }

  return { selectedLead, notesValue, setNotesValue, open, openDrawer, closeDrawer }
}
