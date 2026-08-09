const steps = [
  { n: 1, title: 'מספרים לנו על הנכס', body: 'ממלאים טופס קצר עם פרטי הנכס ומצבו הנוכחי.' },
  { n: 2, title: 'Property Review', body: 'אנחנו בוחנים את הנכס ומכינים המלצת מסלול.' },
  { n: 3, title: 'בוחרים מסלול', body: 'ארוך טווח, Airbnb, מסחרי, השבחה — ביחד מחליטים.' },
  { n: 4, title: 'קליטה למערכת', body: 'הנכס נכנס למערכת, חוזים, מפתחות ואנשי קשר.' },
  { n: 5, title: 'TOPROP מנהלת', body: 'אנחנו מטפלים בכל — שוכרים, ספקים, תחזוקה.' },
  { n: 6, title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים ועדכונים שוטפים.' },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
          איך זה עובד?
        </h2>
        <p className="text-brand-muted text-center text-lg mb-14">
          תהליך ברור, פשוט ומובנה
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">{s.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
