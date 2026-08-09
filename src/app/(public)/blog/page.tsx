export const metadata = {
  title: 'מאמרים | TOPROP',
  description: 'מאמרים ומדריכים לבעלי נכסים ומשקיעים.',
};

export default function BlogPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">מאמרים</h1>
        <p className="text-white/70 text-xl">ידע מקצועי לבעלי נכסים ומשקיעים</p>
      </section>
      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-brand-muted py-20">
          מאמרים יתווספו בקרוב.
        </div>
      </section>
    </div>
  );
}
