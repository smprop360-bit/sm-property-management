import WizardShell from '@/components/property-360/WizardShell';

export const metadata = {
  title: 'Property 360 | S&M Property Management',
  description: 'בדיקת הנכס שלך — השוואת מסלולים, פוטנציאל השבחה והמלצת פעולה.',
};

export default function Property360Page() {
  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-2xl mx-auto px-4 mb-8 text-center">
        <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider">
          PROPERTY 360
        </span>
        <h1 className="font-heading text-3xl font-bold text-navy mt-4 mb-2">
          בדיקת הנכס שלי
        </h1>
        <p className="text-brand-muted">
          כמה שאלות קצרות ונחזור אליכם עם המלצה מותאמת אישית
        </p>
      </div>
      <WizardShell />
    </div>
  );
}

