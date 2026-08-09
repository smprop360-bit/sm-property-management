import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

const statuses = [
  { value: 'rented', label: 'מושכר כרגע' },
  { value: 'vacant', label: 'פנוי' },
  { value: 'tenant_leaving', label: 'השוכר עוזב בקרוב' },
  { value: 'renovation', label: 'בשיפוץ' },
];

export default function Step4Status({ data, update, next, back }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">מצב הנכס</h2>
      <p className="text-brand-muted mb-8">מהו מצב הנכס כיום?</p>
      <div className="flex flex-col gap-3 mb-8">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => update({ status: s.value })}
            className={`border-2 rounded-xl py-4 px-5 text-right font-medium transition-all ${
              data.status === s.value
                ? 'border-gold bg-gold/5 text-navy'
                : 'border-gray-200 text-brand-muted hover:border-gold/50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={next}
          disabled={!data.status}
          className="flex-1 bg-navy disabled:opacity-40 hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors"
        >
          המשך
        </button>
      </div>
    </div>
  );
}
