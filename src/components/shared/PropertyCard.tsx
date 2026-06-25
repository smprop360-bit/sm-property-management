import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { formatPrice, cn } from '@/lib/utils'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import type { Property } from '@/lib/types/property'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-brand-light">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            אין תמונה
          </div>
        )}
        <Badge className="absolute top-3 end-3 bg-brand-navy text-white text-xs">
          {DEAL_TYPE_LABELS[property.deal_type]}
        </Badge>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-brand-navy border-brand-navy text-xs">
            {PROPERTY_TYPE_LABELS[property.type]}
          </Badge>
          <span className="text-brand-gold font-semibold text-sm">
            {formatPrice(property.price, property.price_visible, property.price_text)}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-1">{property.title}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {property.city}{property.area ? `, ${property.area}` : ''}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={14} />
            {property.size_sqm} מ"ר
          </span>
        </div>

        <Link
          href={`/property/${property.slug}`}
          className={cn(buttonVariants(), 'w-full bg-brand-navy hover:bg-brand-navy/90 text-white')}
        >
          פרטים נוספים
        </Link>
      </div>
    </div>
  )
}
