'use client'

import { useSeekerLeadForm } from '@/hooks/useSeekerLeadForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'

interface SeekerLeadFormProps {
  className?: string
}

export function SeekerLeadForm({ className }: SeekerLeadFormProps) {
  const {
    values,
    errors,
    loading,
    submitError,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useSeekerLeadForm()

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="seeker_property_type">סוג נכס</Label>
            <Select
              value={values.property_type}
              onValueChange={(v) => handleSelectChange('property_type', v)}
            >
              <SelectTrigger id="seeker_property_type" className="w-full h-10">
                <SelectValue placeholder="בחר סוג נכס" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seeker_city">עיר</Label>
            <Input
              id="seeker_city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="תל אביב, ירושלים..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="seeker_budget">תקציב</Label>
            <Input
              id="seeker_budget"
              name="budget"
              value={values.budget}
              onChange={handleChange}
              placeholder="10,000 ₪ לחודש"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seeker_size">גודל משוער</Label>
            <Input
              id="seeker_size"
              name="size_needed"
              value={values.size_needed}
              onChange={handleChange}
              placeholder='100-200 מ"ר'
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="seeker_full_name">שם מלא *</Label>
          <Input
            id="seeker_full_name"
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
          <Label htmlFor="seeker_phone">טלפון *</Label>
          <Input
            id="seeker_phone"
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
          <Label htmlFor="seeker_message">פרטים נוספים</Label>
          <Textarea
            id="seeker_message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="ספר לנו עוד על מה שאתה מחפש..."
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

        {submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )}
      </div>
    </form>
  )
}
