'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'ראשי' },
  { href: '/property-management', label: 'ניהול נכסים' },
  { href: '/airbnb-management', label: 'Airbnb' },
  { href: '/commercial-property-management', label: 'מסחרי' },
  { href: '/investors', label: 'למשקיעים' },
  { href: '/how-it-works', label: 'איך זה עובד' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b-2 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b-gold/20'
          : 'bg-white shadow-sm border-b-gold/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0">
            <span className="font-heading font-bold text-2xl text-navy">TOPROP</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-navy ${
                  pathname === link.href
                    ? 'text-navy font-semibold'
                    : 'text-brand-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm text-brand-muted hover:text-navy transition-colors"
            >
              כניסת בעלי נכסים
            </Link>
            <Link
              href="/property-360"
              className="bg-gold hover:bg-gold-soft text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              בדיקת הנכס שלי
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium hover:text-navy ${
                pathname === link.href
                  ? 'text-navy font-semibold'
                  : 'text-brand-text'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/property-360"
            className="bg-gold text-white text-center font-semibold px-4 py-3 rounded-lg mt-2"
            onClick={() => setMobileOpen(false)}
          >
            בדיקת הנכס שלי
          </Link>
        </motion.div>
      )}
    </header>
  );
}
