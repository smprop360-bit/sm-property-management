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
          <label htmlFor="property360-full-name" className="block text-sm font-medium text-navy mb-1">שם מלא *</label>
          <input
            id="property360-full-name"
            type="text"
            value={data.full_name}
            onChange={(e) => update({ full_name: e.target.value })}
            placeholder="ישראל ישראלי"
            required
            aria-required="true"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="property360-phone" className="block text-sm font-medium text-navy mb-1">טלפון *</label>
          <input
            id="property360-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="050-0000000"
            required
            aria-required="true"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            dir="ltr"
          />
        </div>
        <div>
          <label htmlFor="property360-email" className="block text-sm font-medium text-navy mb-1">אימייל</label>
          <input
            id="property360-email"
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
            אני מסכים/ה ש־S&amp;M Property Management תיצור איתי קשר בנוגע לנכס שלי.
          </span>
        </label>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 px-4 py-3" role="alert" aria-live="polite">{error}</p>
      )}

      <div className="flex gap-4">
        <button type="button" onClick={back} disabled={loading} className="flex-1 border border-gray-200 text-brand-muted py-4 hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={onSubmit}
          disabled={!valid || loading}
          type="button"
          className="flex-1 bg-gold disabled:opacity-40 hover:bg-gold-soft text-white font-semibold py-4 transition-colors"
        >
          {loading ? 'שולח...' : 'שלח ←'}
        </button>
      </div>
    </div>
  );
}

