import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'ניהול נכסים | TOPROP',
  description: 'ניהול מקצועי של נכסי מגורים לטווח ארוך — שוכרים, חוזים, תחזוקה ודוחות.',
};

export default function PropertyManagementPage() {
  return (
    <ServicePageTemplate
      badge="ניהול נכסים"
      title="ניהול נכסים לטווח ארוך"
      subtitle="שוכרים איכותיים, חוזים מסודרים, תחזוקה שוטפת — ואתם פנויים."
      body="TOPROP מנהלת את הנכס שלכם מקצה לקצה. אנחנו אחראים על מציאת שוכרים, ניהול חוזים, גביית שכירות, תחזוקה שוטפת, טיפול בתקלות ודיווח חודשי שקוף."
      features={[
        'מציאת שוכרים מאומתים',
        'ניסוח וניהול חוזי שכירות',
        'גביית שכירות ודיווח חודשי',
        'טיפול בתחזוקה ותקלות',
        'ניהול עבור בעלים מחו"ל',
        'שקיפות מלאה בכל שלב',
      ]}
    />
  );
}
