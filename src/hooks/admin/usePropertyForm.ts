'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { PropertyType, DealType, PropertyStatus } from '@/lib/types/property'

export interface PropertyFormValues {
  title: string
  type: string
  deal_type: string
  status: string
  city: string
  address: string
  area: string
  size_sqm: string
  floor: string
  price: string
  price_visible: boolean
  price_text: string
  description: string
  images: string[]
}

type FormErrors = Partial<Record<keyof PropertyFormValues, string>>

const DEFAULT_VALUES: PropertyFormValues = {
  title: '',
  type: '',
  deal_type: '',
  status: 'active',
  city: '',
  address: '',
  area: '',
  size_sqm: '',
  floor: '',
  price: '',
  price_visible: true,
  price_text: '',
  description: '',
  images: [],
}

function generateSlug(title: string): string {
  const base =
    title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .slice(0, 40) || 'property'
  return `${base}-${Date.now().toString(36)}`
}

async function uploadImages(
  supabase: ReturnType<typeof createClient>,
  propertyId: string,
  files: File[]
): Promise<string[]> {
  const urls: string[] = []
  for (const file of files) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${propertyId}/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(path, file, { upsert: false })
    if (!error && data) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('property-images').getPublicUrl(data.path)
      urls.push(publicUrl)
    }
  }
  return urls
}

export function usePropertyForm(
  initialValues?: Partial<PropertyFormValues>,
  propertyId?: string
) {
  const router = useRouter()
  const [values, setValues] = useState<PropertyFormValues>({
    ...DEFAULT_VALUES,
    ...initialValues,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [existingImages, setExistingImages] = useState<string[]>(
    initialValues?.images ?? []
  )
  const [imageFiles, setImageFiles] = useState<File[]>([])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof PropertyFormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSelectChange(name: keyof PropertyFormValues, value: string) {
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleBoolChange(name: keyof PropertyFormValues, value: boolean) {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function handleImageAdd(files: File[]) {
    setImageFiles(prev => [...prev, ...files])
  }

  function handleImageRemove(url: string) {
    setExistingImages(prev => prev.filter(u => u !== url))
  }

  function handleNewImageRemove(index: number) {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!values.title.trim()) newErrors.title = 'כותרת הוא שדה חובה'
    if (!values.type) newErrors.type = 'סוג נכס הוא שדה חובה'
    if (!values.deal_type) newErrors.deal_type = 'סוג עסקה הוא שדה חובה'
    if (!values.city.trim()) newErrors.city = 'עיר הוא שדה חובה'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSubmitError(null)
    const supabase = createClient()

    try {
      const sharedFields = {
        title: values.title.trim(),
        type: values.type as PropertyType,
        deal_type: values.deal_type as DealType,
        status: values.status as PropertyStatus,
        city: values.city.trim(),
        address: values.address.trim() || null,
        area: values.area.trim() || null,
        size_sqm: values.size_sqm ? parseInt(values.size_sqm, 10) : 0,
        floor: values.floor.trim() || null,
        price: values.price ? parseInt(values.price, 10) : null,
        price_visible: values.price_visible,
        price_text: values.price_text.trim() || null,
        description: values.description.trim() || null,
      }

      if (propertyId) {
        const newUrls = await uploadImages(supabase, propertyId, imageFiles)
        const allImages = [...existingImages, ...newUrls]
        const { error } = await supabase
          .from('properties')
          .update({ ...sharedFields, images: allImages })
          .eq('id', propertyId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('properties')
          .insert({ ...sharedFields, slug: generateSlug(values.title), features: [], images: [] })
          .select('id')
          .single()
        if (error) throw error
        if (imageFiles.length > 0 && data) {
          const newUrls = await uploadImages(supabase, data.id, imageFiles)
          await supabase.from('properties').update({ images: newUrls }).eq('id', data.id)
        }
      }

      router.push('/admin/properties')
    } catch {
      setSubmitError('שגיאה בשמירת הנכס. אנא נסה שוב.')
    } finally {
      setLoading(false)
    }
  }

  return {
    values,
    errors,
    loading,
    submitError,
    existingImages,
    imageFiles,
    handleChange,
    handleSelectChange,
    handleBoolChange,
    handleImageAdd,
    handleImageRemove,
    handleNewImageRemove,
    handleSubmit,
  }
}
