'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const steps = [
  { n: 1, title: 'מספרים לנו על הנכס', body: 'ממלאים טופס קצר עם פרטי הנכס ומצבו הנוכחי.' },
  { n: 2, title: 'Property Review', body: 'אנחנו בוחנים את הנכס ומכינים המלצת מסלול.' },
  { n: 3, title: 'בוחרים מסלול', body: 'ארוך טווח, Airbnb, מסחרי, השבחה — ביחד מחליטים.' },
  { n: 4, title: 'קליטה למערכת', body: 'הנכס נכנס למערכת, חוזים, מפתחות ואנשי קשר.' },
  { n: 5, title: 'S&M Property Management מנהלת', body: 'אנחנו מטפלים בכל — שוכרים, ספקים ותחזוקה.' },
  { n: 6, title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים ועדכונים שוטפים.' },
];

export default function HowItWorksSection() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
            איך זה עובד?
          </h2>
          <p className="text-brand-muted text-center text-lg mb-14">
            תהליך ברור, פשוט ומובנה
          </p>
        </AnimatedSection>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, index) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-gold/20 hover:shadow-md transition-all h-full">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-base shadow-lg" style={{ background: 'linear-gradient(135deg, #C8902E 0%, #D9AE55 100%)' }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{s.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
