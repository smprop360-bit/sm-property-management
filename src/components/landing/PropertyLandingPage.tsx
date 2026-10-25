'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, CheckCircle, Phone, MessageCircle, Building2, X, AlertTriangle } from 'lucide-react'
import { LeadForm } from '@/components/forms/LeadForm'

export interface LocationItem {
  emoji: string
  label: string
}

export interface AgentInfo {
  name: string
  phone: string
  licenseId?: string
}

export interface PropertyLandingData {
  dealType: 'להשכרה' | 'למכירה'
  dealTypeBg?: string

  title: string
  subtitle: string
  city: string
  tagline?: string          // italic description under city

  price: string
  priceLabel?: string
  priceNote?: string

  images?: string[]

  usageTypes?: string[]     // icon grid: אחסנה, משרד, תעשייה קלה...
  features: string[]

  locationTitle?: string
  locationSubtitle?: string
  locationItems?: LocationItem[]

  suitableFor?: string[]

  warningText?: string      // red bar, e.g. "לא מתאים למשאיות"
  urgencyText?: string
  premiumText?: string

  agents: AgentInfo[]
  agencyName?: string
}

interface Props {
  data: PropertyLandingData
}

const USAGE_ICONS: Record<string, string> = {
  'אחסנה': '📦',
  'משרד': '🏢',
  'תעשייה קלה': '🏭',
  'בית מלאכה': '🔧',
  'חנות': '🏪',
  'מסעדה': '🍽️',
  'קליניקה': '🏥',
  'מחסן': '🏗️',
}

