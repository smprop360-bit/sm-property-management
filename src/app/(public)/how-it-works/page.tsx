import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'איך זה עובד | S&M Property Management',
  description: 'תהליך קליטת נכס ב-S&M Property Management — 6 שלבים פשוטים וברורים.',
};

const steps = [
  { n: 1, title: 'מספרים לנו על הנכס', body: 'ממלאים טופס Property 360 עם פרטי הנכס, מצבו ומה מעניין אתכם.' },
  { n: 2, title: 'Property Review', body: 'צוות S&M Property Management בוחן את הנכס, מנתח את השוק ומכין המלצת מסלול בכתב.' },
  { n: 3, title: 'בוחרים מסלול', body: 'נפגשים, עוברים על האפשרויות ומחליטים יחד על מסלול הפעולה.' },
  { n: 4, title: 'קליטה למערכת', body: 'הנכס נכנס לניהול — חוזים, מפתחות, אנשי קשר, ספקים.' },
  { n: 5, title: 'S&M Property Management מנהלת', body: 'אנחנו מטפלים בכל — שוכרים, ספקים, תחזוקה, גביה.' },
  { n: 6, title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים, עדכונים בזמן אמת וגישה לכל מה שקורה.' },
];

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export default function HowItWorksPage() {
  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-24 text-white overflow-hidden lg:px-10 lg:py-32"
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
          <p className="text-sm font-bold tracking-[0.18em] mb-5" style={{ color: '#C8902E' }}>
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> / תהליך
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.05] sm:text-6xl mb-6">
            תהליך פשוט.<br />
            <span style={goldGradient}>ניהול מדויק.</span>
          </h1>
          <p className="mt-2 text-lg leading-8 text-white/65 max-w-xl">
            שישה שלבים ברורים שמחברים בין הצרכים שלכם לבין שגרת ניהול שאפשר לסמוך עליה.
          </p>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="px-6 py-20 lg:px-10 lg:py-28" style={{ background: '#0D1F38' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
            style={{ borderTop: '1px solid rgba(200,144,46,0.2)' }}>
            {steps.map((s, i) => (
              <article
                key={s.n}
                className="py-8 md:px-8"
                style={{
                  borderBottom: '1px solid rgba(200,144,46,0.2)',
                  borderLeft: i % 3 !== 2 ? '1px solid rgba(200,144,46,0.2)' : undefined,
                }}
              >
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: '#C8902E' }}
                >
                  0{s.n}
                </span>
                <h2 className="mt-10 font-heading text-2xl text-white">{s.title}</h2>
                <p className="mt-4 max-w-sm leading-7 text-white/55">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/property-360"
              className="inline-flex min-h-12 items-center gap-3 font-semibold text-white px-7 transition-all"
              style={{
                background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                boxShadow: '0 8px 24px rgba(200,144,46,0.3)',
                borderRadius: '8px',
              }}
            >
              התחילו עם PROPERTY360 <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
