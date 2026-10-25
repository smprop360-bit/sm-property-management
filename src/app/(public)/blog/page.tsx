export const metadata = {
  title: 'מאמרים | S&M Property Management',
  description: 'מאמרים ומדריכים לבעלי נכסים ומשקיעים.',
};

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const categories = [
  { label: 'ניהול נכסים', count: 0 },
  { label: 'שוכרים', count: 0 },
  { label: 'תחזוקה', count: 0 },
  { label: 'השקעות', count: 0 },
  { label: 'חוקים ומיסים', count: 0 },
  { label: 'Airbnb', count: 0 },
];

export default function BlogPage() {
  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-24 text-white overflow-hidden lg:px-10 lg:py-28"
        style={{
          background: `
            linear-gradient(160deg, rgba(9,21,36,0.94) 0%, rgba(8,39,79,0.86) 60%, rgba(9,21,36,0.96) 100%),
            url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80') center/cover no-repeat
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
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> / INSIGHTS
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.05] sm:text-6xl mb-6">
            ידע שמייצר<br />
            <span style={goldGradient}>החלטות טובות יותר.</span>
          </h1>
          <p className="text-lg leading-8 text-white/65">מדריכים, תובנות וכלים לבעלי נכסים ומשקיעים.</p>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="px-6 py-10 lg:px-10" style={{ background: '#0D1F38', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3 items-center">
            <button
              className="text-sm font-bold px-5 py-2.5 transition-all"
              style={{
                background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                color: '#fff',
                borderRadius: '999px',
              }}
            >
              הכל
            </button>
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="text-sm font-medium px-5 py-2.5 transition-all hover:border-[#C8902E]/50 hover:text-white"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.55)',
                  borderRadius: '999px',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section className="px-6 py-20 lg:px-10 lg:py-28" style={{ background: '#091524' }}>
        <div className="mx-auto max-w-7xl">
          <div
            className="py-12"
            style={{ borderTop: '2px solid rgba(200,144,46,0.35)' }}
          >
            <p className="text-sm font-bold tracking-[0.15em] text-[#C8902E] mb-4">בקרוב</p>
            <h2 className="font-heading text-4xl leading-tight sm:text-5xl mb-6 max-w-2xl">
              אנחנו מכינים כאן<br />
              <span style={goldGradient}>תוכן שימושי לבעלי נכסים.</span>
            </h2>
            <p className="max-w-xl leading-7 text-white/55 mb-12">
              מאמרים ומדריכים על ניהול נכסים, השכרה, תחזוקה וקבלת החלטות עם תמונה מלאה.
            </p>

            {/* Category placeholder cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="p-6"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                  }}
                >
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{ color: '#C8902E' }}
                  >
                    {cat.label}
                  </p>
                  <p className="text-white/35 text-sm">מאמרים בקרוב...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
