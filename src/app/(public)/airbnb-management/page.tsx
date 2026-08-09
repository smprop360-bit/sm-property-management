import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'ניהול Airbnb | TOPROP',
  description: 'בדיקת כדאיות ראשית וניהול מלא של השכרת נופש בתפוסה מקסימלית.',
};

export default function AirbnbManagementPage() {
  return (
    <ServicePageTemplate
      badge="Airbnb / Short Term"
      title="ניהול Airbnb ושכירות קצרת טווח"
      subtitle="קודם בודקים אם זה משתלם. אחר כך מנהלים מקצועית."
      body="לפני שמחליטים על Airbnb, TOPROP בוחנת את הפוטנציאל האמיתי של הנכס — מיקום, ביקוש, תחרות ורווחיות צפויה. רק אחר כך מציעים ניהול מלא."
      features={[
        'בדיקת כדאיות לפני הכל',
        'ניהול תפעולי מלא',
        'אירוח, קבלת אורחים, ניקיון',
        'תמחור דינמי ואופטימיזציה',
        'ניהול ביקורות ותגובות',
        'דוחות הכנסה חודשיים',
      ]}
      ctaLabel="בדיקת כדאיות Airbnb"
    />
  );
}
