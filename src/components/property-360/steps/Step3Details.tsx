import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

const numericFields = [
  { key: 'area_sqm' as const, label: 'שטח (מ"ר)', placeholder: '80' },
  { key: 'rooms' as const, label: 'חדרים', placeholder: '3' },
  { key: 'floor' as const, label: 'קומה', placeholder: '2' },
];

const booleanFields = [
  { key: 'parking' as const, label: 'חניה' },
  { key: 'elevator' as const, label: 'מעלית' },
  { key: 'balcony' as const, label: 'מרפסת' },
];

export default function Step3Details({ data, update, next, back }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">פרטי הנכס</h2>
      <p className="text-brand-muted mb-8">מידע על הנכס</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {numericFields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-navy mb-1">{label}</label>
            <input
              type="number"
              value={data[key]}
              onChange={(e) => update({ [key]: e.target.value })}
              placeholder={placeholder}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-6 mb-8">
        {booleanFields.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data[key]}
              onChange={(e) => update({ [key]: e.target.checked })}
              className="w-4 h-4 accent-gold"
            />
            <span className="text-sm text-brand-text">{label}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button onClick={next} className="flex-1 bg-navy hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors">המשך</button>
      </div>
    </div>
  );
}
