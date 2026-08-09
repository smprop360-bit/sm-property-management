import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'ניהול נכסים מסחריים | TOPROP',
  description: 'ניהול מקצועי של משרדים, חנויות ומחסנים עם חשיבה עסקית.',
};

export default function CommercialPropertyManagementPage() {
  return (
    <ServicePageTemplate
      badge="מסחרי"
      title="ניהול נכסים מסחריים"
      subtitle="משרדים, חנויות ומחסנים — מנוהלים עם מיקוד ברווחיות."
      body="ניהול נכס מסחרי שונה מניהול דירת מגורים. TOPROP מתמחה בהבנת הצרכים העסקיים של בעלי נכסים מסחריים, תוך שמירה על שוכרים איכותיים ויציבות הכנסה."
      features={[
        'השכרת נכסים מסחריים',
        'ניהול חוזים מסחריים מורכבים',
        'תחזוקה ותיקונים שוטפים',
        'ניהול ספקים וקבלנים',
        'דוחות הכנסות ורווחיות',
        'ייעוץ לשיפור תפוסה',
      ]}
    />
  );
}
