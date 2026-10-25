import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export const metadata = {
  title: 'מחירון | S&M Property Management',
  description: 'חבילות ניהול נכסים של S&M Property Management — CORE, PREMIUM ו-PRIVATE.',
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

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export default function PricingPage() {
  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-24 text-white overflow-hidden lg:px-10 lg:py-28"
        style={{
          background: `
            linear-gradient(160deg, rgba(9,21,36,0.94) 0%, rgba(8,39,79,0.86) 60%, rgba(9,21,36,0.96) 100%),
            url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80') center/cover no-repeat
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
          <p className="text-sm font-bold tracking-[0.18em] mb-5" style={{ color: '#C8902E' }}>
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> / מחירון
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.05] sm:text-6xl mb-6">
            מסלול ברור<br />
            <span style={goldGradient}>לניהול מדויק.</span>
          </h1>
          <p className="mt-2 max-w-xl text-lg leading-8 text-white/65">
            שקיפות מחיר מלאה ומסלולים שנבנים סביב הנכס, היעדים ורמת המעורבות שמתאימה לכם.
          </p>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="px-6 py-20 lg:px-10 lg:py-28" style={{ background: '#0D1F38' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: pkg.highlight ? '1px solid rgba(200,144,46,0.5)' : '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  padding: '28px',
                  borderTop: pkg.highlight ? '3px solid #C8902E' : '3px solid rgba(255,255,255,0.15)',
                }}
              >
                {pkg.highlight && (
                  <span
                    className="mb-5 w-fit px-3 py-1 text-xs font-bold"
                    style={{ background: 'rgba(200,144,46,0.2)', color: '#C8902E', borderRadius: '4px' }}
                  >
                    הכי פופולרי
                  </span>
                )}
                <h2 className="font-heading text-2xl text-white">{pkg.name}</h2>
                <p className="mb-7 mt-1 text-sm text-white/50">{pkg.positioning}</p>
                <div
                  className="text-3xl font-semibold"
                  style={pkg.highlight ? goldGradient : { color: '#fff' }}
                >
                  {pkg.price}
                </div>
                <p className="mb-7 mt-1 text-xs text-white/45">{pkg.note}</p>
                <ul
                  className="mb-8 flex-1 space-y-3 pt-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <Check size={16} className="text-[#C8902E] shrink-0" aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/property-360"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 font-semibold transition-all"
                  style={pkg.highlight
                    ? {
                        background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                        color: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 6px 20px rgba(200,144,46,0.3)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.08)',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }
                  }
                >
                  בוחרים מסלול <ArrowLeft size={17} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-6 text-white/40">
            * המחירים לא כוללים עמלת תיווך, ניהול פרויקטים, ניקיון, תיקונים וספקים חיצוניים.
            המחיר הסופי תלוי בסוג הנכס ומורכבות הניהול.
          </p>
        </div>
      </section>

    </div>
  );
}
