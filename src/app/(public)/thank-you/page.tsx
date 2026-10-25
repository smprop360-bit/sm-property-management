import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'תודה! | S&M Property Management',
  description: 'קיבלנו את הפרטים שלך ונחזור אליך בקרוב.',
};

export default function ThankYouPage() {
  return (
    <div
      className="min-h-[70vh] px-6 py-20 lg:px-10 lg:py-28"
      style={{ background: '#091524', color: '#fff' }}
    >
      <div
        className="mx-auto grid max-w-5xl gap-12 pt-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"
        style={{ borderTop: '2px solid rgba(200,144,46,0.4)' }}
      >
        <div>
          <CheckCircle2 size={48} style={{ color: '#C8902E' }} aria-hidden="true" />
          <p className="mt-8 text-sm font-bold tracking-[0.15em]" style={{ color: '#C8902E' }}>
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> / RECEIVED
          </p>
        </div>
        <div>
          <h1 className="font-heading text-5xl font-bold leading-tight">
            תודה,<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              קיבלנו את הפרטים.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/60">נחזור אליכם תוך יום עסקים אחד לתיאום שיחה.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/972552601077"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center font-semibold text-white px-6 transition-all"
              style={{
                background: 'linear-gradient(135deg, #C8902E, #D9AE55)',
                borderRadius: '8px',
                boxShadow: '0 6px 20px rgba(200,144,46,0.3)',
              }}
            >
              המשיכו ב-WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center font-semibold text-white/60 hover:text-white px-6 transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
              }}
            >
              חזרה לאתר
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
