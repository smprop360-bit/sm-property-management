export type PropertyType = 'office' | 'store' | 'warehouse' | 'industry' | 'land' | 'business'
export type DealType = 'rent' | 'sale' | 'both'
export type PropertyStatus = 'active' | 'inactive' | 'rented' | 'sold'

export interface Property {
  id: string
  title: string
  slug: string
  type: PropertyType
  deal_type: DealType
  city: string
  area: string | null
  address: string | null
  size_sqm: number
  floor: string | null
  price: number | null
  price_visible: boolean
  price_text: string | null
  description: string | null
  features: string[]
  images: string[]
  status: PropertyStatus
  created_at: string
  updated_at: string
}

export type PropertyInsert = Omit<Property, 'id' | 'created_at' | 'updated_at'>
export type PropertyUpdate = Partial<PropertyInsert>

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  office: 'משרד',
  store: 'חנות',
  warehouse: 'מחסן',
  industry: 'תעשייה',
  land: 'קרקע',
  business: 'עסק',
}

export const DEAL_TYPE_LABELS: Record<DealType, string> = {
  rent: 'להשכרה',
  sale: 'למכירה',
  both: 'למכירה / השכרה',
}
