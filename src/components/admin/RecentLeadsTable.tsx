'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Lead } from '@/lib/types/lead'
import { LEAD_STATUS_COLORS } from '@/lib/types/lead'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'
import { cn } from '@/lib/utils'

export function RecentLeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createClient()
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setLeads(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-base font-semibold text-brand-navy mb-4">לידים אחרונים</h3>
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-50 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-start py-2 font-medium">שם</th>
                <th className="text-start py-2 font-medium">טלפון</th>
                <th className="text-start py-2 font-medium">סוג</th>
                <th className="text-start py-2 font-medium">עיר</th>
                <th className="text-start py-2 font-medium">סטטוס</th>
                <th className="text-start py-2 font-medium">תאריך</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2.5 font-medium">{lead.full_name}</td>
                  <td className="py-2.5 text-gray-600">{lead.phone}</td>
                  <td className="py-2.5 text-gray-600">
                    {lead.property_type
                      ? (PROPERTY_TYPE_LABELS[lead.property_type as keyof typeof PROPERTY_TYPE_LABELS] ?? lead.property_type)
                      : '—'}
                  </td>
                  <td className="py-2.5 text-gray-600">{lead.city ?? '—'}</td>
                  <td className="py-2.5">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                        LEAD_STATUS_COLORS[lead.status]
                      )}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-500">
                    {new Date(lead.created_at).toLocaleDateString('he-IL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