export function PropertyLandingPage({ data }: Props) {
  const [formOpen, setFormOpen] = useState(false)

  const {
    dealType,
    dealTypeBg = 'bg-yellow-400',
    title,
    subtitle,
    city,
    tagline,
    price,
    priceLabel = 'מ"ר',
    priceNote,
    images = [],
    usageTypes = [],
    features,
    locationTitle = 'מיקום',
    locationSubtitle,
    locationItems = [],
    suitableFor = [],
    warningText,
    urgencyText,
    premiumText,
    agents,
    agencyName,
  } = data

  return (
    <div dir="rtl" className="min-h-screen bg-[#f0f2f5]">

      {/* ═══════════════════════════════
          HERO — split: image left | text right
          ═══════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[420px] md:min-h-[500px]">

        {/* Image pane */}
        <div className="relative min-h-[260px] md:min-h-0 order-2 md:order-1">
          {images[0] ? (
            <Image src={images[0]} alt={title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[#1a2440] flex items-center justify-center">
              <Building2 size={72} className="text-white/10" />
            </div>
          )}
          {/* diagonal overlay on right edge */}
          <div className="hidden md:block absolute inset-y-0 end-0 w-16 bg-[#0d1b3e]"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 40% 0)' }} />

          {tagline && (
            <div className="absolute bottom-6 start-6 end-6">
              <div className="bg-brand-navy/85 backdrop-blur-sm text-white text-sm italic px-4 py-3 rounded-xl leading-relaxed">
                {tagline}
              </div>
            </div>
          )}
          <span className="absolute top-3 start-3 bg-black/40 text-white/50 text-[10px] px-2 py-1 rounded-md">
            📷 תמונה להמחשה בלבד
          </span>
        </div>

        {/* Text pane */}
        <div className="bg-[#0d1b3e] flex flex-col justify-center px-8 py-10 order-1 md:order-2">
          {/* Deal badge */}
          <div className="mb-5">
            <span className={`inline-block ${dealTypeBg} text-[#0d1b3e] font-black text-xl px-6 py-2 rounded-xl tracking-widest shadow`}>
              {dealType}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white font-black leading-[1] mb-2"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>

          {/* Subtitle / street */}
          <p className="flex items-center gap-2 text-brand-gold font-bold mb-6" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
            <MapPin size={18} className="shrink-0" />
            {subtitle} · {city}
          </p>

          {/* Size / Price box */}
          <div className="bg-white rounded-2xl inline-flex items-center gap-4 px-6 py-4 shadow-lg self-start">
            <span
              className="font-black text-[#0d1b3e] leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 4.2rem)', fontFamily: 'var(--font-heading)' }}
            >
              {price}
            </span>
            <div>
              <p className="font-black text-brand-gold text-xl leading-none">{priceLabel}</p>
              {priceNote && <p className="text-gray-500 text-xs mt-1">{priceNote}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          USAGE TYPES — icon grid
          ═══════════════════════════════ */}
      {usageTypes.length > 0 && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className={`grid gap-4 justify-items-center`}
              style={{ gridTemplateColumns: `repeat(${Math.min(usageTypes.length, 4)}, minmax(0, 1fr))` }}
            >
              {usageTypes.map(type => (
                <div key={type} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#0d1b3e] flex items-center justify-center shadow">
                    <span className="text-2xl">{USAGE_ICONS[type] ?? '🏢'}</span>
                  </div>
                  <CheckCircle size={18} className="text-brand-gold" />
                  <span className="font-bold text-[#0d1b3e] text-sm">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Warning bar */}
      {warningText && (
        <div className="bg-red-600 text-white font-black text-center py-3 px-4 flex items-center justify-center gap-3 text-sm md:text-base">
          <AlertTriangle size={18} className="shrink-0" />
          {warningText}
        </div>
      )}

      {/* ═══════════════════════════════
          DETAILS + FORM
          ═══════════════════════════════ */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* — Details — */}
          <div className="lg:col-span-2 space-y-5">

            {/* Features list */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#0d1b3e] px-6 py-4 flex items-center gap-3">
                <Building2 size={18} className="text-brand-gold" />
                <h2 className="text-white font-black text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                  פרטי הנכס
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map(f => (
                  <div key={f} className="flex items-center gap-3 bg-[#f4f6fa] rounded-xl px-4 py-3">
                    <CheckCircle size={16} className="text-brand-gold shrink-0" />
                    <span className="font-semibold text-[#0d1b3e] text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            {locationItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-[#0d1b3e] px-6 py-4 flex items-center gap-3">
                  <MapPin size={18} className="text-brand-gold" />
                  <div>
                    <h2 className="text-white font-black text-lg leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                      {locationTitle}
                    </h2>
                    {locationSubtitle && (
                      <p className="text-white/40 text-xs mt-0.5">{locationSubtitle}</p>
                    )}
                  </div>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {locationItems.map(({ emoji, label }) => (
                    <div key={label} className="flex items-center gap-3 bg-[#f4f6fa] rounded-xl px-4 py-3">
                      <span className="text-xl shrink-0">{emoji}</span>
                      <span className="font-semibold text-[#0d1b3e] text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suitable for */}
            {suitableFor.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-black text-[#0d1b3e] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  מתאים ל:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suitableFor.map(s => (
                    <span key={s} className="bg-[#0d1b3e] text-white font-semibold text-sm px-4 py-2 rounded-xl">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Urgency */}
            {(premiumText || urgencyText) && (
              <div className="bg-brand-gold rounded-2xl p-5 flex items-start gap-3">
                <span className="text-2xl shrink-0">⭐</span>
                <div>
                  {premiumText && <p className="text-[#0d1b3e] font-black text-base">{premiumText}</p>}
                  {urgencyText && <p className="text-[#0d1b3e]/70 font-semibold text-sm mt-1">{urgencyText}</p>}
                </div>
              </div>
            )}

            {/* Photo strip */}
            <div className="grid grid-cols-3 gap-3">
              {images.length > 1
                ? images.slice(1, 4).map((src, i) => (
                    <div key={i} className="relative h-28 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={src} alt={`תמונה ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))
                : [0, 1, 2].map(i => (
                    <div key={i} className="h-28 rounded-xl bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300">
                      <Building2 size={22} />
                    </div>
                  ))
              }
            </div>
            <p className="text-center text-xs text-gray-400 -mt-2">📷 תמונות להמחשה בלבד</p>
          </div>

          {/* — Sticky form — */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-[#0d1b3e] px-6 py-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse block" />
                  <p className="text-green-400 text-xs font-semibold">זמין עכשיו</p>
                </div>
                <h2 className="text-white font-black text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  מעוניינים?
                </h2>
                <p className="text-white/40 text-xs">נציג יחזור אליכם תוך שעה</p>
              </div>
              <div className="bg-white p-6">
                <LeadForm leadType="owner" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          AGENT FOOTER
          ═══════════════════════════════ */}
      <footer className="bg-[#0d1b3e] mt-6 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 text-center">
            {agents.map((agent, i) => (
              <div key={i}>
                <p className="text-white/50 text-xs mb-1">{agent.name}</p>
                <a
                  href={`tel:${agent.phone.replace(/-/g, '')}`}
                  className="text-brand-gold font-black text-2xl tracking-wide hover:text-white transition-colors"
                >
                  {agent.phone}
                </a>
                {agent.licenseId && (
                  <p className="text-white/25 text-xs mt-0.5">רישיון תיווך {agent.licenseId}</p>
                )}
              </div>
            ))}
            {agencyName && (
              <>
                <div className="hidden sm:block h-12 w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-xs">המחלקה המסחרית</p>
                  <p className="text-brand-gold font-black text-lg">{agencyName}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════
          MOBILE sticky CTA bar
          ═══════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0d1b3e] p-3 flex gap-2 shadow-2xl">
        <a
          href={`tel:${agents[0]?.phone.replace(/-/g, '')}`}
          className="flex items-center justify-center gap-2 flex-1 rounded-xl border-2 border-brand-gold text-brand-gold font-bold py-3 text-sm hover:bg-brand-gold hover:text-[#0d1b3e] transition-all"
        >
          <Phone size={16} />
          {agents[0]?.phone}
        </a>
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="flex items-center justify-center gap-2 flex-1 rounded-xl bg-brand-gold text-[#0d1b3e] font-bold py-3 text-sm hover:bg-yellow-400 transition-colors"
        >
          <MessageCircle size={16} />
          השאירו פרטים
        </button>
      </div>
      <div className="lg:hidden h-20" />

      {/* Mobile form modal */}
      {formOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/70 flex items-end" onClick={() => setFormOpen(false)}>
          <div
            className="bg-white w-full rounded-t-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#0d1b3e] px-6 py-5 flex items-center justify-between">
              <h2 className="text-white font-black text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                מעוניינים? צרו קשר
              </h2>
              <button type="button" onClick={() => setFormOpen(false)} className="p-2 rounded-xl hover:bg-white/10" aria-label="סגור">
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="p-6">
              <LeadForm leadType="owner" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
