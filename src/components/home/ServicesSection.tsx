'use client';

import Link from 'next/link';
import { Building2, Waves, Briefcase, TrendingUp, Handshake } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const services = [
  {
    icon: Building2,
    title: 'ניהול לטווח ארוך',
    body: 'ניהול שוטף מקצועי של נכסים למגורים — שוכרים, חוזים, תחזוקה ודוחות.',
    href: '/property-management',
  },
  {
    icon: Waves,
    title: 'Airbnb / Short Term',
    body: 'בדיקת כדאיות ראשית, ואז ניהול מלא של השכרת נופש בתפוסה מקסימלית.',
    href: '/airbnb-management',
  },
  {
    icon: Briefcase,
    title: 'נכסים מסחריים',
    body: 'ניהול משרדים, חנויות ומחסנים עם חשיבה עסקית ורווחיות.',
    href: '/commercial-property-management',
  },
  {
    icon: TrendingUp,
    title: 'השבחה',
    body: 'זיהוי פוטנציאל השבחה, תכנון ובצוע פרויקטים להגדלת ערך הנכס.',
    href: '/investors',
  },
  {
    icon: Handshake,
    title: 'שותפויות והשקעות',
    body: 'מסלולי שותפות ייחודיים למשקיעים המחפשים ניהול עם מעורבות.',
    href: '/investors',
  },
];

export default function ServicesSection() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
            איך הנכס שלך צריך לעבוד?
          </h2>
          <p className="text-brand-muted text-center mb-12 text-lg">בחרו את המסלול המתאים לכם</p>
        </AnimatedSection>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={s.href}
                  className="group bg-surface hover:bg-white border border-gray-100 hover:border-gold/30 border-t-2 border-t-transparent hover:border-t-gold hover:shadow-md rounded-2xl p-6 transition-all flex flex-col gap-4 h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy/8 to-navy/3 group-hover:from-gold/15 group-hover:to-gold/5 shadow-sm flex items-center justify-center transition-all duration-300">
                    <Icon size={24} className="text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-base mb-1">{s.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{s.body}</p>
                  </div>
                  <span className="text-gold text-sm font-medium mt-auto">
                    קראו עוד ←
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
