'use client'

import { useLeadForm } from '@/hooks/useLeadForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { LeadType } from '@/lib/types/lead'
import { useT } from '@/i18n/client'

interface LeadFormProps {
  leadType: LeadType
  propertyId?: string
  className?: string
}

export function LeadForm({ leadType, propertyId, className }: LeadFormProps) {
  const t = useT()
  const { values, errors, loading, submitError, handleChange, handleSubmit } = useLeadForm({
    leadType,
    propertyId,
  })

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">{t('שם מלא *')}</Label>
          <Input
            id="full_name"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            placeholder={t('ישראל ישראלי')}
            aria-invalid={Boolean(errors.full_name)}
            aria-describedby={errors.full_name ? 'full_name-error' : undefined}
          />
          {errors.full_name && (
            <p id="full_name-error" className="text-red-600 text-xs" role="alert">{errors.full_name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">{t('טלפון *')}</Label>
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
          <Label htmlFor="email">{t('אימייל')}</Label>
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
            <Label htmlFor="city">{t('עיר')}</Label>
            <Input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder={t('תל אביב')}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="property_type">{t('סוג הנכס')}</Label>
            <select
              id="property_type"
              name="property_type"
              value={values.property_type}
              onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
              className="w-full border border-input bg-transparent px-3 py-1 text-sm rounded-md h-8 focus:outline-none focus:ring-2 focus:ring-ring [&>option]:bg-white [&>option]:text-gray-900"
            >
              <option value="">{t('בחרו סוג')}</option>
              <option value="דירה">{t('דירה')}</option>
              <option value="בית פרטי">{t('בית פרטי')}</option>
              <option value="משרד">{t('משרד')}</option>
              <option value="חנות">{t('חנות')}</option>
              <option value="מחסן">{t('מחסן')}</option>
              <option value="אחר">{t('אחר')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">{t('הודעה')}</Label>
          <Textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder={t('ספר לנו על הנכס / מה אתה מחפש...')}
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-3 rounded-none"
        >
          {loading ? t('שולח...') : t('שלח פנייה')}
        </Button>
        {submitError && (
          <p className="text-red-600 text-sm text-center" role="alert" aria-live="polite">{submitError}</p>
        )}
      </div>
    </form>
  )
}
