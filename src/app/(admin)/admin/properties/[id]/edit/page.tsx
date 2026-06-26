'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Property } from '@/lib/types/property'
import { usePropertyForm } from '@/hooks/admin/usePropertyForm'
import { PropertyForm } from '@/components/admin/PropertyForm'

export default function EditPropertyPage() {
  const params = useParams()
  const id = params.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setProperty(null)
    setNotFound(false)
    createClient()
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true)
        } else {
          setProperty(data)
        }
      })
  }, [id])

  if (notFound) {
    return <p className="text-red-500">נכס לא נמצא</p>
  }
  if (!property) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
        <div className="h-64 bg-white rounded-xl shadow-sm animate-pulse" />
      </div>
    )
  }

  return <EditPropertyForm property={property} />
}

function EditPropertyForm({ property }: { property: Property }) {
  const form = usePropertyForm(
    {
      title: property.title,
      type: property.type,
      deal_type: property.deal_type,
      status: property.status,
      city: property.city,
      address: property.address ?? '',
      area: property.area ?? '',
      size_sqm: property.size_sqm?.toString() ?? '',
      floor: property.floor ?? '',
      price: property.price?.toString() ?? '',
      price_visible: property.price_visible,
      price_text: property.price_text ?? '',
      description: property.description ?? '',
      images: property.images,
    },
    property.id
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">עריכת נכס: {property.title}</h1>
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
        isEdit
      />
    </div>
  )
}
