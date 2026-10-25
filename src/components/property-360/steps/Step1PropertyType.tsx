import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

const types = ['דירה', 'בית', 'משרד', 'חנות', 'מחסן', 'נכס מסחרי אחר'];

export default function Step1PropertyType({ data, update, next }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">איזה נכס יש לך?</h2>
      <p className="text-brand-muted mb-8">בחרו את סוג הנכס</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => update({ property_type: t })}
            type="button"
            aria-pressed={data.property_type === t}
            className={`min-h-14 border-2 py-4 px-3 text-center font-medium transition-all ${
              data.property_type === t
                ? 'border-gold bg-gold/5 text-navy'
                : 'border-gray-200 text-brand-muted hover:border-gold/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <button
        onClick={next}
        disabled={!data.property_type}
        className="w-full bg-navy disabled:opacity-40 hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors"
      >
        המשך
      </button>
    </div>
  );
}
