import { getT, pageMeta } from '@/i18n/server';
import type { LangProps } from '@/i18n/config';
﻿import WizardShell from '@/components/property-360/WizardShell';

export const generateMetadata = pageMeta('/property-360', 'Property 360', 'בדיקת הנכס שלך — השוואת מסלולים, פוטנציאל השבחה והמלצת פעולה.');

export default async function Property360Page({ params }: LangProps) {
  const { lang } = await params;
  const t = getT(lang);
  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-2xl mx-auto px-4 mb-8 text-center">
        <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider">
          PROPERTY 360
        </span>
        <h1 className="font-heading text-3xl font-bold text-navy mt-4 mb-2">
          {t('בדיקת הנכס שלי')}
        </h1>
        <p className="text-brand-muted">
          {t('כמה שאלות קצרות ונחזור אליכם עם המלצה מותאמת אישית')}
        </p>
      </div>
      <WizardShell />
    </div>
  );
}

