'use client'

import { usePropertyForm } from '@/hooks/admin/usePropertyForm'
import { PropertyForm } from '@/components/admin/PropertyForm'

export default function NewPropertyPage() {
  const form = usePropertyForm()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">הוספת נכס חדש</h1>
      <PropertyForm
        values={form.values}
        errors={form.errors}
        loading={form.loading}
        submitError={form.submitError}
        existingImages={form.existingImages}
        imageFiles={form.imageFiles}
        onChange={form.handleChange}
        onSelectChange={form.handleSelectChange}
        onBoolChange={form.handleBoolChange}
        onImageAdd={form.handleImageAdd}
        onImageRemove={form.handleImageRemove}
        onNewImageRemove={form.handleNewImageRemove}
        onSubmit={form.handleSubmit}
      />
    </div>
  )
}
