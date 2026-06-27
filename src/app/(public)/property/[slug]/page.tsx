import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Maximize2, Layers, Building2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PropertyContactForm } from '@/components/public/PropertyContactForm'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS, type Property } from '@/lib/types/property'
import { formatPrice } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!property) notFound()

  const p = property as Property

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-72 md:h-[420px] bg-brand-light">
        {p.images?.[0] ? (
          <Image
            src={p.images[0]}
            alt={p.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Building2 size={64} />
          </div>
        )}
        <div className="absolute inset-0 bg-brand-navy/40" />
        <div className="absolute bottom-6 start-6 end-6">
          <span className="inline-block bg-brand-gold text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {DEAL_TYPE_LABELS[p.deal_type]}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow">
            {p.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Details column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Building2 size={16} className="text-brand-gold" />
                <span>{PROPERTY_TYPE_LABELS[p.type]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} className="text-brand-gold" />
                <span>
                  {p.city}
                  {p.area ? `, ${p.area}` : ''}
                  {p.address ? ` — ${p.address}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Maximize2 size={16} className="text-brand-gold" />
                <span>{p.size_sqm} מ"ר</span>
              </div>
              {p.floor && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Layers size={16} className="text-brand-gold" />
                  <span>קומה {p.floor}</span>
                </div>
              )}
              <div className="ms-auto font-bold text-brand-gold text-base">
                {formatPrice(p.price, p.price_visible, p.price_text)}
              </div>
            </div>

            {/* Description */}
            {p.description && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-brand-navy mb-3">תיאור הנכס</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {p.description}
                </p>
              </div>
            )}
          </div>

          {/* Contact form column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h2 className="font-bold text-brand-navy text-lg mb-4">מעוניין? צור קשר</h2>
              <PropertyContactForm
                propertyId={p.id}
                propertyTitle={p.title}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
