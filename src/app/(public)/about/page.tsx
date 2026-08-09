export const metadata = {
  title: 'אודות | TOPROP',
  description: 'TOPROP — חברת ניהול נכסים עם גישת משקיע.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">אודות TOPROP</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          חברת ניהול נכסים עם גישת משקיע — מנהלים את הנכס, ממקסמים את ההשקעה.
        </p>
      </section>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-brand-text text-lg leading-relaxed space-y-6">
          <p>TOPROP היא חברת ניהול נכסים המתמחה בניהול, השכרה והשבחה של נכסים פרטיים ומסחריים בישראל.</p>
          <p>הגישה שלנו שונה: אנחנו לא רק מנהלים — אנחנו חושבים כמו משקיעים. כל נכס מטופל עם מיקוד ברווחיות, שמירה על ערכו לאורך זמן ושקיפות מלאה כלפי הבעלים.</p>
          <p>אנחנו מציעים שירות מלא לבעלי נכסים — משלב בחירת אסטרטגיית ההשכרה, דרך ניהול השוכרים והספקים, ועד דיווח שוטף ושקוף.</p>
        </div>
      </section>
    </div>
  );
}
