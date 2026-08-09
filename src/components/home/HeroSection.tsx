import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-navy text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          הנכס שלך צריך לעבוד בשבילך.
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-4">
          TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים, עם שירות מלא לבעלי נכסים
          ומשקיעים – משלב בחירת אסטרטגיית ההשכרה ועד לניהול השוטף.
        </p>
        <p className="text-sm text-white/50 mb-10 tracking-wide">
          ניהול לטווח ארוך&nbsp;•&nbsp;Airbnb&nbsp;•&nbsp;מסחרי&nbsp;•&nbsp;השבחה&nbsp;•&nbsp;שותפויות
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/property-360"
            className="bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            בדיקת הנכס שלי
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/50 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            דברו איתנו
          </Link>
        </div>
      </div>
    </section>
  );
}
