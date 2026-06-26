'use client'

import { useLeads } from '@/hooks/admin/useLeads'
import { useLeadDrawer } from '@/hooks/admin/useLeadDrawer'
import { LeadsFilterBar } from '@/components/admin/LeadsFilterBar'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { LeadDrawer } from '@/components/admin/LeadDrawer'
import type { LeadStatus } from '@/lib/types/lead'

export default function AdminLeadsPage() {
  const {
    leads,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    updateStatus,
    saveNotes,
  } = useLeads()

  const { selectedLead, notesValue, setNotesValue, open, openDrawer, closeDrawer } =
    useLeadDrawer()

  async function handleStatusChange(id: number, status: LeadStatus) {
    await updateStatus(id, status)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">ניהול לידים</h1>
      <LeadsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterType={filterType}
        onTypeChange={setFilterType}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
      />
      <LeadsTable
        leads={leads}
        loading={loading}
        onStatusChange={handleStatusChange}
        onOpenDrawer={openDrawer}
      />
      <LeadDrawer
        lead={selectedLead}
        open={open}
        notesValue={notesValue}
        onNotesChange={setNotesValue}
        onClose={closeDrawer}
        onStatusChange={handleStatusChange}
        onSaveNotes={saveNotes}
      />
    </div>
  )
}
