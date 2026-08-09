import Link from 'next/link';

export default function OverseasSection() {
  return (
    <section className="bg-navy py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
          הנכס בישראל. אתם יכולים להיות בכל מקום בעולם.
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          ניהול מקומי לבעלי נכסים שאינם נמצאים בישראל — שוכרים, ספקים, חוזים, ביקורים ודוחות.
        </p>
        <Link
          href="/property-management"
          className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors"
        >
          ניהול נכס מרחוק
        </Link>
      </div>
    </section>
  );
}
