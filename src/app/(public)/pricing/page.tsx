import Link from 'next/link';

export const metadata = {
  title: 'מחירון | TOPROP',
  description: 'חבילות ניהול נכסים של TOPROP — CORE, PREMIUM ו-PRIVATE.',
};

const packages = [
  {
    name: 'CORE',
    positioning: 'ניהול שוטף',
    price: 'החל מ-6%–7%',
    note: 'בכפוף למינימום חודשי',
    features: ['ניהול שוכרים', 'גביית שכירות', 'תחזוקה בסיסית', 'דוחות חודשיים'],
    highlight: false,
  },
  {
    name: 'PREMIUM',
    positioning: 'ניהול מלא ודיווח מתקדם',
    price: 'החל מ-8%–9%',
    note: 'בכפוף למינימום חודשי',
    features: ['כל מה שב-CORE', 'ניהול פעיל של חידוש חוזים', 'דוחות מתקדמים', 'עדיפות בטיפול'],
    highlight: true,
  },
  {
    name: 'PRIVATE',
    positioning: 'ניהול פורטפוליו',
    price: 'הצעה מותאמת',
    note: 'לפורטפוליו של 3+ נכסים',
    features: ['ניהול פורטפוליו', 'מנהל תיק אישי', 'ניתוח תשואה', 'ייעוץ אסטרטגי'],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">מחירון וחבילות</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">שקיפות מחיר — ללא הפתעות</p>
      </section>

      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`bg-white rounded-2xl p-8 border-2 flex flex-col ${pkg.highlight ? 'border-gold shadow-lg' : 'border-gray-100'}`}>
              {pkg.highlight && (
                <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">הכי פופולרי</span>
              )}
              <h2 className="font-heading text-2xl font-bold text-navy mb-1">{pkg.name}</h2>
              <p className="text-brand-muted text-sm mb-4">{pkg.positioning}</p>
              <div className="text-3xl font-bold text-navy mb-1">{pkg.price}</div>
              <p className="text-xs text-brand-muted mb-6">{pkg.note}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="text-sm text-brand-text flex items-center gap-2">
                    <span className="text-gold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/property-360" className="w-full text-center bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-xl transition-colors">
                מתחילים
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-brand-muted max-w-2xl mx-auto">
          * המחירים לא כוללים עמלת תיווך, ניהול פרויקטים, ניקיון, תיקונים וספקים חיצוניים.
          המחיר הסופי תלוי בסוג הנכס ומורכבות הניהול.
        </p>
      </section>
    </div>
  );
}
