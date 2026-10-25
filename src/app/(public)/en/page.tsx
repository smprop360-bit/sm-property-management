import Link from 'next/link';
import { ArrowLeft, Building2, Home, Wrench } from 'lucide-react';

export const metadata = {
  title: 'S&M Property Management | Property Management in Israel',
  description: 'Full-service property management for Israeli properties — long-term rentals, Airbnb, commercial, and investments.',
};

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(12px)',
  borderRadius: '12px',
};

export default function EnglishPage() {
  return (
    <div style={{ background: '#091524', color: '#fff' }} dir="ltr">

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
        <div className="mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-24 relative z-10">
          <div>
            <p className="text-sm font-bold tracking-[0.18em] mb-5" style={{ color: '#C8902E' }}>
              <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> / PROPERTY MANAGEMENT
            </p>
            <h1 className="max-w-3xl font-heading text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-8xl mb-8">
              Managing property.<br />
              <span style={goldGradient}>Maximizing peace of mind.</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/65 mb-10">
              S&M Property Management provides full-service property management for residential and commercial properties in Israel — for local and overseas owners.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/property-360"
                className="inline-flex min-h-12 items-center justify-center gap-3 font-semibold text-white px-7 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                  borderRadius: '8px',
                  boxShadow: '0 6px 20px rgba(200,144,46,0.3)',
                }}
              >
                Check my property <ArrowLeft size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center font-semibold text-white/70 hover:text-white px-7 transition-colors"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div
            className="relative min-h-82.5 p-5 sm:min-h-105"
            style={{
              ...glassCard,
              borderColor: 'rgba(200,144,46,0.25)',
            }}
          >
            <div className="absolute inset-5 border border-[#C8902E]/20 rounded" />
            <div className="absolute bottom-10 left-10 right-10" style={{ borderTop: '1px solid rgba(200,144,46,0.4)' }} />
            <div className="absolute bottom-10 right-10 top-20 w-px" style={{ background: 'rgba(200,144,46,0.3)' }} />
            <p className="absolute right-10 top-10 text-xs tracking-[0.18em] text-[#C8902E]">S&amp;M / 360</p>
            <p className="absolute bottom-16 left-10 max-w-55 font-heading text-3xl leading-tight text-white">
              A clear view of what is happening with your property.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-6 py-16 lg:px-10 lg:py-20" style={{ background: '#0D1F38' }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { icon: Home, title: 'Long-term rentals', body: 'Professional tenant management, contracts, maintenance and monthly reporting.' },
            { icon: Wrench, title: 'Airbnb & short term', body: 'Feasibility analysis first, then full Airbnb management and optimization.' },
            { icon: Building2, title: 'Commercial properties', body: 'Offices, retail and warehouses managed with business-first thinking.' },
          ].map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="p-6"
              style={{
                ...glassCard,
                borderTop: '2px solid #C8902E',
              }}
            >
              <Icon size={24} className="text-[#C8902E]" aria-hidden="true" />
              <h3 className="mt-10 font-heading text-2xl text-white">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/55">{body}</p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
