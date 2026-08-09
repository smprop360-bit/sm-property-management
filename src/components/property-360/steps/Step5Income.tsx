import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

export default function Step5Income({ data, update, next, back }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">הכנסה נוכחית</h2>
      <p className="text-brand-muted mb-8">אם הנכס מושכר, מה השכירות?</p>
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">שכירות חודשית נוכחית (₪)</label>
          <input
            type="number"
            value={data.current_monthly_rent}
            onChange={(e) => update({ current_monthly_rent: e.target.value })}
            placeholder="לדוגמה: 5000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button onClick={next} className="flex-1 bg-navy hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors">המשך</button>
      </div>
    </div>
  );
}
