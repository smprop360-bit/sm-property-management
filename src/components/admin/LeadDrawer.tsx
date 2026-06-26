'use client'

import { MessageCircle, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Lead, LeadStatus } from '@/lib/types/lead'
import { LEAD_STATUSES } from '@/lib/types/lead'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'

interface LeadDrawerProps {
  lead: Lead | null
  open: boolean
  notesValue: string
  onNotesChange: (v: string) => void
  onClose: () => void
  onStatusChange: (id: number, status: LeadStatus) => void
  onSaveNotes: (id: number, notes: string) => void
}

export function LeadDrawer({
  lead,
  open,
  notesValue,
  onNotesChange,
  onClose,
  onStatusChange,
  onSaveNotes,
}: LeadDrawerProps) {
  if (!lead) return null

  const whatsappPhone = lead.phone.replace(/^0/, '')

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => { if (!o) onClose() }}>
      <DialogContent
        showCloseButton={false}
        className="top-0 right-0 left-auto bottom-0 h-full w-[420px] max-w-[100vw] translate-x-0 translate-y-0 rounded-none flex flex-col gap-0 p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b shrink-0">
          <h2 className="text-xl font-bold text-brand-navy">{lead.full_name}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
            aria-label="סגור"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Contact */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">יצירת קשר</p>
            <div className="flex items-center justify-between">
              <a href={`tel:${lead.phone}`} className="font-medium text-brand-navy hover:underline">
                {lead.phone}
              </a>
              <a
                href={`https://wa.me/972${whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#25D366]/90"
              >
                <MessageCircle size={14} />
                וואטסאפ
              </a>
            </div>
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="text-sm text-gray-600 hover:underline block">
                {lead.email}
              </a>
            )}
          </div>

          {/* Details grid */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">פרטים</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {lead.property_type && (
                <>
                  <dt className="text-gray-500">סוג נכס</dt>
                  <dd className="font-medium">
                    {PROPERTY_TYPE_LABELS[lead.property_type as keyof typeof PROPERTY_TYPE_LABELS] ?? lead.property_type}
                  </dd>
                </>
              )}
              {lead.city && (
                <>
                  <dt className="text-gray-500">עיר</dt>
                  <dd className="font-medium">{lead.city}</dd>
                </>
              )}
              {lead.budget && (
                <>
                  <dt className="text-gray-500">תקציב</dt>
                  <dd className="font-medium">{lead.budget}</dd>
                </>
              )}
              {lead.size_needed && (
                <>
                  <dt className="text-gray-500">גודל</dt>
                  <dd className="font-medium">{lead.size_needed}</dd>
                </>
              )}
              {lead.message && (
                <>
                  <dt className="text-gray-500 col-span-2">הודעה</dt>
                  <dd className="font-medium col-span-2 text-gray-700">{lead.message}</dd>
                </>
              )}
            </dl>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="drawer-status">סטטוס</Label>
            <select
              id="drawer-status"
              value={lead.status}
              onChange={e => onStatusChange(lead.id, e.target.value as LeadStatus)}
              className="w-full h-10 rounded-lg border border-input bg-white px-3 text-sm"
            >
              {LEAD_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="drawer-notes">הערות</Label>
            <Textarea
              id="drawer-notes"
              value={notesValue}
              onChange={e => onNotesChange(e.target.value)}
              rows={5}
              placeholder="הוסף הערות על הליד..."
            />
            <button
              onClick={() => onSaveNotes(lead.id, notesValue)}
              className="w-full h-10 rounded-lg bg-brand-gold text-white font-semibold text-sm hover:bg-brand-gold/90"
            >
              שמור הערות
            </button>
          </div>

          {/* Meta */}
          <div className="text-xs text-gray-400 space-y-1 pt-2 border-t">
            <p>נוצר: {new Date(lead.created_at).toLocaleString('he-IL')}</p>
            {lead.utm_source && <p>מקור: {lead.utm_source}</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
