'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const points = [
  'השוואת שכירות ארוכת טווח מול Short-Term',
  'בדיקת פוטנציאל השבחה',
  'בדיקת התאמה לניהול מלא',
  'בדיקת התאמה לשותפות',
  'המלצה על מסלול פעולה',
];

export default function Property360Section() {
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-surface bg-[radial-gradient(ellipse_at_top_right,rgba(200,144,46,0.06)_0%,transparent_60%)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection direction="up" delay={0}>
          <div className="relative bg-white rounded-3xl shadow-[0_0_40px_rgba(200,144,46,0.08)] border border-gray-100 border-r-4 border-r-gold p-8 sm:p-12">
            {/* Floating badge */}
            <div className="absolute top-6 left-6 bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
              חינם
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                PROPERTY 360
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-3">
              S&amp;M Property Management / PROPERTY360
            </h2>
            <p className="text-brand-muted text-lg mb-8">
              לא בטוחים מה הדרך הנכונה להשכיר או להפעיל את הנכס?
            </p>

            <ul ref={listRef} className="space-y-4 mb-10">
              {points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 20 }}
                  animate={listInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-brand-text">{p}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/property-360"
              className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-200"
            >
              קבלו בדיקת Property 360
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
