'use client'

import { useLeadForm } from '@/hooks/useLeadForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { LeadType } from '@/lib/types/lead'

interface LeadFormProps {
  leadType: LeadType
  propertyId?: string
  className?: string
}

export function LeadForm({ leadType, propertyId, className }: LeadFormProps) {
  const { values, errors, loading, submitError, handleChange, handleSubmit } = useLeadForm({
    leadType,
    propertyId,
  })

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">שם מלא *</Label>
          <Input
            id="full_name"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            placeholder="ישראל ישראלי"
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs">{errors.full_name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">טלפון *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="05X-XXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">אימייל</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="israel@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">הודעה</Label>
          <Textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="ספר לנו על הנכס / מה אתה מחפש..."
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-3"
        >
          {loading ? 'שולח...' : 'שלח פנייה'}
        </Button>
        {submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )}
      </div>
    </form>
  )
}
