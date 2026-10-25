'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, AlertTriangle, Link2, Check } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { Property } from '@/lib/types/property'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import { cn } from '@/lib/utils'

interface PropertiesTableProps {
  properties: Property[]
  loading: boolean
  onDelete: (id: string) => void
}

const PROPERTY_STATUS_LABELS: Record<string, string> = {
  active: 'פעיל',
  inactive: 'לא פעיל',
  rented: 'מושכר',
  sold: 'נמכר',
}

const PROPERTY_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  rented: 'bg-blue-100 text-blue-700',
  sold: 'bg-purple-100 text-purple-700',
}

export function PropertiesTable({ properties, loading, onDelete }: PropertiesTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function copyLink(slug: string, id: string) {
    navigator.clipboard.writeText(`https://${slug}.prop360.co.il`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 bg-gray-50 animate-pulse rounded" />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-start px-4 py-3 font-medium text-gray-600">תמונה</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">כותרת</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">סוג</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">עסקה</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">עיר</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">מחיר</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">גודל</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">סטטוס</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    אין נכסים להצגה
                  </td>
                </tr>
              ) : (
                properties.map(prop => (
                  <tr key={prop.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {prop.images[0] ? (
                        <Image
                          src={prop.images[0]}
                          alt=""
                          width={48}
                          height={48}
                          unoptimized
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-300 text-xs">—</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{prop.title}</td>
                    <td className="px-4 py-3 text-gray-600">{PROPERTY_TYPE_LABELS[prop.type]}</td>
                    <td className="px-4 py-3 text-gray-600">{DEAL_TYPE_LABELS[prop.deal_type]}</td>
                    <td className="px-4 py-3 text-gray-600">{prop.city}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {prop.price ? `₪${prop.price.toLocaleString('he-IL')}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {prop.size_sqm ? `${prop.size_sqm} מ"ר` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                          PROPERTY_STATUS_COLORS[prop.status] ?? 'bg-gray-100 text-gray-500'
                        )}
                      >
                        {PROPERTY_STATUS_LABELS[prop.status] ?? prop.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyLink(prop.slug, prop.id)}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-gold"
                          aria-label="העתק קישור"
                          title={`https://${prop.slug}.prop360.co.il`}
                        >
                          {copiedId === prop.id ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Link2 size={16} />
                          )}
                        </button>
                        <Link
                          href={`/admin/properties/${prop.id}/edit`}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-navy"
                          aria-label="עריכה"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setConfirmId(prop.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
                          aria-label="מחיקה"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={confirmId !== null}
        onOpenChange={(o: boolean) => { if (!o) setConfirmId(null) }}
      >
        <DialogContent showCloseButton={false}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-brand-navy">האם למחוק את הנכס?</p>
              <p className="text-sm text-gray-500 mt-1">פעולה זו לא ניתנת לביטול.</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => setConfirmId(null)}
              className="h-9 px-4 rounded-lg border border-input text-sm font-medium hover:bg-gray-50"
            >
              ביטול
            </button>
            <button
              onClick={() => {
                if (confirmId) {
                  onDelete(confirmId)
                  setConfirmId(null)
                }
              }}
              className="h-9 px-4 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700"
            >
              מחק
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
