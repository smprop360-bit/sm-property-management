import { Eye, Calculator, MapPin, Award, BarChart3 } from 'lucide-react';

const items = [
  {
    icon: Eye,
    title: 'שקיפות מלאה',
    body: 'דוחות חודשיים, הודעות בזמן אמת וגישה מלאה לכל מה שקורה בנכס.',
  },
  {
    icon: Calculator,
    title: 'חשיבה כלכלית',
    body: 'אנחנו לא רק מנהלים — אנחנו בוחנים כיצד למקסם את הרווחיות של הנכס.',
  },
  {
    icon: MapPin,
    title: 'כתובת אחת',
    body: 'כל הנושאים — שוכרים, ספקים, תיקונים, חוזים — מטופלים דרכנו.',
  },
  {
    icon: Award,
    title: 'ניהול מקצועי',
    body: 'צוות מנוסה עם גישה שיטתית לכל היבט של ניהול הנכס.',
  },
  {
    icon: BarChart3,
    title: 'טכנולוגיה ודיווח',
    body: 'מערכת דיגיטלית עם דוחות, מעקב הכנסות ועדכונים שוטפים.',
  },
];

export default function WhyTopropSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
          לא רק מנהלים את הנכס. מנהלים את ההשקעה.
        </h2>
        <p className="text-brand-muted text-center text-lg mb-12">
          הגישה שלנו שונה — ואנחנו רוצים שתרגישו את זה
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
