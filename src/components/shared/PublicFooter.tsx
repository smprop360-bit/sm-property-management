import Link from 'next/link';

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
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <span className="font-heading font-bold text-2xl text-white">TOPROP</span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              ניהול נכסים • השכרה • השקעות
            </p>
            <p className="mt-2 text-xs text-gray-500">
              מנהלים את הנכס. ממקסמים את ההשקעה.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">שירותים</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">החברה</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">צור קשר</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="tel:+972552601077" className="hover:text-gold transition-colors">
                  +972 55 260-1077
                </a>
              </li>
              <li>
                <a href="https://wa.me/972552601077" className="hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/property-360" className="bg-gold hover:bg-gold-soft text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors inline-block mt-2">
                  בדיקת הנכס שלי
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TOPROP. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <Link href="/en" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
