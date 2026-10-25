import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

type Props = {
  badge: string
  title: string
  subtitle: string
  body: string
  features: string[]
  ctaLabel?: string
  ctaHref?: string
}

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(12px)',
  borderRadius: '12px',
}

export default function ServicePageTemplate({
  badge,
  title,
  subtitle,
  body,
  features,
  ctaLabel = 'בדיקת הנכס שלי',
  ctaHref = '/property-360',
}: Props) {
  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-24 text-white overflow-hidden lg:px-10 lg:py-28"
        style={{
          background: `
            linear-gradient(160deg, rgba(9,21,36,0.94) 0%, rgba(8,39,79,0.86) 60%, rgba(9,21,36,0.96) 100%),
            url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80') center/cover no-repeat
          `,
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(200,144,46,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="mx-auto max-w-7xl relative z-10">
          <p className="text-sm font-bold tracking-[0.18em] text-[#C8902E] mb-5">{badge}</p>
          <div className="mt-2 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-24">
            <h1 className="font-heading text-5xl font-bold leading-[1.08] sm:text-6xl">{title}</h1>
            <p className="max-w-lg text-xl leading-8 text-white/65">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="px-6 py-16 lg:px-10 lg:py-24" style={{ background: '#0D1F38' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">

            <div>
              <p className="text-sm font-bold tracking-[0.15em] text-[#C8902E] mb-4">הגישה שלנו</p>
              <p className="max-w-md text-lg leading-8 text-white/60">{body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={ctaHref}
                  className="inline-flex min-h-12 items-center justify-center gap-3 font-semibold text-white transition-all px-6"
                  style={{
                    background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                    borderRadius: '8px',
                    boxShadow: '0 6px 20px rgba(200,144,46,0.3)',
                  }}
                >
                  {ctaLabel} <ArrowLeft size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-3 font-semibold text-white/70 hover:text-white transition-colors px-6"
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                  }}
                >
                  דברו איתנו <ArrowLeft size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div>
              <div
                className="mb-5 flex items-center justify-between pb-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <h2 className="font-heading text-3xl">מה כולל השירות</h2>
                <span className="text-sm font-bold" style={{ color: '#ffffff' }}>S&amp;M</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex min-h-24 items-start gap-4 p-5"
                    style={glassCard}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: 'rgba(200,144,46,0.15)', color: '#C8902E' }}
                    >
                      <Check size={16} aria-hidden="true" />
                    </span>
                    <span className="pt-1 leading-6 text-white/70">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROPERTY360 CTA ── */}
      <section style={{ background: '#091524' }}>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-14 sm:flex-row sm:items-center lg:px-10">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-[#C8902E] mb-2">PROPERTY360</p>
            <h2 className="font-heading text-3xl">מתחילים מ<span style={goldGradient}>תמונה ברורה.</span></h2>
          </div>
          <Link
            href="/property-360"
            className="inline-flex min-h-12 items-center justify-center gap-3 font-semibold text-white px-7 transition-all"
            style={{
              background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
              borderRadius: '8px',
              boxShadow: '0 6px 20px rgba(200,144,46,0.3)',
            }}
          >
            בדיקת הנכס שלי <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  )
}
