import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'תודה! | TOPROP',
  description: 'קיבלנו את הפרטים שלך ונחזור אליך בקרוב.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <CheckCircle2 size={56} className="text-gold mx-auto mb-6" />
        <h1 className="font-heading text-3xl font-bold text-navy mb-3">תודה!</h1>
        <p className="text-brand-muted text-lg mb-2">קיבלנו את הפרטים שלכם.</p>
        <p className="text-brand-muted mb-8">נחזור אליכם תוך יום עסקים אחד לתיאום שיחה.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/972552601077"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            המשיכו ב-WhatsApp
          </a>
          <Link
            href="/"
            className="border border-gray-200 text-brand-muted hover:border-navy hover:text-navy font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            חזרה לאתר
          </Link>
        </div>
      </div>
    </div>
  );
}
