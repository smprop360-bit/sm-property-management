import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

export default function Step2Location({ data, update, next, back }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">איפה הנכס?</h2>
      <p className="text-brand-muted mb-8">עיר וכתובת</p>
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">עיר *</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="לדוגמה: תל אביב"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-brand-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">כתובת</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="רחוב ומספר"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-brand-text"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={next}
          disabled={!data.city}
          className="flex-1 bg-navy disabled:opacity-40 hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors"
        >
          המשך
        </button>
      </div>
    </div>
  );
}
