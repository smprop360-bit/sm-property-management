import Link from 'next/link';
import { Building2, Waves, Briefcase, TrendingUp, Handshake } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'ניהול לטווח ארוך',
    body: 'ניהול שוטף מקצועי של נכסים למגורים — שוכרים, חוזים, תחזוקה ודוחות.',
    href: '/property-management',
  },
  {
    icon: Waves,
    title: 'Airbnb / Short Term',
    body: 'בדיקת כדאיות ראשית, ואז ניהול מלא של השכרת נופש בתפוסה מקסימלית.',
    href: '/airbnb-management',
  },
  {
    icon: Briefcase,
    title: 'נכסים מסחריים',
    body: 'ניהול משרדים, חנויות ומחסנים עם חשיבה עסקית ורווחיות.',
    href: '/commercial-property-management',
  },
  {
    icon: TrendingUp,
    title: 'השבחה',
    body: 'זיהוי פוטנציאל השבחה, תכנון ובצוע פרויקטים להגדלת ערך הנכס.',
    href: '/investors',
  },
  {
    icon: Handshake,
    title: 'שותפויות והשקעות',
    body: 'מסלולי שותפות ייחודיים למשקיעים המחפשים ניהול עם מעורבות.',
    href: '/investors',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
          איך הנכס שלך צריך לעבוד?
        </h2>
        <p className="text-brand-muted text-center mb-12 text-lg">בחרו את המסלול המתאים לכם</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group bg-surface hover:bg-white border border-gray-100 hover:border-gold/30 hover:shadow-md rounded-2xl p-6 transition-all flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center transition-colors">
                  <Icon size={24} className="text-navy group-hover:text-gold transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-base mb-1">{s.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{s.body}</p>
                </div>
                <span className="text-gold text-sm font-medium mt-auto">קראו עוד ←</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
