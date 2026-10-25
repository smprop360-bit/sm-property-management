import Link from 'next/link';
import Image from 'next/image';

const serviceLinks = [
  { href: '/property-management', label: 'ניהול נכסים' },
  { href: '/commercial-property-management', label: 'ניהול נכסים מסחריים' },
  { href: '/airbnb-management', label: 'Airbnb / Short Term' },
  { href: '/investors', label: 'למשקיעים' },
  { href: '/property-360', label: 'Property 360' },
];

const companyLinks = [
  { href: '/about', label: 'אודות' },
  { href: '/how-it-works', label: 'איך זה עובד' },
  { href: '/pricing', label: 'מחירון' },
  { href: '/blog', label: 'מאמרים' },
  { href: '/contact', label: 'צור קשר' },
];

export default function PublicFooter() {
  return (
    <footer style={{ background: '#070F1C', borderTop: '1px solid rgba(200,144,46,0.18)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="S&M Property Management"
                width={72}
                height={72}
                style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 16px rgba(200,144,46,0.4))' }}
              />
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-heading font-black tracking-wide leading-none"
                  style={{ fontSize: '1.6rem', color: '#C8902E', textShadow: '0 0 24px rgba(200,144,46,0.4)' }}>
                  S&amp;M
                </span>
                <span className="font-semibold tracking-[0.18em] uppercase leading-none"
                  style={{ fontSize: '8.5px', color: '#ffffff' }}>
                  Property Management
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              ניהול נכסים • השכרה • השקעות
            </p>
            <p className="mt-1 text-xs text-white/30">
              מנהלים את הנכס. ממקסמים את ההשקעה.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white/60 mb-4 tracking-wide">שירותים</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-[#C8902E] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white/60 mb-4 tracking-wide">החברה</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-[#C8902E] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white/60 mb-4 tracking-wide">צור קשר</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li>
                <a href="tel:+972552601077" className="hover:text-[#C8902E] transition-colors">
                  +972 55 260-1077
                </a>
              </li>
              <li>
                <a href="https://wa.me/972552601077" className="hover:text-[#C8902E] transition-colors" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link
                  href="/property-360"
                  className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all inline-block mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                    boxShadow: '0 4px 14px rgba(200,144,46,0.3)',
                  }}
                >
                  בדיקת הנכס שלי
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} S&amp;M Property Management. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <Link href="/en" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
