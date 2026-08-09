import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const points = [
  'השוואת שכירות ארוכת טווח מול Short-Term',
  'בדיקת פוטנציאל השבחה',
  'בדיקת התאמה לניהול מלא',
  'בדיקת התאמה לשותפות',
  'המלצה על מסלול פעולה',
];

export default function Property360Section() {
  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider">
              PROPERTY 360
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-3">
            TOPROP Property 360
          </h2>
          <p className="text-brand-muted text-lg mb-8">
            לא בטוחים מה הדרך הנכונה להשכיר או להפעיל את הנכס?
          </p>
          <ul className="space-y-4 mb-10">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-gold mt-0.5 shrink-0" />
                <span className="text-brand-text">{p}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/property-360"
            className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            קבלו בדיקת Property 360
          </Link>
        </div>
      </div>
    </section>
  );
}
