'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #C8902E 0%, #D9AE55 100%)' }}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative">
        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
            רוצים לדעת מה הנכס שלכם יכול לעשות יותר טוב?
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/property-360"
              className="bg-navy hover:bg-navy-dark text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
            >
              בדיקת הנכס שלי
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/60 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              דברו איתנו
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.25}>
          <p className="text-white/60 text-sm mt-6">ללא התחייבות. ייעוץ ראשוני חינם.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
