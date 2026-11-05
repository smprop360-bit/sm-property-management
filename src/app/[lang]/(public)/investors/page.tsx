import { pageMeta } from '@/i18n/server';
﻿import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const generateMetadata = pageMeta('/investors', 'למשקיעים', 'Property 360, השבחת נכסים, שותפויות וניהול פורטפוליו.');

export default function InvestorsPage() {
  return (
    <ServicePageTemplate
      badge="למשקיעים"
      title="ניהול נכסים למשקיעים"
      subtitle="לא רק מנהלים — מייצרים תשואה."
      body="S&M Property Management עובדת עם משקיעים פרטיים ומוסדיים לניהול פורטפוליו נכסים, זיהוי פוטנציאל השבחה וקידום שותפויות אסטרטגיות."
      features={[
        'ניהול פורטפוליו נכסים',
        'Property 360 — בחינת מסלול מיטבי',
        'ניתוח פוטנציאל השבחה',
        'מסלולי שותפות מותאמים',
        'דוחות תשואה מפורטים',
        'ייעוץ לרכישה ומכירה',
      ]}
      ctaLabel="קבלו בדיקת Property 360"
    />
  );
}

