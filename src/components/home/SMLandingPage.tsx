'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Building2,
  Briefcase,
  TrendingUp,
  Handshake,
  Wrench,
  CheckCircle,
  Phone,
  Eye,
  Calculator,
  ShieldCheck,
  MapPin,
  Mail,
  Star,
  Quote,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { LeadForm } from '@/components/forms/LeadForm';

/* ─── Glass card helper ─── */
const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '16px',
};

/* ─── Gold gradient text ─── */
const goldText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const services = [
  { icon: Building2, title: 'ניהול נכסים למגורים', body: 'טיפול שוטף — שוכרים, חוזים, תחזוקה ודוחות חודשיים מפורטים.', href: '/property-management', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' },
  { icon: Briefcase, title: 'ניהול נכסים מסחריים', body: 'ניהול משרדים, חנויות ונכסים מניבים עם חשיבה עסקית.', href: '/commercial-property-management', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { icon: TrendingUp, title: 'השכרה ואיתור שוכרים', body: 'שיווק הנכס, בדיקת שוכרים וליווי כל תהליך ההשכרה.', href: '/services', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
  { icon: Handshake, title: 'ליווי בעלי נכסים', body: 'ייעוץ, ליווי אישי ושותפות לבעלי נכסים ומשקיעים.', href: '/investors', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80' },
  { icon: Wrench, title: 'תחזוקה וטיפול בתקלות', body: 'רשת ספקים מקצועית. תיקונים, שיפוצים וטיפול בכל בקשה.', href: '/services', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { icon: Eye, title: 'שקיפות ודיווח', body: 'דוחות חודשיים ברורים וגישה מלאה למידע בכל רגע.', href: '/services', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
];

const stats = [
  { value: 500, suffix: '+', label: 'נכסים מנוהלים' },
  { value: 97, suffix: '%', label: 'שיעור תפוסה' },
  { value: 12, suffix: '+', label: 'שנות ניסיון' },
  { value: 4, suffix: '.9★', label: 'דירוג ממוצע' },
];

const steps = [
  { n: '01', title: 'מספרים לנו על הנכס', body: 'ממלאים טופס קצר עם פרטי הנכס.' },
  { n: '02', title: 'Property 360 Review', body: 'בוחנים את הנכס ומכינים המלצת מסלול.' },
  { n: '03', title: 'בוחרים מסלול', body: 'ביחד מחליטים על האסטרטגיה הנכונה.' },
  { n: '04', title: 'קליטה למערכת', body: 'חוזים, מפתחות ואנשי קשר — הכל מתועד.' },
  { n: '05', title: 'S&M מנהלת', body: 'מטפלים בכל — שוכרים, ספקים ותחזוקה.' },
  { n: '06', title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים ועדכונים שוטפים.' },
];

const whyItems = [
  { icon: '👁️', title: 'שקיפות מלאה', body: 'דוחות חודשיים וגישה לכל מה שקורה בנכס.' },
  { icon: '💰', title: 'חשיבה כלכלית', body: 'לא רק ניהול — מקסימום רווחיות לנכס.' },
  { icon: '📍', title: 'כתובת אחת', body: 'שוכרים, ספקים, חוזים — הכל דרכנו.' },
  { icon: '🛡️', title: 'ניהול מקצועי', body: 'צוות מנוסה עם גישה שיטתית.' },
  { icon: '📊', title: 'טכנולוגיה', body: 'מערכת דיגיטלית עם מעקב הכנסות.' },
  { icon: '🌍', title: 'משקיעים בינלאומיים', body: 'עובדים צמוד עם משקיעים מחו״ל — ליווי מקצועי בשפה שלהם.' },
];

const team = [
  { name: 'שלומי לימור', role: 'שותף מייסד', initials: 'ש', stripe: 'navy', tags: ['ניהול נכסים', 'קשרי שוכרים'], email: 'shlomy@prop360.co.il', phone: '055-260-1077', phoneHref: 'tel:+972552601077', waHref: 'https://wa.me/972552601077', bio: 'מומחה לניהול נכסים למגורים עם ניסיון של מעל 10 שנים בשוק הנדל"ן הישראלי. מתמחה בקשרי שוכרים ופתרון אתגרים שוטפים.' },
  { name: 'מוטי גינדי', role: 'שותף מייסד', initials: 'מ', stripe: 'gold', tags: ['נכסים מסחריים', 'תכנון פיננסי'], email: 'moty@prop360.co.il', phone: '052-577-6892', phoneHref: 'tel:+972525776892', waHref: 'https://wa.me/972525776892', bio: 'מתמחה בנכסים מסחריים ובתכנון פיננסי אסטרטגי. מביא ניסיון רב בניהול תיקי השקעות נדל"ן של לקוחות בארץ ובחו"ל.' },
];

const testimonials = [
  { quote: 'שלומי ומוטי פשוט מצוינים. הנכס תמיד מושכר ואני מקבל דוח מסודר כל חודש — בלי להרים טלפון.', name: 'דוד כהן', role: 'בעל נכס, תל אביב', initials: 'ד.כ', rating: 5 },
  { quote: 'לא האמנתי שניהול נכסים יכול להיות כל כך פשוט. הם מטפלים בכל — שוכרים, תיקונים, חוזים.', name: 'רונה ישראלי', role: 'משקיעת נדל"ן, רמת גן', initials: 'ר.י', rating: 5 },
  { quote: 'כבר 3 שנים שהם מנהלים לי שתי דירות. שקט מוחלט. כל בעיה מטופלת לפני שאני יודע עליה.', name: 'יוסי מזרחי', role: 'בעל נכסים, נתניה', initials: 'י.מ', rating: 5 },
  { quote: 'השוכרים מרוצים, הנכס מתוחזק, והדוחות שקופים לגמרי. המקצועיות ברמה אחרת.', name: 'מיכל שפירא', role: 'בעלת נכס, הרצליה', initials: 'מ.ש', rating: 5 },
];


/* ─── Section label component ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold tracking-[0.14em] uppercase mb-3" style={{ color: '#C8902E' }}>
      {children}
    </p>
  );
}

function GoldDivider() {
  return (
    <div className="w-12 h-[3px] rounded-sm mb-8 mt-4"
      style={{ background: 'linear-gradient(90deg, #C8902E, #e5a83e)' }} />
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function SMLandingPage() {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-60px' });
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' });
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: '-60px' });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-60px' });
  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-60px' });

  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes gridScrollDiag {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes pulseGold {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(1.4); }
        }
        .pulse-dot { animation: pulseGold 2s ease-in-out infinite; }
        .glass-card { transition: border-color .3s, box-shadow .3s, transform .3s; }
        .glass-card:hover {
          border-color: rgba(200,144,46,0.55) !important;
          box-shadow: 0 0 32px rgba(200,144,46,0.14), 0 8px 40px rgba(0,0,0,0.4);
          transform: translateY(-4px);
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          padding: '7rem 8% 6rem',
          backgroundImage: `
            linear-gradient(160deg, rgba(9,21,36,0.82), rgba(8,39,79,0.78), rgba(9,21,36,0.90)),
            url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Animated grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(200,144,46,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(200,144,46,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridScrollDiag 6s linear infinite',
        }} />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image src="/sm-logo.png" alt="" width={480} height={480} priority aria-hidden
            style={{ borderRadius: '50%', opacity: 0.06, filter: 'blur(2px)' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/sm-logo.png"
              alt="S&M Property Management"
              width={80}
              height={80}
              priority
              style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 20px rgba(200,144,46,0.6))' }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-heading font-black leading-[1.22] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
          >
            הנכס שלכם.{' '}
            <br />
            <span style={goldText}>תנו לנו לדאוג לשקט שלכם.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.80)' }}
          >
            ניהול מקצועי ואישי של נכסים למגורים ולמסחר. אנחנו דואגים לנכס, לשוכרים ולכל הפרטים הקטנים — כדי שתוכלו ליהנות מההשקעה בראש שקט.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #C8902E, #e5a83e)',
                color: '#091524',
                boxShadow: '0 4px 24px rgba(200,144,46,0.40)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(200,144,46,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(200,144,46,0.40)')}
            >
              קבלו הצעה לניהול הנכס
              <ArrowLeft size={18} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-3 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200"
              style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8902E'; e.currentTarget.style.background = 'rgba(200,144,46,0.10)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
            >
              הכירו את השירותים שלנו
              <ArrowLeft size={16} style={{ color: '#C8902E' }} />
            </Link>
          </motion.div>
          </div>

          {/* ── Right: property dashboard panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hidden lg:block w-full max-w-sm shrink-0"
          >
            {/* Property card */}
            <div style={{ ...glassCard, overflow: 'hidden', borderColor: 'rgba(200,144,46,0.3)' }}>
              <div
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '180px',
                  position: 'relative',
                }}
              >
                <span style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(16,180,90,0.18)', border: '1px solid rgba(16,180,90,0.45)',
                  color: '#4ddb8f', borderRadius: 20, padding: '3px 10px',
                  fontSize: '0.72rem', fontWeight: 700,
                }}>מושכר ✓</span>
                <span style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                  color: '#fff', borderRadius: 8, padding: '3px 10px',
                  fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)',
                }}>📍 תל אביב</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.73rem', marginBottom: 3 }}>ניהול נכסים | דירה 4 חדרות</p>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>רחוב דיזנגוף, תל אביב</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 18px' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)' }}>תשואה שנתית</p>
                  <p style={{ fontWeight: 800, ...goldText, fontSize: '1.15rem' }}>6.8%</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)' }}>שכר דירה</p>
                  <p style={{ fontWeight: 800, color: '#fff', fontSize: '1.15rem' }}>₪7,200</p>
                </div>
              </div>
            </div>

            {/* Stat chips */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              {([
                { label: 'נכסים מנוהלים', value: '500+', gold: true },
                { label: 'שיעור תפוסה', value: '97%', gold: false },
              ] as { label: string; value: string; gold: boolean }[]).map(stat => (
                <div key={stat.label} style={{ ...glassCard, padding: '12px 16px', borderColor: 'rgba(200,144,46,0.2)' }}>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)', marginBottom: 3 }}>{stat.label}</p>
                  <p style={{ fontWeight: 800, fontSize: '1.3rem', ...(stat.gold ? goldText : { color: '#fff' }) }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* S&M badge */}
            <div style={{ ...glassCard, marginTop: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderColor: 'rgba(200,144,46,0.3)' }}>
              <Image src="/sm-logo.png" alt="S&M" width={32} height={32} style={{ borderRadius: '50%', flexShrink: 0 }} />
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem' }}>S&M מנהלת את הנכס שלכם</p>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.72rem' }}>prop360.co.il</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ background: '#0D1F38', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <SectionLabel>השירותים שלנו</SectionLabel>
          <h2 className="font-heading font-extrabold text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.28 }}>
            הנכס שלכם. הניהול שלנו.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1.05rem', maxWidth: '520px', marginTop: '0.75rem' }}>
            מגורים, מסחר, השכרה ותחזוקה — מעטפת שירות מלאה לבעלי נכסים ומשקיעים.
          </p>
          <GoldDivider />
        </AnimatedSection>

        <div ref={servicesRef} className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={s.href} className="glass-card block h-full overflow-hidden" style={{ ...glassCard, padding: 0 }}>
                  <div
                    style={{
                      backgroundImage: `url('${s.img}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '175px',
                    }}
                  />
                  <div className="p-6">
                    <div className="rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(200,144,46,0.18)', width: 44, height: 44 }}>
                      <Icon size={19} style={{ color: '#C8902E' }} />
                    </div>
                    <h3 className="font-bold text-white mb-2" style={{ fontSize: '1rem' }}>{s.title}</h3>
                    <p className="leading-relaxed" style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.60)' }}>{s.body}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: '#C8902E' }}>
                      קראו עוד <ArrowLeft size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #06192f 0%, #040d1b 100%)',
          borderTop: '1px solid rgba(200,144,46,0.12)',
          borderBottom: '1px solid rgba(200,144,46,0.12)',
          padding: '5rem 8%',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-x-reverse" style={{ '--tw-divide-opacity': '0.1' } as React.CSSProperties}>
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} direction="up">
              <div className="text-center py-8 px-4">
                <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', ...goldText }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={1.8} />
                </p>
                <p style={{ fontSize: '.92rem', color: 'rgba(255,255,255,0.60)', fontWeight: 500 }}>{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          COVERAGE CITIES
      ══════════════════════════════════════ */}
      <section style={{ background: '#091524', borderTop: '1px solid rgba(200,144,46,0.10)', padding: '2.5rem 8%' }}>
        <AnimatedSection direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', flexShrink: 0 }}>
              אזורי פעילות
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['תל אביב', 'רמת גן', 'הרצליה', 'נתניה', 'פתח תקווה', 'רעננה', 'כפר סבא', 'ראש העין', 'ירושלים', 'חיפה'].map(city => (
                <span
                  key={city}
                  className="text-sm font-medium px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.55)' }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════
          WHY S&M
      ══════════════════════════════════════ */}
      <section style={{ background: '#091524', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <div className="flex items-center gap-4 mb-3">
            <Image
              src="/sm-logo.png"
              alt="S&M"
              width={44}
              height={44}
              style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 12px rgba(200,144,46,0.45))' }}
            />
            <SectionLabel>למה S&amp;M</SectionLabel>
          </div>
          <h2 className="font-heading font-extrabold text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.28 }}>
            לא רק מנהלים את הנכס.{' '}
            <span style={goldText}>מנהלים את ההשקעה.</span>
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <div ref={whyRef} className="grid gap-5 mt-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {whyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-card text-center p-8 h-full" style={glassCard}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>{item.title}</h3>
                <p style={{ fontSize: '.87rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.6 }}>{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section style={{ background: '#0D1F38', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <SectionLabel>התהליך</SectionLabel>
          <h2 className="font-heading font-extrabold text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.28 }}>
            איך זה עובד?
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <div ref={stepsRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-7"
              style={glassCard}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg mb-5"
                style={{
                  background: 'linear-gradient(135deg, #C8902E, #e5a83e)',
                  color: '#091524',
                  boxShadow: '0 0 24px rgba(200,144,46,0.45)',
                  width: 56, height: 56, flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.55 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROPERTY 360 — coming soon
      ══════════════════════════════════════ */}
      <section style={{ background: '#091524', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <div
            className="relative overflow-hidden rounded-2xl p-10 sm:p-14 flex flex-col lg:flex-row gap-10 items-start"
            style={{
              background: 'rgba(8,39,79,0.35)',
              border: '1px solid rgba(200,144,46,0.25)',
              borderRight: '4px solid #C8902E',
            }}
          >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 90% 50%, rgba(200,144,46,0.07), transparent 65%)',
            }} />

            <div className="shrink-0 relative z-10">
              <Image
                src="/sm-logo.png"
                alt="S&M Property Management"
                width={72}
                height={72}
                style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 20px rgba(200,144,46,0.5))' }}
              />
            </div>

            <div className="relative z-10 flex-1">
              <div
                className="inline-block text-xs font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(200,144,46,0.2), rgba(200,144,46,0.08))',
                  border: '1px solid rgba(200,144,46,0.45)',
                  color: '#e5a83e',
                }}
              >
                בקרוב — PROPERTY 360
              </div>
              <h2 className="font-heading font-extrabold text-white mb-3" style={{ fontSize: '1.7rem', lineHeight: 1.3 }}>
                הפורטל הדיגיטלי שישנה את ניהול הנכס שלכם.
              </h2>
              <p className="mb-8" style={{ color: 'rgba(255,255,255,0.60)', fontSize: '.95rem', lineHeight: 1.7, maxWidth: 520 }}>
                Property360 — דשבורד הכנסות, מסמכים דיגיטליים, מעקב תחזוקה ועדכונים שוטפים — הכל במקום אחד, בזמן אמת.
              </p>
              <ul className="space-y-3 mb-8">
                {['דשבורד הכנסות ודוחות חודשיים', 'מעקב בקשות תחזוקה', 'חוזים ומסמכים דיגיטליים', 'הודעות ועדכונים שוטפים'].map(p => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle size={16} style={{ color: '#C8902E', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '.93rem' }}>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/property-360"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                style={{ border: '1.5px solid rgba(200,144,46,0.45)', color: '#e5a83e' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,144,46,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                קראו עוד על Property360
                <ArrowLeft size={15} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section style={{ background: '#0D1F38', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <div className="flex items-center gap-4 mb-3">
            <Image
              src="/sm-logo.png"
              alt="S&M"
              width={44}
              height={44}
              style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 12px rgba(200,144,46,0.45))' }}
            />
            <SectionLabel>הצוות שלנו</SectionLabel>
          </div>
          <h2 className="font-heading font-extrabold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.28, color: 'rgba(255,255,255,0.7)' }}>
            הפנים מאחורי{' '}
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span>
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300 cursor-default"
                style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
              >
                {/* Top stripe */}
                <div
                  className="px-6 py-5 flex items-center gap-4"
                  style={{
                    background: member.stripe === 'navy' ? '#08274F' : 'linear-gradient(135deg, #2a1800, #3d2400)',
                    borderBottom: member.stripe === 'navy' ? '2px solid #1a4080' : '2px solid #C8902E',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0"
                    style={{
                      background: member.stripe === 'navy'
                        ? 'linear-gradient(135deg, #08274F, #0d3a70)'
                        : 'linear-gradient(135deg, #C8902E, #e5a83e)',
                      color: member.stripe === 'gold' ? '#091524' : '#fff',
                    }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-base leading-tight">{member.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: member.stripe === 'gold' ? '#e5a83e' : 'rgba(255,255,255,0.55)' }}>{member.role}</p>
                  </div>
                </div>
                {/* Body */}
                <div className="p-5 space-y-4">
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65 }}>{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(200,144,46,0.15)', color: '#e5a83e', border: '1px solid rgba(200,144,46,0.25)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={member.phoneHref}
                    className="flex items-center gap-2 text-xs font-semibold transition-colors"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C8902E')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}
                  >
                    <Phone size={13} style={{ flexShrink: 0 }} />
                    {member.phone}
                  </a>
                  <a
                    href={member.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold transition-colors"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-xs font-semibold transition-colors"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C8902E')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}
                  >
                    <Mail size={13} style={{ flexShrink: 0 }} />
                    {member.email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section style={{ background: '#091524', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <SectionLabel>מה אומרים עלינו</SectionLabel>
          <h2 className="font-heading font-extrabold text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.28 }}>
            בעלי נכסים מדברים.
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-card p-6 h-full flex flex-col" style={glassCard}>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={13} style={{ color: '#C8902E', fill: '#C8902E' }} />
                  ))}
                </div>
                <Quote size={18} style={{ color: 'rgba(200,144,46,0.35)', marginBottom: 8 }} />
                <p className="flex-1 mb-5" style={{ fontSize: '.88rem', color: 'rgba(255,255,255,0.70)', lineHeight: 1.65 }}>{t.quote}</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C8902E, #e5a83e)', color: '#091524' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Average rating */}
        <AnimatedSection direction="up" delay={0.4}>
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={18} style={{ color: '#C8902E', fill: '#C8902E' }} />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9</span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.40)' }}>ממוצע דירוג לקוחות</span>
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════ */}
      <section style={{ background: '#0D1F38', padding: '5rem 8%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

          {/* Info */}
          <AnimatedSection direction="up">
            <SectionLabel>צרו קשר</SectionLabel>
            <h2 className="font-heading font-extrabold text-white mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.28 }}>
              מבינים נדל״ן.{' '}
              <span style={goldText}>אוהבים אנשים.</span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
              נשמח להכיר, לשמוע על הנכס שלכם ולהסביר איך אנחנו עובדים. פנו אלינו ואנחנו נחזור אליכם תוך יום עסקים.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                { icon: Phone, label: 'שלומי לימור', value: '055-260-1077', href: 'tel:+972552601077' },
                { icon: Phone, label: 'מוטי גינדי', value: '052-577-6892', href: 'tel:+972525776892' },
                { icon: Mail, label: 'אימייל', value: 'info@prop360.co.il', href: 'mailto:info@prop360.co.il' },
                { icon: MapPin, label: 'כתובת', value: 'תל אביב, ישראל', href: null },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(200,144,46,0.15)', border: '1px solid rgba(200,144,46,0.25)' }}>
                      <Icon size={18} style={{ color: '#C8902E' }} />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-white hover:text-gold transition-colors">{item.value}</a>
                      ) : (
                        <p className="font-semibold text-white">{item.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul className="space-y-3">
              {['קשר ישיר עם בעלי החברה', 'תגובה תוך יום עסקים אחד', 'ייעוץ ראשוני ללא עלות'].map(item => (
                <li key={item} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <CheckCircle size={15} style={{ color: '#C8902E', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="up" delay={0.15}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
              }}
            >
              <h3 className="font-bold text-white text-xl mb-6">שלחו לנו פנייה</h3>
              <LeadForm leadType="owner" />
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
