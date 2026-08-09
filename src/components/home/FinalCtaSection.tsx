import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="bg-gold py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
          רוצים לדעת מה הנכס שלכם יכול לעשות יותר טוב?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/property-360"
            className="bg-navy hover:bg-navy-dark text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            בדיקת הנכס שלי
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/60 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            דברו איתנו
          </Link>
        </div>
      </div>
    </section>
  );
}
