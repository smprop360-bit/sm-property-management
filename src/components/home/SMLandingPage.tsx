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
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { LeadForm } from '@/components/forms/LeadForm';
import { Marquee } from '@/components/ui/marquee';

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
  { icon: Building2, title: 'ניהול נכסים למגורים', body: 'טיפול שוטף — שוכרים, חוזים, תחזוקה ודוחות חודשיים מפורטים.', href: '/property-management' },
  { icon: Briefcase, title: 'ניהול נכסים מסחריים', body: 'ניהול משרדים, חנויות ונכסים מניבים עם חשיבה עסקית.', href: '/commercial-property-management' },
  { icon: TrendingUp, title: 'השכרה ואיתור שוכרים', body: 'שיווק הנכס, בדיקת שוכרים וליווי כל תהליך ההשכרה.', href: '/services' },
  { icon: Handshake, title: 'ליווי בעלי נכסים', body: 'ייעוץ, ליווי אישי ושותפות לבעלי נכסים ומשקיעים.', href: '/investors' },
  { icon: Wrench, title: 'תחזוקה וטיפול בתקלות', body: 'רשת ספקים מקצועית. תיקונים, שיפוצים וטיפול בכל בקשה.', href: '/services' },
  { icon: Eye, title: 'שקיפות ודיווח', body: 'דוחות חודשיים ברורים וגישה מלאה למידע בכל רגע.', href: '/services' },
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
];

const team = [
  { name: 'שלומי לימור', role: 'שותף מייסד', initials: 'ש', stripe: 'navy', tags: ['ניהול נכסים', 'קשרי שוכרים'] },
  { name: 'מוטי גינדי', role: 'שותף מייסד', initials: 'מ', stripe: 'gold', tags: ['נכסים מסחריים', 'תכנון פיננסי'] },
  { name: 'ליאת כהן', role: 'מנהלת לקוחות', initials: 'ל', stripe: 'navy', tags: ['שירות לקוחות', 'חוזים'] },
  { name: 'אמיר שלו', role: 'ראש תחום תחזוקה', initials: 'א', stripe: 'gold', tags: ['תחזוקה', 'ספקים'] },
];

const testimonials = [
  { quote: 'שלומי ומוטי פשוט מצוינים. הנכס תמיד מושכר ואני מקבל דוח מסודר כל חודש — בלי להרים טלפון.', name: 'דוד כהן', role: 'בעל נכס, תל אביב', initials: 'ד.כ', rating: 5 },
  { quote: 'לא האמנתי שניהול נכסים יכול להיות כל כך פשוט. הם מטפלים בכל — שוכרים, תיקונים, חוזים.', name: 'רונה ישראלי', role: 'משקיעת נדל"ן, רמת גן', initials: 'ר.י', rating: 5 },
  { quote: 'כבר 3 שנים שהם מנהלים לי שתי דירות. שקט מוחלט. כל בעיה מטופלת לפני שאני יודע עליה.', name: 'יוסי מזרחי', role: 'בעל נכסים, נתניה', initials: 'י.מ', rating: 5 },
  { quote: 'השוכרים מרוצים, הנכס מתוחזק, והדוחות שקופים לגמרי. המקצועיות ברמה אחרת.', name: 'מיכל שפירא', role: 'בעלת נכס, הרצליה', initials: 'מ.ש', rating: 5 },
];

const partners = [
  'רוטשטיין נדל"ן', 'קבוצת גבעות', 'אלדד ושות׳',
  'כרמל נכסים', 'ביתן נדל"ן', 'גוש 3000',
  'מגדל השקעות', 'ישראל נכסים', 'פרמיום פרופ׳',
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
        className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden"
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
          <Image src="/logo.png" alt="" width={480} height={480} priority aria-hidden
            style={{ borderRadius: '50%', opacity: 0.06, filter: 'blur(2px)' }} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/logo.png"
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
            <span style={goldText}>השקט שלנו לדאוג לו.</span>
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
          <GoldDivider />
        </AnimatedSection>

        <div ref={servicesRef} className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={s.href} className="glass-card block h-full p-8" style={glassCard}>
                  <div className="w-13 h-13 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(200,144,46,0.18)', width: 52, height: 52 }}>
                    <Icon size={22} style={{ color: '#C8902E' }} />
                  </div>
                  <h3 className="font-bold text-white mb-2" style={{ fontSize: '1.12rem' }}>{s.title}</h3>
                  <p className="leading-relaxed" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.60)' }}>{s.body}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: '#C8902E' }}>
                    קראו עוד <ArrowLeft size={13} />
                  </span>
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
          PARTNERS MARQUEE
      ══════════════════════════════════════ */}
      <section
        style={{
          background: '#091524',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '3rem 0',
        }}
      >
        <p className="text-center text-xs font-bold tracking-widest uppercase mb-8 px-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
          בוטחים בנו
        </p>
        <Marquee speed={35} pauseOnHover gap={16} className="text-[#091524]">
          {partners.map((name) => (
            <span
              key={name}
              className="inline-flex items-center whitespace-nowrap font-semibold text-sm px-6 py-3 rounded-full cursor-default select-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.55)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(200,144,46,0.45)'; (e.currentTarget as HTMLSpanElement).style.color = '#e5a83e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.55)'; }}
            >
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ══════════════════════════════════════
          WHY S&M
      ══════════════════════════════════════ */}
      <section style={{ background: '#091524', padding: '5rem 8%' }}>
        <AnimatedSection direction="up">
          <div className="flex items-center gap-4 mb-3">
            <Image
              src="/logo.png"
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
                src="/logo.png"
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
              src="/logo.png"
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

        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                <div className="p-5">
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
                { icon: Phone, label: 'טלפון', value: '055-260-1077', href: 'tel:+972552601077' },
                { icon: Mail, label: 'אימייל', value: 'info@sm-property.co.il', href: 'mailto:info@sm-property.co.il' },
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
