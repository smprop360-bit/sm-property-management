'use client'

import { LEAD_STATUSES, LEAD_STATUS_COLORS } from '@/lib/types/lead'
import type { Lead, LeadStatus } from '@/lib/types/lead'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'
import { cn } from '@/lib/utils'

interface LeadsTableProps {
  leads: Lead[]
  loading: boolean
  onStatusChange: (id: number, status: LeadStatus) => void
  onOpenDrawer: (lead: Lead) => void
}

export function LeadsTable({ leads, loading, onStatusChange, onOpenDrawer }: LeadsTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-50 animate-pulse rounded" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-start px-4 py-3 font-medium text-gray-600">שם</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">טלפון</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">אימייל</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">סוג נכס</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">עיר</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">סטטוס</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">תאריך</th>
              <th className="text-start px-4 py-3 font-medium text-gray-600">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400">
                  אין לידים להצגה
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <a href={`tel:${lead.phone}`} className="hover:text-brand-navy">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.email ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.property_type
                      ? (PROPERTY_TYPE_LABELS[lead.property_type as keyof typeof PROPERTY_TYPE_LABELS] ?? lead.property_type)
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.city ?? '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={e => onStatusChange(lead.id, e.target.value as LeadStatus)}
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer',
                        LEAD_STATUS_COLORS[lead.status]
                      )}
                    >
                      {LEAD_STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(lead.created_at).toLocaleDateString('he-IL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onOpenDrawer(lead)}
                      className="text-brand-navy text-xs font-medium hover:underline"
                    >
                      פרטים
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
