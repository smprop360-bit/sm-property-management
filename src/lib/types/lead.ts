export type LeadType = 'owner' | 'seeker' | 'property_interest'

export const LEAD_STATUSES = [
  'חדש',
  'בטיפול',
  'לא ענה',
  'חזרתי אליו',
  'רלוונטי',
  'לא רלוונטי',
  'נקבעה פגישה',
  'נשלחה הצעה',
  'נסגרה עסקה',
  'במעקב',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export interface Lead {
  id: number
  full_name: string
  phone: string
  email: string | null
  lead_type: LeadType
  property_id: string | null
  city: string | null
  property_type: string | null
  size_needed: string | null
  budget: string | null
  message: string | null
  source: string | null
  page_url: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  status: LeadStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at' | 'updated_at'>

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  'חדש':          'bg-blue-100 text-blue-700',
  'בטיפול':       'bg-yellow-100 text-yellow-700',
  'לא ענה':       'bg-orange-100 text-orange-700',
  'חזרתי אליו':   'bg-purple-100 text-purple-700',
  'רלוונטי':      'bg-green-100 text-green-700',
  'לא רלוונטי':   'bg-gray-100 text-gray-500',
  'נקבעה פגישה':  'bg-teal-100 text-teal-700',
  'נשלחה הצעה':   'bg-indigo-100 text-indigo-700',
  'נסגרה עסקה':   'bg-brand-navy/10 text-brand-navy',
  'במעקב':        'bg-amber-100 text-amber-700',
}
