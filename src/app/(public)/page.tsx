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
      <section className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-brand-navy to-[#0f1e47] text-center px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="block text-white">המאגר הישראלי</span>
            <span className="block text-brand-gold">לנכסים מסחריים</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            משרדים, חנויות, מחסנים, קרקעות ועוד — כל הנכסים המסחריים במקום אחד
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seekers"
              className="inline-flex items-center justify-center rounded-lg bg-brand-gold text-white font-semibold px-8 py-4 text-base transition-colors hover:bg-brand-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
            >
              אני מחפש נכס
            </Link>
            <Link
              href="/owners"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/60 text-white font-semibold px-8 py-4 text-base transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              יש לי נכס להציע
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            סוגי נכסים
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            מה אתה מחפש?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {propertyTypes.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="/seekers"
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <Icon className="w-10 h-10 text-brand-gold group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-brand-navy text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-brand-navy">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map(({ number, label }) => (
              <div key={label}>
                <div className="text-5xl font-black text-brand-gold mb-2">{number}</div>
                <div className="text-white/70 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            למה TOPROP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center">
                  <Icon className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA Banner */}
      <section className="py-16 px-4 bg-linear-to-r from-brand-gold to-[#e0b830]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            בעל נכס? תן לנו להגיע ללקוחות הנכונים עבורך
          </h2>
          <Link
            href="/owners"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy text-white font-semibold px-10 py-4 text-base transition-colors hover:bg-brand-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50"
          >
            פרסם עכשיו
          </Link>
        </div>
      </section>
    </>
  )
}
