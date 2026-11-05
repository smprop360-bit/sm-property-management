import { getT, pageMeta } from '@/i18n/server';
import type { LangProps } from '@/i18n/config';
import Link from '@/i18n/Link';
import { ArrowLeft, CheckCircle, Phone } from 'lucide-react';

export const generateMetadata = pageMeta('/about', 'אודות', 'שלומי לימור ומוטי גינדי — מבינים נדל״ן, אוהבים אנשים. ניהול נכסים מקצועי ואישי.');

const values = [
  { title: 'שירות אישי', body: 'קשר ישיר עם בעלי החברה — לא עם נציג. תמיד יודעים מי מטפל בנכס שלכם.' },
  { title: 'שקיפות מלאה', body: 'עדכונים שוטפים, דוחות חודשיים ומידע פתוח. אף פעם לא מנחשים מה קורה.' },
  { title: 'ניסיון בנדל״ן', body: 'הבנה עמוקה של שוק הנדל״ן, שוכרים, עסקאות וניהול נכסים לאורך שנים.' },
  { title: 'ניהול מקצה לקצה', body: 'כתובת אחת לכל הנושאים — שוכרים, ספקים, תיקונים, חוזים ודיווח.' },
];

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
};

export default async function AboutPage({ params }: LangProps) {
  const { lang } = await params;
  const t = getT(lang);
  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-24 text-white overflow-hidden lg:px-10 lg:py-36"
        style={{
          background: `
            linear-gradient(160deg, rgba(9,21,36,0.92) 0%, rgba(8,39,79,0.85) 60%, rgba(9,21,36,0.96) 100%),
            url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80') center/cover no-repeat
          `,
        }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(200,144,46,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="mx-auto max-w-7xl relative z-10">
          <p className="text-sm font-bold tracking-[0.18em] mb-5" style={{ color: '#C8902E' }}>
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> {t('/ אודות')}
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl mb-6">
            {t('מבינים נדל״ן.')}{' '}
            <span style={goldGradient}>{t('אוהבים אנשים.')}</span>
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-white/65">
            {t('S&M Property Management היא חברת ניהול נכסים המאמינה שמאחורי כל נכס עומדים אנשים — בעל נכס שעמל קשה, שוכר שמחפש בית. אנחנו כאן בשביל שניהם.')}
          </p>
        </div>
      </section>

      {/* ── ABOUT COMPANY ── */}
      <section className="px-6 py-20 lg:px-10 lg:py-28" style={{ background: '#0D1F38' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">

            {/* Main text */}
            <div className="space-y-10">
              <div>
                <p className="text-sm font-bold tracking-[0.15em] text-[#C8902E] mb-3">{t('אודות S&M Property Management')}</p>
                <h2 className="font-heading text-4xl font-bold mb-5 sm:text-5xl leading-tight">
                  {t('מבינים נדל״ן.')}{' '}
                  <span style={goldGradient}>{t('אוהבים אנשים.')}</span>
                </h2>
                <div className="space-y-4 text-white/60 leading-relaxed text-lg">
                  <p>
                    <strong className="text-white/90">S&amp;M Property Management</strong> {t('מתמחה בניהול נכסים למגורים ולמסחר, ומעניקה לבעלי נכסים ולמשקיעים מעטפת שירות מקצועית, אישית ומקיפה.')}
                  </p>
                  <p>
                    {t('אנו מאמינים שניהול נכס איכותי מתחיל בהבנת הצרכים של בעל הנכס, ממשיך בטיפול מקצועי בפרטים הקטנים ונשען על תקשורת פתוחה, זמינות ושקיפות לאורך כל הדרך.')}
                  </p>
                  <p>
                    {t('מטרתנו היא לאפשר לבעלי נכסים ליהנות מההשקעה שלהם בראש שקט, תוך שמירה על הנכס, טיפול שוטף בצרכיו וניהול הקשר עם השוכרים ובעלי המקצוע.')}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">{t('הרבה מעבר לניהול נכס')}</h3>
                <div className="space-y-4 text-white/60 leading-relaxed text-lg">
                  <p>{t('עבורנו, כל נכס הוא השקעה בעלת ערך, וכל בעל נכס הוא שותף לדרך.')}</p>
                  <p>
                    {t('אנו פועלים מתוך מחויבות לשירות אישי, אחריות ומקצועיות, ומעניקים פתרונות המותאמים לאופי הנכס ולצרכים הייחודיים של בעליו.')}
                  </p>
                  <p>
                    {t('בין אם מדובר בדירת מגורים, במשרד, בחנות או בנכס מסחרי מניב, אנו שואפים להעניק מענה יעיל, מסודר ואמין.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Values sidebar */}
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold mb-6">{t('הגישה שלנו')}</h3>
              {[
                { title: t('שירות אישי'), body: t('יחס ישיר, הקשבה והבנת הצרכים של כל לקוח.') },
                { title: t('שקיפות ואמינות'), body: t('תקשורת ברורה ועדכונים שוטפים בנוגע לנכס.') },
                { title: t('מקצועיות ואחריות'), body: t('טיפול מסודר בניהול הנכס ובפעילות השוטפת.') },
                { title: t('חשיבה לטווח ארוך'), body: t('שמירה על ערך הנכס ובניית מערכת יחסים יציבה עם בעלי הנכסים.') },
              ].map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    ...glassCard,
                    padding: '24px',
                    borderInlineStart: i % 2 === 0 ? '3px solid #C8902E' : '3px solid rgba(255,255,255,0.25)',
                  }}
                >
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}

              {/* Closing statement */}
              <div
                style={{
                  ...glassCard,
                  padding: '24px',
                  borderTop: '2px solid #C8902E',
                  marginTop: '8px',
                }}
              >
                <p className="font-bold text-lg mb-2">{t('הנכס שלכם. האחריות שלנו.')}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-3">
                  {t('אנו מאמינים שניהול נכון של נכס משלב הבנה מקצועית בנדל״ן עם שירות אנושי ואישי. אנחנו כאן כדי לדאוג לפרטים, לטפל באתגרים ולספק לבעלי הנכסים כתובת מקצועית אחת.')}
                </p>
                <p className="text-sm font-semibold italic" style={{ color: '#C8902E' }}>
                  {t('מבינים נדל״ן. אוהבים אנשים.')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="px-6 py-24 lg:px-10 lg:py-32" style={{ background: '#091524' }}>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.15em] text-[#C8902E] mb-3">{t('הצוות שלנו')}</p>
          <h2 className="font-heading text-4xl font-bold mb-16 sm:text-5xl">
            {t('הפנים מאחורי')} <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span>
          </h2>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Shlomi */}
            <div
              style={{
                ...glassCard,
                overflow: 'hidden',
                borderRadius: '24px',
              }}
            >
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #08274F, #0d3a70)' }} />
              <div className="p-10">
                <div className="flex items-center gap-5 mb-7">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black shrink-0"
                    style={{ background: 'linear-gradient(135deg, #08274F, #0d3a70)' }}
                  >
                    {t('ש')}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-bold text-white text-2xl">{t('שלומי לימור')}</h3>
                      <a
                        href="tel:+972559522746"
                        dir="ltr"
                        className="text-sm font-medium text-white/70 hover:text-[#C8902E] transition-colors"
                      >
                        055-952-2746
                      </a>
                    </div>
                    <p className="text-[#C8902E] font-semibold text-sm tracking-wide mt-1">{t('שותף מייסד')}</p>
                    <a
                      href="mailto:shlomy@prop360.co.il"
                      dir="ltr"
                      className="inline-block text-sm text-white/70 hover:text-[#C8902E] transition-colors mt-1"
                    >
                      shlomy@prop360.co.il
                    </a>
                  </div>
                </div>
                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>{t('שלומי מביא ניסיון רב שנים בניהול נכסים ובשוק הנדל״ן הישראלי. הגישה שלו: כל נכס הוא השקעה שצריכה לעבוד נכון, וכל בעל נכס מגיע לשירות אמיתי ושקוף.')}</p>
                  <p>{t('הוא מאמין שניהול נכסים טוב הוא שילוב של ניסיון, אמינות ותשומת לב לפרטים — ולכן מעורב אישית בכל נכס שתחת הניהול שלנו.')}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[t('ניהול נכסים'), t('שוק הנדל״ן'), t('קשרים עם שוכרים')].map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(8,39,79,0.5)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Moti */}
            <div
              style={{
                ...glassCard,
                overflow: 'hidden',
                borderRadius: '24px',
              }}
            >
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #C8902E, #D9AE55)' }} />
              <div className="p-10">
                <div className="flex items-center gap-5 mb-7">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C8902E, #D9AE55)' }}
                  >
                    {t('מ')}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-bold text-white text-2xl">{t('מוטי גינדי')}</h3>
                      <a
                        href="tel:+972525776892"
                        dir="ltr"
                        className="text-sm font-medium text-white/70 hover:text-[#C8902E] transition-colors"
                      >
                        052-577-6892
                      </a>
                    </div>
                    <p className="text-[#C8902E] font-semibold text-sm tracking-wide mt-1">{t('שותף מייסד')}</p>
                    <a
                      href="mailto:moty@prop360.co.il"
                      dir="ltr"
                      className="inline-block text-sm text-white/70 hover:text-[#C8902E] transition-colors mt-1"
                    >
                      moty@prop360.co.il
                    </a>
                  </div>
                </div>
                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>{t('מוטי מתמחה בצד העסקי והמסחרי של ניהול הנכסים. עם רקע בתחום הנדל״ן המסחרי, הוא מביא ראייה כלכלית ועסקית שמסייעת לבעלי נכסים למקסם את התשואה.')}</p>
                  <p>{t('הגישה שלו מבוססת על נתונים, תכנון קדימה ויחסי עבודה ארוכי טווח עם שוכרים ובעלי נכסים כאחד.')}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[t('נכסים מסחריים'), t('תכנון פיננסי'), t('השבחת נכסים')].map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(200,144,46,0.15)', color: '#C8902E', border: '1px solid rgba(200,144,46,0.25)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="px-6 py-24 lg:px-10" style={{ background: '#0D1F38' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.15em] text-[#C8902E] mb-4">{t('הגישה שלנו')}</p>
              <h2 className="font-heading text-4xl font-bold leading-tight mb-6 sm:text-5xl">
                {t('פחות דאגות.')}<br /><span style={goldGradient}>{t('יותר שקט.')}</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {t('אנחנו מאמינים שבעל נכס לא צריך לאבד שינה על השוכר, על הצנרת או על הדוח החודשי. זה בדיוק מה שאנחנו עושים בשבילכם.')}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  t('קשר ישיר — תמיד תדעו עם מי אתם מדברים'),
                  t('דוחות חודשיים ברורים ומפורטים'),
                  t('טיפול מהיר בכל תקלה או בקשה'),
                  t('שקיפות מלאה בכל החלטה'),
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle size={18} className="text-[#C8902E] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                  boxShadow: '0 8px 24px rgba(200,144,46,0.35)',
                }}
              >
                {t('דברו איתנו')}
                <ArrowLeft size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} style={{ ...glassCard, padding: '24px' }}>
                  <h3 className="font-bold text-white mb-2">{t(v.title)}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{t(v.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 lg:px-10" style={{ background: '#091524' }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-widest text-[#C8902E] uppercase mb-4">{t('מתחילים בשיחה')}</p>
          <h2 className="font-heading text-4xl font-bold mb-5 sm:text-5xl">
            {t('רוצים לשמוע על')} <span style={goldGradient}>{t('ניהול הנכס שלכם?')}</span>
          </h2>
          <p className="text-white/55 text-lg mb-8">{t('נשמח להכיר, לשמוע על הנכס ולהסביר איך אנחנו עובדים.')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                boxShadow: '0 8px 32px rgba(200,144,46,0.3)',
              }}
            >
              {t('צרו קשר עכשיו')}
              <ArrowLeft size={18} />
            </Link>
            <a
              href="tel:+972552601077"
              className="inline-flex items-center justify-center gap-3 font-semibold text-lg px-10 py-4 rounded-xl transition-all text-white/70 hover:text-white"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <Phone size={18} />
              055-260-1077
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
