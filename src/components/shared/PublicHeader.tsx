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
  { href: '/blog', label: 'מאמרים' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
];

const contacts = [
  { name: 'משרד', display: '055-260-1077', wa: '972552601077' },
  { name: 'מוטי', display: '052-577-6892', wa: '972525776892' },
];

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.67-1.49a11.33 11.33 0 0 0 5.78 1.47h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z" />
    </svg>
  );
}

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
      <div style={{ borderBottom: '1px solid rgba(200,144,46,0.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-end gap-4 sm:gap-6 h-9 text-xs sm:text-sm">
          {contacts.map((c) => (
            <a
              key={c.wa}
              href={`https://wa.me/${c.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`שליחת הודעת WhatsApp ל${c.name} ${c.display}`}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
            >
              <WhatsAppIcon />
              <span>{c.name}</span>
              <span dir="ltr" className="font-medium text-white">{c.display}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-3">
            <Image
              src="/logo.png"
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
