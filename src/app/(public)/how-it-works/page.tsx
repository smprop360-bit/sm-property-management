import Link from 'next/link';

export const metadata = {
  title: 'איך זה עובד | TOPROP',
  description: 'תהליך קליטת נכס ב-TOPROP — 6 שלבים פשוטים וברורים.',
};

const steps = [
  { n: 1, title: 'מספרים לנו על הנכס', body: 'ממלאים טופס Property 360 עם פרטי הנכס, מצבו ומה מעניין אתכם.' },
  { n: 2, title: 'Property Review', body: 'צוות TOPROP בוחן את הנכס, מנתח את השוק ומכין המלצת מסלול בכתב.' },
  { n: 3, title: 'בוחרים מסלול', body: 'נפגשים, עוברים על האפשרויות ומחליטים יחד על מסלול הפעולה.' },
  { n: 4, title: 'קליטה למערכת', body: 'הנכס נכנס לניהול — חוזים, מפתחות, אנשי קשר, ספקים.' },
  { n: 5, title: 'TOPROP מנהלת', body: 'אנחנו מטפלים בכל — שוכרים, ספקים, תחזוקה, גביה.' },
  { n: 6, title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים, עדכונים בזמן אמת וגישה לכל מה שקורה.' },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">איך זה עובד?</h1>
        <p className="text-white/70 text-xl">תהליך ברור, פשוט ומובנה</p>
      </section>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-10 mb-16">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg">
                  {s.n}
                </div>
                <div className="pt-2">
                  <h2 className="font-semibold text-navy text-xl mb-2">{s.title}</h2>
                  <p className="text-brand-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/property-360" className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
              התחילו עם Property 360
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
