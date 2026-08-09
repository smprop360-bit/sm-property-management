import Link from 'next/link'
import {
  Building2,
  Store,
  Warehouse,
  Factory,
  Layers,
  Briefcase,
  Zap,
  Shield,
  Users,
  ArrowLeft,
} from 'lucide-react'

const propertyTypes = [
  { icon: Building2, label: 'משרד' },
  { icon: Store, label: 'חנות' },
  { icon: Warehouse, label: 'מחסן' },
  { icon: Factory, label: 'תעשייה' },
  { icon: Layers, label: 'קרקע' },
  { icon: Briefcase, label: 'עסק' },
]

const stats = [
  { number: '500+', label: 'נכסים במאגר' },
  { number: '30', label: 'ערים' },
  { number: 'מאות', label: 'עסקאות שנסגרו' },
]

const valueProps = [
  {
    icon: Zap,
    title: 'מהיר ואפקטיבי',
    text: 'פרסום מיידי, לקוחות רלוונטיים בתוך ימים',
  },
  {
    icon: Shield,
    title: 'אמינות מלאה',
    text: 'נכסים מאומתים, לידים איכותיים בלבד',
  },
  {
    icon: Users,
    title: 'ליווי מקצועי',
    text: 'צוות מקצועי שמלווה אותך לאורך כל הדרך',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-brand-navy overflow-hidden px-4 py-24">
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#2a3f7f22,transparent)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Overline */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-brand-gold/60" />
            <p className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.35em]">
              TOP PROPERTY FOR YOU
            </p>
            <div className="h-px w-16 bg-brand-gold/60" />
          </div>

          <h1
            className="font-black leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', fontFamily: 'var(--font-heading)' }}
          >
            <span className="block text-white">המאגר הישראלי</span>
            <span className="block text-brand-gold">לנכסים מסחריים</span>
          </h1>

          <p className="text-white/55 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            משרדים, חנויות, מחסנים, קרקעות ועוד —<br className="hidden sm:block" />
            כל הנכסים המסחריים במקום אחד
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold text-white font-semibold px-10 py-4 text-base transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-[0_0_32px_rgba(201,162,39,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
            >
              צור קשר עם אנחנו
              <ArrowLeft size={16} />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-semibold px-10 py-4 text-base transition-all duration-200 hover:border-white/50 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              דבר איתנו היום
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <div className="w-px h-14 bg-gradient-to-b from-white/0 to-white/40" />
        </div>
      </section>

      {/* Property Types */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.3em] mb-3">
              סוגי נכסים
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-brand-navy"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              מה אתה מחפש?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {propertyTypes.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="/#contact"
                className="group flex flex-col items-center gap-3 p-6 bg-brand-light rounded-2xl border border-transparent hover:border-brand-gold/30 hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-white group-hover:bg-brand-gold/8 flex items-center justify-center transition-colors duration-200 shadow-sm">
                  <Icon className="w-7 h-7 text-brand-gold transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="font-semibold text-brand-navy text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-brand-navy">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/10 text-center">
            {stats.map(({ number, label }) => (
              <div key={label} className="py-8 sm:py-0 sm:px-12">
                <div
                  className="text-5xl md:text-6xl font-black text-brand-gold mb-2 leading-none"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {number}
                </div>
                <div className="text-white/50 text-sm tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-black text-brand-navy"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              למה TOPROP?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueProps.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex flex-col gap-5 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-brand-navy" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA Banner */}
      <section className="relative py-20 px-4 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,#C9A22715,transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="h-px w-16 bg-brand-gold/60 mx-auto mb-8" />
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            בעל נכס?
          </h2>
          <p className="text-white/55 text-lg mb-10">
            תן לנו להגיע ללקוחות הנכונים עבורך
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold text-white font-semibold px-10 py-4 text-base transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-[0_0_32px_rgba(201,162,39,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
          >
            צור קשר עכשיו
            <ArrowLeft size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
