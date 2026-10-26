import Link from 'next/link';
import { articles, formatDate } from '@/lib/blog';

export const metadata = {
  title: 'מאמרים | S&M Property Management',
  description: 'מדריכים, תובנות וידע מקצועי לבעלי נכסים ומשקיעים — חוקים, מיסים, Airbnb, שוכרים וניהול נכסים.',
};

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const categoryMap: Record<string, string> = {
  laws: 'חוקים ומיסים',
  tenants: 'שוכרים',
  maintenance: 'תחזוקה',
  investment: 'השקעות',
  international: 'משקיעים בינלאומיים',
  airbnb: 'Airbnb',
  management: 'ניהול נכסים',
};

const categories = [
  { slug: 'all', label: 'הכל' },
  ...Object.entries(categoryMap).map(([slug, label]) => ({ slug, label })),
];

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div style={{ background: '#091524', color: '#fff' }} dir="rtl" lang="he">

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
          <p className="text-lg leading-8 text-white/65 max-w-lg">
            מדריכים, תובנות וכלים לבעלי נכסים ומשקיעים — מבוססים על חוק ישראלי ומציאות השוק.
          </p>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section
        className="px-6 py-6 lg:px-10"
        style={{ background: '#0D1F38', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2.5 items-center">
            {categories.map((cat, i) => (
              <span
                key={cat.slug}
                className="text-sm font-semibold px-4 py-2 rounded-full"
                style={
                  i === 0
                    ? { background: 'linear-gradient(135deg, #C8902E, #D9AE55)', color: '#fff' }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.55)',
                      }
                }
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="px-6 py-12 lg:px-10" style={{ background: '#091524' }}>
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,144,46,0.2)' }}
          >
            <div className="p-8 sm:p-10 lg:flex lg:items-center lg:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(200,144,46,0.15)', border: '1px solid rgba(200,144,46,0.3)', color: '#e5a83e' }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {featured.readTime} דקות קריאה
                  </span>
                </div>
                <h2 className="font-heading font-black text-white leading-snug mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
                  {featured.title}
                </h2>
                <p className="leading-7 mb-5" style={{ color: 'rgba(255,255,255,0.58)', maxWidth: 560 }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{formatDate(featured.publishDate)}</span>
                </div>
              </div>
              <div
                className="hidden lg:flex shrink-0 w-52 h-52 rounded-2xl items-center justify-center"
                style={{ background: 'rgba(200,144,46,0.08)', border: '1px solid rgba(200,144,46,0.18)' }}
              >
                <span style={{ ...goldGradient, fontSize: '5rem', fontWeight: 900, fontFamily: 'var(--font-heading, serif)' }}>S</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ALL ARTICLES ── */}
      <section className="px-6 pb-20 lg:px-10" style={{ background: '#091524' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(200,144,46,0.12)', color: '#e5a83e' }}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    {article.readTime} דק׳
                  </span>
                </div>
                <h3 className="font-bold text-white leading-snug mb-3 line-clamp-2" style={{ fontSize: '1.05rem' }}>
                  {article.title}
                </h3>
                <p className="text-sm leading-6 line-clamp-3 mb-4" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {formatDate(article.publishDate)}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#C8902E' }}>
                    קראו עוד ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="px-6 py-16 lg:px-10"
        style={{ background: '#0D1F38', borderTop: '1px solid rgba(200,144,46,0.12)' }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#C8902E' }}>
            ניהול מקצועי
          </p>
          <h2 className="font-heading font-black text-white text-3xl mb-4">
            מוכנים לקדם את הנכס שלכם?
          </h2>
          <p className="leading-7 mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            ב-S&M לא רק מנהלים — מבינים נדל"ן. דברו איתנו.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #C8902E, #e5a83e)', color: '#091524', boxShadow: '0 4px 20px rgba(200,144,46,0.35)' }}
          >
            קבלו ייעוץ ראשוני חינם
          </Link>
        </div>
      </section>

    </div>
  );
}
