import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
};

export default function Step7Contact({ data, update, back, onSubmit, loading, error }: Props) {
  const valid = data.full_name && data.phone && data.consent;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">פרטי קשר</h2>
      <p className="text-brand-muted mb-8">ניצור איתך קשר בהקדם</p>
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">שם מלא *</label>
          <input
            type="text"
            value={data.full_name}
            onChange={(e) => update({ full_name: e.target.value })}
            placeholder="ישראל ישראלי"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">טלפון *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="050-0000000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">אימייל</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="mail@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            dir="ltr"
          />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => update({ consent: e.target.checked })}
            className="w-4 h-4 mt-0.5 accent-gold"
          />
          <span className="text-sm text-brand-muted">
            אני מסכים/ה שTOPROP תיצור איתי קשר בנוגע לנכסי
          </span>
        </label>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex gap-4">
        <button onClick={back} disabled={loading} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={onSubmit}
          disabled={!valid || loading}
          className="flex-1 bg-gold disabled:opacity-40 hover:bg-gold-soft text-white font-semibold py-4 rounded-xl transition-colors"
        >
          {loading ? 'שולח...' : 'שלח ←'}
        </button>
      </div>
    </div>
  );
}
