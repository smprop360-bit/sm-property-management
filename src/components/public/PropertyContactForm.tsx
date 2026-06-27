'use client'

import { usePropertyContactForm } from '@/hooks/usePropertyContactForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface PropertyContactFormProps {
  propertyId: string
  propertyTitle: string
}

export function PropertyContactForm({ propertyId, propertyTitle }: PropertyContactFormProps) {
  const { values, errors, loading, submitted, submitError, handleChange, handleSubmit } =
    usePropertyContactForm(propertyId)

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <CheckCircle size={48} className="text-brand-gold" />
        <h3 className="text-xl font-bold text-brand-navy">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-gray-600 text-sm">נחזור אליך בהקדם.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">
        מעוניין ב: <span className="font-medium text-brand-navy">{propertyTitle}</span>
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="contact_full_name">שם מלא *</Label>
        <Input
          id="contact_full_name"
          name="full_name"
          value={values.full_name}
          onChange={handleChange}
          placeholder="ישראל ישראלי"
        />
        {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact_phone">טלפון *</Label>
        <Input
          id="contact_phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="05X-XXXXXXX"
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact_message">הודעה (אופציונלי)</Label>
        <Textarea
          id="contact_message"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="פרטים נוספים..."
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold h-12"
      >
        {loading ? 'שולח...' : 'שלח פנייה'}
      </Button>

      {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}
    </form>
  )
}
