import Link from 'next/link';

export const metadata = {
  title: 'צור קשר | TOPROP',
  description: 'דברו איתנו — טלפון, WhatsApp או טופס יצירת קשר.',
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">צור קשר</h1>
        <p className="text-white/70 text-xl">נשמח לשמוע עליכם ועל הנכס שלכם</p>
      </section>
      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <div className="flex flex-col gap-6 mb-8">
            <a href="tel:+972552601077" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold transition-colors">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-2xl">📞</div>
              <div>
                <div className="font-semibold text-navy">טלפון</div>
                <div className="text-brand-muted text-sm" dir="ltr">+972 55 260-1077</div>
              </div>
            </a>
            <a href="https://wa.me/972552601077" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold transition-colors">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">💬</div>
              <div>
                <div className="font-semibold text-navy">WhatsApp</div>
                <div className="text-brand-muted text-sm">שלחו הודעה עכשיו</div>
              </div>
            </a>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-brand-muted mb-4">רוצים שנחזור אליכם עם ניתוח הנכס?</p>
            <Link href="/property-360" className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              מלאו Property 360
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
