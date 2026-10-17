'use client';

import { Eye, Calculator, MapPin, Award, BarChart3 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const items = [
  {
    icon: Eye,
    title: 'שקיפות מלאה',
    body: 'דוחות חודשיים, הודעות בזמן אמת וגישה מלאה לכל מה שקורה בנכס.',
  },
  {
    icon: Calculator,
    title: 'חשיבה כלכלית',
    body: 'אנחנו לא רק מנהלים — אנחנו בוחנים כיצד למקסם את הרווחיות של הנכס.',
  },
  {
    icon: MapPin,
    title: 'כתובת אחת',
    body: 'כל הנושאים — שוכרים, ספקים, תיקונים, חוזים — מטופלים דרכנו.',
  },
  {
    icon: Award,
    title: 'ניהול מקצועי',
    body: 'צוות מנוסה עם גישה שיטתית לכל היבט של ניהול הנכס.',
  },
  {
    icon: BarChart3,
    title: 'טכנולוגיה ודיווח',
    body: 'מערכת דיגיטלית עם דוחות, מעקב הכנסות ועדכונים שוטפים.',
  },
];

export default function WhyTopropSection() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection direction="up" delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
            לא רק מנהלים את הנכס. מנהלים את ההשקעה.
          </h2>
          <p className="text-brand-muted text-center text-lg mb-12">
            הגישה שלנו שונה — ואנחנו רוצים שתרגישו את זה
          </p>
        </AnimatedSection>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group border border-gray-100 hover:border-gold/20 rounded-2xl p-6 text-center h-full transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-navy/8 to-navy/3 group-hover:from-gold/15 group-hover:to-gold/5 shadow-sm mx-auto mb-4 flex items-center justify-center transition-all">
                    <Icon size={28} className="text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gold/40" />
          <div className="w-8 h-px bg-gold/20" />
          <div className="w-2 h-2 rounded-full bg-gold/40" />
          <div className="w-8 h-px bg-gold/20" />
          <div className="w-2 h-2 rounded-full bg-gold/40" />
        </div>
      </div>
    </section>
  );
}
