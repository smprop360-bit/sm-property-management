import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

const interests = [
  { value: 'management', label: 'ניהול שוטף' },
  { value: 'long_term_rental', label: 'השכרה לטווח ארוך' },
  { value: 'airbnb', label: 'Airbnb / Short Term' },
  { value: 'improvement', label: 'השבחת הנכס' },
  { value: 'partnership', label: 'שותפות עם S&M Property Management' },
  { value: 'not_sure', label: 'לא בטוח — רוצה ייעוץ' },
];

export default function Step6Interest({ data, update, next, back }: Props) {
  const toggle = (value: string) => {
    const updated = data.interests.includes(value)
      ? data.interests.filter((v) => v !== value)
      : [...data.interests, value];
    update({ interests: updated });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">מה מעניין אותך?</h2>
      <p className="text-brand-muted mb-8">ניתן לבחור יותר מאפשרות אחת</p>
      <div className="flex flex-col gap-3 mb-8">
        {interests.map((i) => (
          <button
            key={i.value}
            onClick={() => toggle(i.value)}
            type="button"
            aria-pressed={data.interests.includes(i.value)}
            className={`min-h-14 border-2 py-4 px-5 text-right font-medium transition-all ${
              data.interests.includes(i.value)
                ? 'border-gold bg-gold/5 text-navy'
                : 'border-gray-200 text-brand-muted hover:border-gold/50'
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={next}
          disabled={data.interests.length === 0}
          className="flex-1 bg-navy disabled:opacity-40 hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors"
        >
          המשך
        </button>
      </div>
    </div>
  );
}

