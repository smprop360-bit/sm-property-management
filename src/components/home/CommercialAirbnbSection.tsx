'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function CommercialAirbnbSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-12">שירותים מתמחים</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection direction="right" delay={0}>
            <div className="bg-white border border-gray-100 hover:border-gold/20 hover:shadow-lg border-r-4 border-r-gold rounded-3xl p-8 sm:p-10 flex flex-col gap-4 h-full">
              <span className="text-xs font-bold text-gold tracking-widest uppercase">מסחרי</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
                נכס מסחרי צריך מנהל שחושב עסקית.
              </h3>
              <p className="text-brand-muted leading-relaxed">
                ניהול משרדים, חנויות ומחסנים עם מיקוד ברווחיות, יציבות שוכרים וחוזים איכותיים.
              </p>
              <Link
                href="/commercial-property-management"
                className="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors mt-auto w-fit"
              >
                ניהול נכס מסחרי
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.15}>
            <div className="bg-white border border-gray-100 hover:border-gold/20 hover:shadow-lg border-r-4 border-r-gold rounded-3xl p-8 sm:p-10 flex flex-col gap-4 h-full">
              <span className="text-xs font-bold text-gold tracking-widest uppercase">Airbnb</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
                Airbnb או שכירות רגילה? קודם בודקים מה באמת משתלם.
              </h3>
              <p className="text-brand-muted leading-relaxed">
                לפני שמחליטים, אנחנו בוחנים את הפוטנציאל האמיתי של הנכס לשכירות נופש.
              </p>
              <Link
                href="/airbnb-management"
                className="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors mt-auto w-fit"
              >
                בדיקת כדאיות Airbnb
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
