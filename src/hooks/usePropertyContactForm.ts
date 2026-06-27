'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ContactFormValues {
  full_name: string
  phone: string
  message: string
}

interface ContactFormErrors {
  full_name?: string
  phone?: string
}

export function usePropertyContactForm(propertyId: string) {
  const [values, setValues] = useState<ContactFormValues>({
    full_name: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: ContactFormErrors = {}
    if (!values.full_name.trim()) {
      newErrors.full_name = 'שם מלא הוא שדה חובה'
    }
    if (!values.phone.trim()) {
      newErrors.phone = 'טלפון הוא שדה חובה'
    } else if (!/^0[2-9]\d{7,8}$/.test(values.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSubmitError(null)
    const supabase = createClient()
    const utmParams = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    )

    const { error } = await supabase.from('leads').insert({
      full_name: values.full_name.trim(),
      phone: values.phone.trim(),
      message: values.message.trim() || null,
      lead_type: 'property_interest',
      property_id: propertyId,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      utm_source: utmParams.get('utm_source'),
      utm_medium: utmParams.get('utm_medium'),
      utm_campaign: utmParams.get('utm_campaign'),
      utm_content: utmParams.get('utm_content'),
      source: utmParams.get('source'),
    })

    setLoading(false)
    if (error) {
      setSubmitError('שגיאה בשליחת הטופס. אנא נסה שוב.')
    } else {
      setSubmitted(true)
    }
  }

  return { values, errors, loading, submitted, submitError, handleChange, handleSubmit }
}
