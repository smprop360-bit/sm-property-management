'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function OverseasSection() {
  return (
    <section className="bg-navy relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative">
        <AnimatedSection direction="up" delay={0}>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-gold/20 text-gold text-xs font-medium px-3 py-1 rounded-full">ניהול מרחוק מלא</span>
            <span className="bg-gold/20 text-gold text-xs font-medium px-3 py-1 rounded-full">דוחות דיגיטליים</span>
            <span className="bg-gold/20 text-gold text-xs font-medium px-3 py-1 rounded-full">שקיפות 24/7</span>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            הנכס בישראל. אתם יכולים להיות בכל מקום בעולם.
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            ניהול מקומי לבעלי נכסים שאינם נמצאים בישראל — שוכרים, ספקים, חוזים, ביקורים ודוחות.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <Link
            href="/property-management"
            className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors animate-pulse-gold"
          >
            ניהול נכס מרחוק
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
