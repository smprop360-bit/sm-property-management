'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const kpis = [
  { label: 'נכסים מנוהלים', value: 3, prefix: '', suffix: '' },
  { label: 'הכנסה חודשית', value: 12400, prefix: '₪', suffix: '' },
  { label: 'תפוסה ממוצעת', value: 97, prefix: '', suffix: '%' },
  { label: 'תקלות פתוחות', value: 1, prefix: '', suffix: '' },
  { label: 'חוזים לחידוש', value: 2, prefix: '', suffix: '' },
];

export default function OwnerPortalPreview() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section className="relative bg-navy-dark text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            בעל הנכס רואה הכול.
          </h2>
          <p className="text-white/60 text-lg mb-12">
            גם כשאנחנו מנהלים — אתם תמיד בשליטה.
          </p>
        </AnimatedSection>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/8 hover:bg-white/12 border border-white/10 hover:border-gold/30 rounded-2xl p-6 transition-all"
            >
              <div className="text-2xl font-bold text-gold mb-1">
                <AnimatedCounter
                  value={kpi.value}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                />
              </div>
              <div className="text-xs text-white/50">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-white/30">* נתוני הדגמה בלבד</p>
      </div>
    </section>
  );
}
