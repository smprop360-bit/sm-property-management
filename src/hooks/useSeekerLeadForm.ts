'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface SeekerFormValues {
  full_name: string
  phone: string
  email: string
  message: string
  property_type: string
  city: string
  budget: string
  size_needed: string
}

interface SeekerFormErrors {
  full_name?: string
  phone?: string
}

export function useSeekerLeadForm() {
  const router = useRouter()
  const [values, setValues] = useState<SeekerFormValues>({
    full_name: '',
    phone: '',
    email: '',
    message: '',
    property_type: '',
    city: '',
    budget: '',
    size_needed: '',
  })
  const [errors, setErrors] = useState<SeekerFormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof SeekerFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSelectChange(name: keyof SeekerFormValues, value: string) {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function validate(): boolean {
    const newErrors: SeekerFormErrors = {}
    if (!values.full_name.trim()) newErrors.full_name = 'שם מלא הוא שדה חובה'
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
    const supabase = createClient()
    const utmParams = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    )

    const { error } = await supabase.from('leads').insert({
      full_name: values.full_name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || null,
      message: values.message.trim() || null,
      lead_type: 'seeker',
      property_type: values.property_type || null,
      city: values.city.trim() || null,
      budget: values.budget.trim() || null,
      size_needed: values.size_needed.trim() || null,
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
      router.push('/thank-you')
    }
  }

  return { values, errors, loading, submitError, handleChange, handleSelectChange, handleSubmit }
}
