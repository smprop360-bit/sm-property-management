import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

type Props = {
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ServicePageTemplate({
  badge,
  title,
  subtitle,
  body,
  features,
  ctaLabel = 'בדיקת הנכס שלי',
  ctaHref = '/property-360',
}: Props) {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-4 inline-block">
            {badge}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-white/70 text-xl">{subtitle}</p>
        </div>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-text text-lg leading-relaxed mb-12">{body}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-surface rounded-xl p-4">
                <CheckCircle2 size={20} className="text-gold mt-0.5 shrink-0" />
                <span className="text-brand-text">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaHref}
              className="bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors text-center"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors text-center"
            >
              דברו איתנו
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
