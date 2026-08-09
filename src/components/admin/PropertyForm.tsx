'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import type { PropertyFormValues } from '@/hooks/admin/usePropertyForm'

interface PropertyFormProps {
  values: PropertyFormValues
  errors: Partial<Record<keyof PropertyFormValues, string>>
  loading: boolean
  submitError: string | null
  existingImages: string[]
  imageFiles: File[]
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSelectChange: (name: keyof PropertyFormValues, value: string) => void
  onBoolChange: (name: keyof PropertyFormValues, value: boolean) => void
  onImageAdd: (files: File[]) => void
  onImageRemove: (url: string) => void
  onNewImageRemove: (index: number) => void
  onSubmit: (e: FormEvent) => void
  isEdit?: boolean
}

export function PropertyForm({
  values,
  errors,
  loading,
  submitError,
  existingImages,
  imageFiles,
  onChange,
  onSelectChange,
  onBoolChange,
  onImageAdd,
  onImageRemove,
  onNewImageRemove,
  onSubmit,
  isEdit = false,
}: PropertyFormProps) {
  const router = useRouter()

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="space-y-6 max-w-3xl">
        {/* Section 1 — פרטים בסיסיים */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-brand-navy border-b pb-3">פרטים בסיסיים</h2>
          <div className="space-y-1.5">
            <Label htmlFor="title">כותרת *</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={onChange}
              placeholder="משרד מרווח בתל אביב"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="type">סוג נכס *</Label>
              <select
                id="type"
                value={values.type}
                onChange={e => onSelectChange('type', e.target.value)}
                className="w-full h-10 rounded-lg border border-input bg-white px-3 text-sm"
              >
                <option value="">בחר סוג</option>
                {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deal_type">סוג עסקה *</Label>
              <select
                id="deal_type"
                value={values.deal_type}
                onChange={e => onSelectChange('deal_type', e.target.value)}
                className="w-full h-10 rounded-lg border border-input bg-white px-3 text-sm"
              >
                <option value="">בחר סוג עסקה</option>
                {Object.entries(DEAL_TYPE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              {errors.deal_type && <p className="text-red-500 text-xs">{errors.deal_type}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">סטטוס</Label>
            <select
              id="status"
              value={values.status}
              onChange={e => onSelectChange('status', e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-white px-3 text-sm"
            >
              <option value="active">פעיל</option>
              <option value="inactive">לא פעיל</option>
              <option value="rented">מושכר</option>
              <option value="sold">נמכר</option>
            </select>
          </div>
        </section>

        {/* Section 2 — מיקום */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-brand-navy border-b pb-3">מיקום</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city">עיר *</Label>
              <Input id="city" name="city" value={values.city} onChange={onChange} placeholder="תל אביב" />
              {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="area">שכונה / אזור</Label>
              <Input id="area" name="area" value={values.area} onChange={onChange} placeholder="הצפון הישן" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">כתובת</Label>
            <Input id="address" name="address" value={values.address} onChange={onChange} placeholder="רחוב הרצל 1" />
          </div>
        </section>

        {/* Section 3 — מפרט */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-brand-navy border-b pb-3">מפרט</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="size_sqm">גודל (מ&quot;ר)</Label>
              <Input id="size_sqm" name="size_sqm" type="number" min="0" value={values.size_sqm} onChange={onChange} placeholder="120" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="floor">קומה</Label>
              <Input id="floor" name="floor" value={values.floor} onChange={onChange} placeholder="3" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">מחיר (₪)</Label>
              <Input id="price" name="price" type="number" min="0" value={values.price} onChange={onChange} placeholder="15000" />
            </div>
            <div className="space-y-1.5">
              <Label>הצג מחיר</Label>
              <div className="flex items-center gap-2 h-10">
                <input
                  type="checkbox"
                  id="price_visible"
                  checked={values.price_visible}
                  onChange={e => onBoolChange('price_visible', e.target.checked)}
                  className="w-4 h-4 accent-brand-gold"
                />
                <Label htmlFor="price_visible" className="cursor-pointer font-normal">
                  כן, הצג מחיר
                </Label>
              </div>
            </div>
          </div>
          {!values.price_visible && (
            <div className="space-y-1.5">
              <Label htmlFor="price_text">טקסט מחיר</Label>
              <Input
                id="price_text"
                name="price_text"
                value={values.price_text}
                onChange={onChange}
                placeholder="מחיר לפי פנייה"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="description">תיאור</Label>
            <Textarea
              id="description"
              name="description"
              value={values.description}
              onChange={onChange}
              rows={4}
              placeholder="תיאור מפורט של הנכס..."
            />
          </div>
        </section>

        {/* Section 4 — תמונות */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-brand-navy border-b pb-3">תמונות</h2>
          {(existingImages.length > 0 || imageFiles.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {existingImages.map(url => (
                <div key={url} className="relative">
                  <img src={url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => onImageRemove(url)}
                    className="absolute -top-1.5 -end-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    aria-label="הסר תמונה"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              {imageFiles.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onNewImageRemove(i)}
                    className="absolute -top-1.5 -end-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    aria-label="הסר תמונה"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-brand-gold hover:bg-brand-gold/5 transition-colors">
            <Upload size={24} className="text-gray-400" />
            <span className="text-sm text-gray-500">לחץ להוספת תמונות</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => {
                if (e.target.files) onImageAdd(Array.from(e.target.files))
              }}
            />
          </label>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-8 rounded-lg bg-brand-gold text-white font-semibold text-sm hover:bg-brand-gold/90 disabled:opacity-50"
          >
            {loading ? 'שומר...' : isEdit ? 'שמור שינויים' : 'הוסף נכס'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/properties')}
            className="h-11 px-8 rounded-lg border border-input text-sm font-medium hover:bg-gray-50"
          >
            ביטול
          </button>
        </div>

        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
      </div>
    </form>
  )
}
