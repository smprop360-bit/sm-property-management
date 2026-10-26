'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'ראשי' },
  { href: '/property-management', label: 'ניהול נכסים' },
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
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(9,21,36,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(200,144,46,0.18)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-3">
            <Image
              src="/sm-logo.png"
              alt="S&M Property Management"
              width={48}
              height={48}
              priority
              style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 10px rgba(200,144,46,0.5))' }}
            />
            <div className="flex flex-col leading-none gap-0.5 items-end">
              <span className="font-heading font-black tracking-wide leading-none"
                style={{ fontSize: '1.6rem', color: '#C8902E', textShadow: '0 0 24px rgba(200,144,46,0.5)' }}>
                S&amp;M
              </span>
              <span className="font-semibold tracking-[0.18em] uppercase leading-none"
                style={{ fontSize: '8.5px', color: '#ffffff' }}>
                Property Management
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors pb-0.5 border-b-2 ${
                  pathname === link.href
                    ? 'text-gold border-gold'
                    : 'text-white/60 hover:text-white border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              כניסת בעלי נכסים
            </Link>
          </div>

          <button
            className="lg:hidden min-h-11 min-w-11 p-2 text-white/70"
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
          style={{ borderTop: '1px solid rgba(200,144,46,0.15)' }}
          className="lg:hidden px-4 py-4 flex flex-col gap-4"
          onMouseLeave={() => {}}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium ${
                pathname === link.href
                  ? 'text-gold font-semibold'
                  : 'text-white/65 hover:text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
