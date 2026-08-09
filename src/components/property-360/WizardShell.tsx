'use client';

import { useState } from 'react';
import { submitProperty360, type Property360Data } from '@/app/actions/property360';
import Step1PropertyType from './steps/Step1PropertyType';
import Step2Location from './steps/Step2Location';
import Step3Details from './steps/Step3Details';
import Step4Status from './steps/Step4Status';
import Step5Income from './steps/Step5Income';
import Step6Interest from './steps/Step6Interest';
import Step7Contact from './steps/Step7Contact';

const TOTAL_STEPS = 7;

const initialData: Property360Data = {
  property_type: '',
  city: '',
  address: '',
  area_sqm: '',
  rooms: '',
  floor: '',
  parking: false,
  elevator: false,
  balcony: false,
  status: '',
  current_monthly_rent: '',
  interests: [],
  full_name: '',
  phone: '',
  email: '',
  consent: false,
};

export default function WizardShell() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Property360Data>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (patch: Partial<Property360Data>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitProperty360(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'שגיאה בשמירת הפרטים');
      setLoading(false);
    }
  };

  const stepProps = { data, update, next, back };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-brand-muted mb-2">
          <span>שלב {step} מתוך {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && <Step1PropertyType {...stepProps} />}
      {step === 2 && <Step2Location {...stepProps} />}
      {step === 3 && <Step3Details {...stepProps} />}
      {step === 4 && <Step4Status {...stepProps} />}
      {step === 5 && <Step5Income {...stepProps} />}
      {step === 6 && <Step6Interest {...stepProps} />}
      {step === 7 && (
        <Step7Contact
          {...stepProps}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}
