import Link from '@/i18n/Link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getLatestArticles, formatDate, articles } from '@/lib/blog';
import type { Metadata } from 'next';
import { getT, metaFor } from '@/i18n/server';

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const t = getT(lang);
  return metaFor(lang, `/blog/${slug}`, t(article.title), t(article.excerpt));
}

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const t = getT(lang);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getLatestArticles(4).filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div style={{ background: '#091524', color: '#fff', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-20 lg:px-10 lg:py-24"
        style={{
          background: `
            linear-gradient(160deg, rgba(9,21,36,0.96) 0%, rgba(8,39,79,0.88) 60%, rgba(9,21,36,0.98) 100%),
            url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80') center/cover no-repeat
          `,
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(200,144,46,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="mx-auto max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">S&amp;M</Link>
            <span className="text-white/25">/</span>
            <Link href="/blog" className="text-white/40 hover:text-white/70 transition-colors">{t('מאמרים')}</Link>
            <span className="text-white/25">/</span>
            <span style={{ color: '#C8902E' }}>{t(article.category)}</span>
          </div>

          <div
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(200,144,46,0.15)', border: '1px solid rgba(200,144,46,0.35)', color: '#e5a83e' }}
          >
            {t(article.category)}
          </div>

          <h1 className="font-heading font-black leading-[1.18] mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}>
            {t(article.title)}
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {t(article.excerpt)}
          </p>

          <div className="flex items-center gap-5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #C8902E, #e5a83e)', color: '#091524', flexShrink: 0 }}
              >
                {t(article.author)[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{t(article.author)}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>{t(article.authorTitle)}</p>
              </div>
            </div>
            <span>·</span>
            <span>{formatDate(article.publishDate, lang)}</span>
            <span>·</span>
            <span>{article.readTime} {t('דקות קריאה')}</span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <article className="mx-auto max-w-3xl px-6 py-14 lg:px-10">
        <div className="space-y-6 text-[1.05rem] leading-8" style={{ color: 'rgba(255,255,255,0.82)' }}>
          {article.blocks.map((block, i) => {
            if (block.type === 'p') {
              return <p key={i}>{t(block.text)}</p>;
            }
            if (block.type === 'h2') {
              return (
                <h2
                  key={i}
                  className="font-heading font-bold pt-4"
                  style={{ fontSize: '1.4rem', lineHeight: 1.3, ...goldGradient }}
                >
                  {t(block.text)}
                </h2>
              );
            }
            if (block.type === 'h3') {
              return (
                <h3 key={i} className="font-bold text-white" style={{ fontSize: '1.1rem' }}>
                  {t(block.text)}
                </h3>
              );
            }
            if (block.type === 'ul') {
              return (
                <ul key={i} className="space-y-2 list-none">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      <span style={{ color: '#C8902E', flexShrink: 0, marginTop: 4, fontSize: '0.7rem' }}>◆</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === 'ol') {
              return (
                <ol key={i} className="space-y-2 list-none counter-reset-custom">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: 'rgba(200,144,46,0.18)', color: '#C8902E', marginTop: 1 }}
                      >
                        {j + 1}
                      </span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ol>
              );
            }
            if (block.type === 'callout') {
              const colors = {
                gold: { bg: 'rgba(200,144,46,0.09)', border: 'rgba(200,144,46,0.3)', title: '#C8902E' },
                info: { bg: 'rgba(56,139,253,0.09)', border: 'rgba(56,139,253,0.25)', title: '#61afef' },
                warning: { bg: 'rgba(220,80,60,0.09)', border: 'rgba(220,80,60,0.25)', title: '#e06c75' },
              };
              const c = colors[block.variant ?? 'gold'];
              return (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                >
                  {block.title && (
                    <p className="font-bold text-sm mb-2" style={{ color: c.title }}>{t(block.title)}</p>
                  )}
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.97rem' }}>{t(block.text)}</p>
                </div>
              );
            }
            if (block.type === 'table') {
              return (
                <div key={i} className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'rgba(200,144,46,0.12)' }}>
                        {block.headers.map((h, j) => (
                          <th
                            key={j}
                            className="px-4 py-3 text-start font-bold"
                            style={{ color: '#C8902E', whiteSpace: 'nowrap' }}
                          >
                            {t(h)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: ri % 2 === 1 ? 'rgba(255,255,255,0.025)' : 'transparent' }}
                        >
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-3 text-start" style={{ color: 'rgba(255,255,255,0.75)' }}>
                              {t(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-14 rounded-2xl p-8"
          style={{ background: 'rgba(200,144,46,0.08)', border: '1px solid rgba(200,144,46,0.22)' }}
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C8902E' }}>
            S&amp;M Property Management
          </p>
          <h3 className="font-heading font-bold text-white text-xl mb-3">
            {t('יש שאלות? אנחנו כאן.')}
          </h3>
          <p className="mb-5" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
            {t('ניהול נכסים מקצועי מתחיל בשיחה. נשמח לייעץ ולהסביר איך אנחנו עובדים.')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #C8902E, #e5a83e)', color: '#091524' }}
          >
            {t('קבלו ייעוץ ראשוני חינם')}
          </Link>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {t('← לכל המאמרים')}
          </Link>
        </div>
      </article>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section
          className="px-6 py-14 lg:px-10"
          style={{ background: '#0D1F38', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading font-bold text-white text-xl mb-8">{t('מאמרים נוספים')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="block rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: '#C8902E' }}
                  >
                    {t(a.category)}
                  </span>
                  <p className="font-bold text-white text-sm mt-2 leading-snug line-clamp-3">{t(a.title)}</p>
                  <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.40)' }}>
                    {a.readTime} {t('דקות קריאה')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
