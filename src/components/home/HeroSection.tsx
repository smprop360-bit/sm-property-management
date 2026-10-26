'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, CheckCircle } from 'lucide-react';

const floatingStats = [
  { value: '97%', label: 'שיעור תפוסה', delay: 0 },
  { value: '500+', label: 'נכסים מנוהלים', delay: 0.15 },
  { value: '24/7', label: 'זמינות שירות', delay: 0.3 },
];

const trustPoints = [
  'ניהול שוטף ושקוף',
  'מחשבה כלכלית בכל החלטה',
  'דוחות חודשיים מפורטים',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ background: 'linear-gradient(135deg, #08274F 0%, #051A34 60%, #0a1f3d 100%)' }}>
      {/* Geometric decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circle top-left */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5 opacity-60" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5 opacity-40" />
        {/* Gold accent circle bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gold diagonal line accent */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              <span className="text-gold text-xs font-semibold tracking-wider uppercase">
                PROPERTY MANAGEMENT • RENTALS • INVESTMENTS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              הנכס שלך{' '}
              <span style={{ background: 'linear-gradient(135deg, #C8902E, #D9AE55, #C8902E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>צריך לעבוד</span>
              {' '}בשבילך.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl"
            >
              S&amp;M Property Management מנהלת ומלווה נכסים פרטיים ומסחריים — עם שירות אישי ותהליך מסודר
              ותשואה מקסימלית.
            </motion.p>

            {/* Trust points */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2 mb-10"
            >
              {trustPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                  className="flex items-center gap-2 text-white/60 text-sm"
                >
                  <CheckCircle size={14} className="text-gold shrink-0" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/property-360"
                className="group inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300"
              >
                בדיקת הנכס שלי
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+972552601077"
                className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <Phone size={18} className="text-gold" />
                דברו איתנו
              </a>
            </motion.div>
          </div>

          {/* Right: Floating Stats Cards */}
          <div className="hidden lg:flex flex-col gap-4 relative">
            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white/8 backdrop-blur-md border border-white/10 rounded-3xl p-6 animate-float"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/50 text-xs mb-1">הכנסה חודשית כוללת</p>
                  <p className="text-white text-3xl font-bold">₪48,200</p>
                </div>
                <div className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ↑ +12%
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                {floatingStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-gold font-bold text-lg">{s.value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mini notification card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-4 mr-8"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">חוזה שכירות חודש</p>
                  <p className="text-white/40 text-xs mt-0.5">רח׳ הרצל 42, תל אביב — חודש</p>
                </div>
              </div>
            </motion.div>

            {/* Gold accent tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-4 -left-4 bg-gold rounded-2xl px-4 py-2 shadow-xl"
            >
              <p className="text-white text-xs font-bold">מנהלים את ההשקעה שלך</p>
            </motion.div>
          </div>
        </div>

        {/* Bottom support line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-white/40 text-sm"
        >
          {['ניהול לטווח ארוך', 'Airbnb', 'נכסים מסחריים', 'השבחה', 'שותפויות'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold/60" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
