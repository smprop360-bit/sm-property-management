import {
  Building2,
  Store,
  Warehouse,
  Factory,
  Layers,
  Briefcase,
  Search,
  Star,
  Users,
} from 'lucide-react'
import { SeekerLeadForm } from '@/components/forms/SeekerLeadForm'

const propertyTypes = [
  { icon: Building2, label: 'משרד' },
  { icon: Store, label: 'חנות' },
  { icon: Warehouse, label: 'מחסן' },
  { icon: Factory, label: 'תעשייה' },
  { icon: Layers, label: 'קרקע' },
  { icon: Briefcase, label: 'עסק' },
]

const valueProps = [
  {
    icon: Search,
    title: 'גישה למאגר',
    text: 'נכסים מסחריים ברחבי ישראל',
  },
  {
    icon: Star,
    title: 'חיפוש מותאם',
    text: 'אנחנו מוצאים לך את הנכס לפי הצרכים שלך',
  },
  {
    icon: Users,
    title: 'ליווי עד הסגירה',
    text: 'איתך מהחיפוש עד חתימת החוזה',
  },
]

export default function SeekersPage() {
  return (
    <>
      {/* Hero + Form */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-navy to-[#0f1e47]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-white">מצא את הנכס</span>
            <span className="block text-brand-gold">שחיפשת</span>
          </h1>
          <p className="text-white/70 text-lg mb-10">
            ספר לנו מה אתה מחפש ונמצא לך את הנכס המתאים
          </p>
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-start max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-brand-navy mb-6 text-center">
              מה אתה מחפש?
            </h2>
            <SeekerLeadForm />
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            מה אנחנו מציעים
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {propertyTypes.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm"
              >
                <Icon className="w-10 h-10 text-brand-gold" />
                <span className="font-medium text-brand-navy text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            איך אנחנו עוזרים?
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
    </>
  )
}
