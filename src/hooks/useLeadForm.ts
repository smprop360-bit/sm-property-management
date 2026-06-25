'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { LeadType } from '@/lib/types/lead'

interface FormValues {
  full_name: string
  phone: string
  email: string
  message: string
}

interface FormErrors {
  full_name?: string
  phone?: string
}

interface UseLeadFormOptions {
  leadType: LeadType
  propertyId?: string
}

export function useLeadForm({ leadType, propertyId }: UseLeadFormOptions) {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>({
    full_name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!values.full_name.trim()) newErrors.full_name = 'שם מלא הוא שדה חובה'
    if (!values.phone.trim()) newErrors.phone = 'טלפון הוא שדה חובה'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const supabase = createClient()
    const utmParams = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    )

    const { error } = await supabase.from('leads').insert({
      full_name: values.full_name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || null,
      message: values.message.trim() || null,
      lead_type: leadType,
      property_id: propertyId ?? null,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      utm_source: utmParams.get('utm_source'),
      utm_medium: utmParams.get('utm_medium'),
      utm_campaign: utmParams.get('utm_campaign'),
      utm_content: utmParams.get('utm_content'),
      source: utmParams.get('source'),
    })

    setLoading(false)
    if (!error) router.push('/thank-you')
  }

  return { values, errors, loading, handleChange, handleSubmit }
}
