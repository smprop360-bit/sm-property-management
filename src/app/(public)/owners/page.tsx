import Link from 'next/link'
import { ClipboardList, Phone, TrendingUp, CheckCircle } from 'lucide-react'
import { LeadForm } from '@/components/forms/LeadForm'

const processSteps = [
  {
    icon: ClipboardList,
    title: 'מלא את הטופס',
    text: 'השאר פרטים בסיסיים על הנכס שלך',
  },
  {
    icon: Phone,
    title: 'נתאם שיחת היכרות',
    text: 'נציג שלנו יחזור אליך תוך 24 שעות',
  },
  {
    icon: TrendingUp,
    title: 'אנחנו מטפלים בשיווק',
    text: 'אנחנו מגיעים ללקוחות הנכונים בשבילך',
  },
]

const benefits = [
  'פרסום רחב ברחבי ישראל',
  'לידים איכותיים בלבד',
  'ייעוץ ושיווק ללא עלות ראשונית',
]

export default function OwnersPage() {
  return (
    <>
      {/* Hero + Form */}
      <section id="owner-form" className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-4">
                לבעלי נכסים
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
                פרסם את הנכס שלך
              </h1>
              <div className="w-16 h-1 bg-brand-gold mb-6" />
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                אנחנו מגיעים ללקוחות הנכונים. בלי בינוניות, בלי בזבוז זמן.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-brand-navy mb-6">
                השאר פרטים ונחזור אליך
              </h2>
              <LeadForm leadType="owner" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            איך זה עובד?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center">
                  <span className="absolute -top-2 -inset-e-2 w-6 h-6 rounded-full bg-brand-gold text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-brand-navy text-lg">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-brand-navy text-center">
        <h2 className="text-2xl font-bold text-white mb-6">מוכן להתחיל?</h2>
        <Link
          href="#owner-form"
          className="inline-flex items-center justify-center rounded-lg bg-brand-gold text-white font-semibold px-10 py-4 text-base transition-colors hover:bg-brand-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
        >
          פרסם את הנכס שלך
        </Link>
      </section>
    </>
  )
}
