const kpis = [
  { label: 'נכסים מנוהלים', value: '3', unit: '' },
  { label: 'הכנסה חודשית', value: '12,400', unit: '₪' },
  { label: 'תפוסה ממוצעת', value: '97', unit: '%' },
  { label: 'תקלות פתוחות', value: '1', unit: '' },
  { label: 'חוזים לחידוש', value: '2', unit: '' },
];

export default function OwnerPortalPreview() {
  return (
    <section className="bg-navy-dark text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
          בעל הנכס רואה הכול.
        </h2>
        <p className="text-white/60 text-lg mb-12">
          גם כשאנחנו מנהלים — אתם תמיד בשליטה.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-2xl font-bold text-gold mb-1">
                {kpi.value}{kpi.unit}
              </div>
              <div className="text-xs text-white/50">{kpi.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/30">* נתוני הדגמה בלבד</p>
      </div>
    </section>
  );
}
