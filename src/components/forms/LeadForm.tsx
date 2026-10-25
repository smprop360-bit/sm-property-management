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
            aria-invalid={Boolean(errors.full_name)}
            aria-describedby={errors.full_name ? 'full_name-error' : undefined}
          />
          {errors.full_name && (
            <p id="full_name-error" className="text-red-600 text-xs" role="alert">{errors.full_name}</p>
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
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-xs" role="alert">{errors.phone}</p>
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

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="city">עיר</Label>
            <Input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="תל אביב"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="property_type">סוג הנכס</Label>
            <select
              id="property_type"
              name="property_type"
              value={values.property_type}
              onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">בחרו סוג</option>
              <option value="דירה">דירה</option>
              <option value="בית פרטי">בית פרטי</option>
              <option value="משרד">משרד</option>
              <option value="חנות">חנות</option>
              <option value="מחסן">מחסן</option>
              <option value="אחר">אחר</option>
            </select>
          </div>
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
          className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-3 rounded-none"
        >
          {loading ? 'שולח...' : 'שלח פנייה'}
        </Button>
        {submitError && (
          <p className="text-red-600 text-sm text-center" role="alert" aria-live="polite">{submitError}</p>
        )}
      </div>
    </form>
  )
}
