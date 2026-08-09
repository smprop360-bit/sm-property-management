# Phase 1B: Public Landing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the four public landing pages (Home, Owners, Seekers, Thank-you) with real Hebrew content, lead capture forms, and the brand design system.

**Architecture:** Each page is a Next.js App Router Server Component in `src/app/(public)/`. New seeker-specific form state lives in `src/hooks/useSeekerLeadForm.ts` and its UI in `src/components/forms/SeekerLeadForm.tsx`. Pages import shared components (LeadForm, SeekerLeadForm) and use direct Tailwind classes for large CTA buttons (avoids buttonVariants override conflicts on Link elements).

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · shadcn/ui base-nova (`@base-ui/react`) · Lucide React · Supabase (already wired) · Jest 30 + React Testing Library

---

## File Structure

```
src/
  hooks/
    useSeekerLeadForm.ts        ← NEW: seeker form state + Supabase insert
  components/forms/
    SeekerLeadForm.tsx          ← NEW: extended form (property_type, city, budget, size_needed)
  app/(public)/
    page.tsx                    ← REPLACE: home page (hero, types, stats, value props, CTA)
    owners/page.tsx             ← REPLACE: owners page (hero+form, process, CTA)
    seekers/page.tsx            ← REPLACE: seekers page (hero+form, types, value props)
    thank-you/page.tsx          ← REPLACE: thank-you page (confirmation, WhatsApp CTA)

__tests__/
  hooks/
    useSeekerLeadForm.test.ts   ← NEW
  forms/
    SeekerLeadForm.test.tsx     ← NEW
```

**Existing files used (no changes):**
- `src/components/forms/LeadForm.tsx` — used on Owners page with `leadType="owner"`
- `src/hooks/useLeadForm.ts` — pattern for useSeekerLeadForm
- `src/lib/types/property.ts` — exports `PROPERTY_TYPE_LABELS`
- `src/lib/supabase/client.ts` — `createClient()`
- `src/components/ui/` — Button, Input, Label, Textarea, Select, etc.

---

## Task 1: `useSeekerLeadForm` hook

**Files:**
- Create: `src/hooks/useSeekerLeadForm.ts`
- Test: `__tests__/hooks/useSeekerLeadForm.test.ts`

- [ ] **Step 1: Write the failing test**

Create `__tests__/hooks/useSeekerLeadForm.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useSeekerLeadForm } from '@/hooks/useSeekerLeadForm'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    }),
  }),
}))

describe('useSeekerLeadForm', () => {
  it('initializes with empty values', () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    expect(result.current.values.full_name).toBe('')
    expect(result.current.values.property_type).toBe('')
    expect(result.current.values.city).toBe('')
    expect(result.current.values.budget).toBe('')
    expect(result.current.values.size_needed).toBe('')
    expect(result.current.loading).toBe(false)
    expect(result.current.submitError).toBeNull()
  })

  it('validates required fields on empty submit', async () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.full_name).toBe('שם מלא הוא שדה חובה')
    expect(result.current.errors.phone).toBe('טלפון הוא שדה חובה')
  })

  it('validates Israeli phone format', async () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '12345' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.phone).toBe('מספר טלפון לא תקין')
  })

  it('handleSelectChange updates property_type', () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    act(() => {
      result.current.handleSelectChange('property_type', 'office')
    })
    expect(result.current.values.property_type).toBe('office')
  })

  it('clears field error when value is corrected', () => {
    const { result } = renderHook(() => useSeekerLeadForm())
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: '' } } as any)
    })
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
    })
    expect(result.current.errors.full_name).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/hooks/useSeekerLeadForm.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '@/hooks/useSeekerLeadForm'`

- [ ] **Step 3: Create the hook**

Create `src/hooks/useSeekerLeadForm.ts`:

```typescript
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface SeekerFormValues {
  full_name: string
  phone: string
  email: string
  message: string
  property_type: string
  city: string
  budget: string
  size_needed: string
}

interface SeekerFormErrors {
  full_name?: string
  phone?: string
}

export function useSeekerLeadForm() {
  const router = useRouter()
  const [values, setValues] = useState<SeekerFormValues>({
    full_name: '',
    phone: '',
    email: '',
    message: '',
    property_type: '',
    city: '',
    budget: '',
    size_needed: '',
  })
  const [errors, setErrors] = useState<SeekerFormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof SeekerFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSelectChange(name: keyof SeekerFormValues, value: string) {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function validate(): boolean {
    const newErrors: SeekerFormErrors = {}
    if (!values.full_name.trim()) newErrors.full_name = 'שם מלא הוא שדה חובה'
    if (!values.phone.trim()) {
      newErrors.phone = 'טלפון הוא שדה חובה'
    } else if (!/^0[2-9]\d{7,8}$/.test(values.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const supabase = createClient()
    const utmParams = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    )

    const { error } = await supabase.from('leads').insert({
      full_name: values.full_name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || null,
      message: values.message.trim() || null,
      lead_type: 'seeker',
      property_type: values.property_type || null,
      city: values.city.trim() || null,
      budget: values.budget.trim() || null,
      size_needed: values.size_needed.trim() || null,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      utm_source: utmParams.get('utm_source'),
      utm_medium: utmParams.get('utm_medium'),
      utm_campaign: utmParams.get('utm_campaign'),
      utm_content: utmParams.get('utm_content'),
      source: utmParams.get('source'),
    })

    setLoading(false)
    if (error) {
      setSubmitError('שגיאה בשליחת הטופס. אנא נסה שוב.')
    } else {
      router.push('/thank-you')
    }
  }

  return { values, errors, loading, submitError, handleChange, handleSelectChange, handleSubmit }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest __tests__/hooks/useSeekerLeadForm.test.ts --no-coverage
```

Expected: PASS — 5 tests

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useSeekerLeadForm.ts __tests__/hooks/useSeekerLeadForm.test.ts
git commit -m "feat: add useSeekerLeadForm hook with seeker-specific fields"
```

---

## Task 2: `SeekerLeadForm` component

**Files:**
- Create: `src/components/forms/SeekerLeadForm.tsx`
- Test: `__tests__/forms/SeekerLeadForm.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/forms/SeekerLeadForm.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { SeekerLeadForm } from '@/components/forms/SeekerLeadForm'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    }),
  }),
}))

describe('SeekerLeadForm', () => {
  it('renders name and phone fields', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByPlaceholderText('ישראל ישראלי')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('05X-XXXXXXX')).toBeInTheDocument()
  })

  it('renders seeker-specific city and budget fields', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByPlaceholderText('תל אביב, ירושלים...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('10,000 ₪ לחודש')).toBeInTheDocument()
  })

  it('renders size_needed field', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByPlaceholderText('100-200 מ"ר')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<SeekerLeadForm />)
    expect(screen.getByRole('button', { name: /שלח פנייה/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/forms/SeekerLeadForm.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/forms/SeekerLeadForm'`

- [ ] **Step 3: Create the component**

Create `src/components/forms/SeekerLeadForm.tsx`:

```tsx
'use client'

import { useSeekerLeadForm } from '@/hooks/useSeekerLeadForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROPERTY_TYPE_LABELS } from '@/lib/types/property'

interface SeekerLeadFormProps {
  className?: string
}

export function SeekerLeadForm({ className }: SeekerLeadFormProps) {
  const {
    values,
    errors,
    loading,
    submitError,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useSeekerLeadForm()

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="seeker_property_type">סוג נכס</Label>
            <Select
              value={values.property_type}
              onValueChange={(v) => handleSelectChange('property_type', v)}
            >
              <SelectTrigger id="seeker_property_type" className="w-full h-10">
                <SelectValue placeholder="בחר סוג נכס" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seeker_city">עיר</Label>
            <Input
              id="seeker_city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="תל אביב, ירושלים..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="seeker_budget">תקציב</Label>
            <Input
              id="seeker_budget"
              name="budget"
              value={values.budget}
              onChange={handleChange}
              placeholder="10,000 ₪ לחודש"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seeker_size">גודל משוער</Label>
            <Input
              id="seeker_size"
              name="size_needed"
              value={values.size_needed}
              onChange={handleChange}
              placeholder='100-200 מ"ר'
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="seeker_full_name">שם מלא *</Label>
          <Input
            id="seeker_full_name"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            placeholder="ישראל ישראלי"
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs">{errors.full_name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="seeker_phone">טלפון *</Label>
          <Input
            id="seeker_phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="05X-XXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="seeker_message">פרטים נוספים</Label>
          <Textarea
            id="seeker_message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="ספר לנו עוד על מה שאתה מחפש..."
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold h-12"
        >
          {loading ? 'שולח...' : 'שלח פנייה'}
        </Button>

        {submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )}
      </div>
    </form>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest __tests__/forms/SeekerLeadForm.test.tsx --no-coverage
```

Expected: PASS — 4 tests

- [ ] **Step 5: Commit**

```bash
git add src/components/forms/SeekerLeadForm.tsx __tests__/forms/SeekerLeadForm.test.tsx
git commit -m "feat: add SeekerLeadForm component with property type, city, budget fields"
```

---

## Task 3: Home page

**Files:**
- Modify: `src/app/(public)/page.tsx` (full replacement)

No new tests — page renders only static data + tested components (LeadForm already tested).

- [ ] **Step 1: Replace the home page**

Replace the entire content of `src/app/(public)/page.tsx` with:

```tsx
import Link from 'next/link'
import {
  Building2,
  Store,
  Warehouse,
  Factory,
  Layers,
  Briefcase,
  Zap,
  Shield,
  Users,
} from 'lucide-react'

const propertyTypes = [
  { icon: Building2, label: 'משרד' },
  { icon: Store, label: 'חנות' },
  { icon: Warehouse, label: 'מחסן' },
  { icon: Factory, label: 'תעשייה' },
  { icon: Layers, label: 'קרקע' },
  { icon: Briefcase, label: 'עסק' },
]

const stats = [
  { number: '500+', label: 'נכסים במאגר' },
  { number: '30', label: 'ערים' },
  { number: 'מאות', label: 'עסקאות שנסגרו' },
]

const valueProps = [
  {
    icon: Zap,
    title: 'מהיר ואפקטיבי',
    text: 'פרסום מיידי, לקוחות רלוונטיים בתוך ימים',
  },
  {
    icon: Shield,
    title: 'אמינות מלאה',
    text: 'נכסים מאומתים, לידים איכותיים בלבד',
  },
  {
    icon: Users,
    title: 'ליווי מקצועי',
    text: 'צוות מקצועי שמלווה אותך לאורך כל הדרך',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-brand-navy to-[#0f1e47] text-center px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="block text-white">המאגר הישראלי</span>
            <span className="block text-brand-gold">לנכסים מסחריים</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            משרדים, חנויות, מחסנים, קרקעות ועוד — כל הנכסים המסחריים במקום אחד
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seekers"
              className="inline-flex items-center justify-center rounded-lg bg-brand-gold text-white font-semibold px-8 py-4 text-base transition-colors hover:bg-brand-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
            >
              אני מחפש נכס
            </Link>
            <Link
              href="/owners"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/60 text-white font-semibold px-8 py-4 text-base transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              יש לי נכס להציע
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            סוגי נכסים
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            מה אתה מחפש?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {propertyTypes.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="/seekers"
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <Icon className="w-10 h-10 text-brand-gold group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-brand-navy text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-brand-navy">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map(({ number, label }) => (
              <div key={label}>
                <div className="text-5xl font-black text-brand-gold mb-2">{number}</div>
                <div className="text-white/70 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            למה TOPROP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center">
                  <Icon className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-gold to-[#e0b830]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            בעל נכס? תן לנו להגיע ללקוחות הנכונים עבורך
          </h2>
          <Link
            href="/owners"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy text-white font-semibold px-10 py-4 text-base transition-colors hover:bg-brand-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50"
          >
            פרסם עכשיו
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify the page compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Verify visually in browser**

Open [http://localhost:3000](http://localhost:3000). You should see:
- Navy gradient hero with white + gold split headline
- Property type grid on pearl background
- Navy stats bar with gold numbers
- White value props section
- Gold CTA banner at bottom

- [ ] **Step 4: Commit**

```bash
git add src/app/(public)/page.tsx
git commit -m "feat: build home page with hero, property types, stats, value props, and CTA sections"
```

---

## Task 4: Owners page

**Files:**
- Modify: `src/app/(public)/owners/page.tsx` (full replacement)

- [ ] **Step 1: Replace the owners page**

Replace the entire content of `src/app/(public)/owners/page.tsx` with:

```tsx
import Link from 'next/link'
import { ClipboardList, Phone, TrendingUp, CheckCircle } from 'lucide-react'
import { LeadForm } from '@/components/forms/LeadForm'

const processSteps = [
  {
    icon: ClipboardList,
    title: 'מלא את הטופס',
    text: 'השאר פרטים בסיסיים על הנכס שלך',
  },
  {
    icon: Phone,
    title: 'נתאם שיחת היכרות',
    text: 'נציג שלנו יחזור אליך תוך 24 שעות',
  },
  {
    icon: TrendingUp,
    title: 'אנחנו מטפלים בשיווק',
    text: 'אנחנו מגיעים ללקוחות הנכונים בשבילך',
  },
]

const benefits = [
  'פרסום רחב ברחבי ישראל',
  'לידים איכותיים בלבד',
  'ייעוץ ושיווק ללא עלות ראשונית',
]

export default function OwnersPage() {
  return (
    <>
      {/* Hero + Form */}
      <section id="owner-form" className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-4">
                לבעלי נכסים
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
                פרסם את הנכס שלך
              </h1>
              <div className="w-16 h-1 bg-brand-gold mb-6" />
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                אנחנו מגיעים ללקוחות הנכונים. בלי בינוניות, בלי בזבוז זמן.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-brand-navy mb-6">
                השאר פרטים ונחזור אליך
              </h2>
              <LeadForm leadType="owner" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            איך זה עובד?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center">
                  <span className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-brand-gold text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-brand-navy text-lg">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-brand-navy text-center">
        <h2 className="text-2xl font-bold text-white mb-6">מוכן להתחיל?</h2>
        <Link
          href="#owner-form"
          className="inline-flex items-center justify-center rounded-lg bg-brand-gold text-white font-semibold px-10 py-4 text-base transition-colors hover:bg-brand-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
        >
          פרסם את הנכס שלך
        </Link>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Verify visually in browser**

Open [http://localhost:3000/owners](http://localhost:3000/owners). You should see:
- Pearl background with two columns: copy (right, RTL) + white form card (left, RTL)
- Gold rule under headline
- Green checkmark bullets for benefits
- Process steps with navy circles + gold numbered badge
- Navy CTA section at bottom

- [ ] **Step 4: Commit**

```bash
git add src/app/(public)/owners/page.tsx
git commit -m "feat: build owners landing page with form, process steps, and CTA"
```

---

## Task 5: Seekers page

**Files:**
- Modify: `src/app/(public)/seekers/page.tsx` (full replacement)

- [ ] **Step 1: Replace the seekers page**

Replace the entire content of `src/app/(public)/seekers/page.tsx` with:

```tsx
import {
  Building2,
  Store,
  Warehouse,
  Factory,
  Layers,
  Briefcase,
  Search,
  Star,
  Users,
} from 'lucide-react'
import { SeekerLeadForm } from '@/components/forms/SeekerLeadForm'

const propertyTypes = [
  { icon: Building2, label: 'משרד' },
  { icon: Store, label: 'חנות' },
  { icon: Warehouse, label: 'מחסן' },
  { icon: Factory, label: 'תעשייה' },
  { icon: Layers, label: 'קרקע' },
  { icon: Briefcase, label: 'עסק' },
]

const valueProps = [
  {
    icon: Search,
    title: 'גישה למאגר',
    text: 'נכסים מסחריים ברחבי ישראל',
  },
  {
    icon: Star,
    title: 'חיפוש מותאם',
    text: 'אנחנו מוצאים לך את הנכס לפי הצרכים שלך',
  },
  {
    icon: Users,
    title: 'ליווי עד הסגירה',
    text: 'איתך מהחיפוש עד חתימת החוזה',
  },
]

export default function SeekersPage() {
  return (
    <>
      {/* Hero + Form */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-navy to-[#0f1e47]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-white">מצא את הנכס</span>
            <span className="block text-brand-gold">שחיפשת</span>
          </h1>
          <p className="text-white/70 text-lg mb-10">
            ספר לנו מה אתה מחפש ונמצא לך את הנכס המתאים
          </p>
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-start max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-brand-navy mb-6 text-center">
              מה אתה מחפש?
            </h2>
            <SeekerLeadForm />
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            מה אנחנו מציעים
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {propertyTypes.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm"
              >
                <Icon className="w-10 h-10 text-brand-gold" />
                <span className="font-medium text-brand-navy text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            איך אנחנו עוזרים?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center">
                  <Icon className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Verify visually in browser**

Open [http://localhost:3000/seekers](http://localhost:3000/seekers). You should see:
- Navy gradient hero with split white+gold headline
- White form card centered with SeekerLeadForm (property type Select, city, budget, size, name, phone)
- Pearl property types grid
- White value props section

- [ ] **Step 4: Commit**

```bash
git add src/app/(public)/seekers/page.tsx
git commit -m "feat: build seekers landing page with extended lead form and property type grid"
```

---

## Task 6: Thank-you page

**Files:**
- Modify: `src/app/(public)/thank-you/page.tsx` (full replacement)

- [ ] **Step 1: Replace the thank-you page**

Replace the entire content of `src/app/(public)/thank-you/page.tsx` with:

```tsx
import Link from 'next/link'
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-brand-gold" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          קיבלנו את פנייתך!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          אחד מהנציגים שלנו יחזור אליך בהקדם האפשרי.
          <br />
          בינתיים, אפשר לדבר איתנו ישירות בווצאפ.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/972500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-semibold px-8 py-4 text-base transition-colors hover:bg-[#20bd5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
          >
            <MessageCircle className="w-5 h-5" />
            דבר איתנו בווצאפ
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-navy text-brand-navy font-semibold px-8 py-4 text-base transition-colors hover:bg-brand-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50"
          >
            <ArrowRight className="w-5 h-5" />
            חזרה לעמוד הבית
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Verify visually in browser**

Open [http://localhost:3000/thank-you](http://localhost:3000/thank-you). You should see:
- Centered layout on white/light background
- Gold circle with checkmark icon
- Navy headline "קיבלנו את פנייתך!"
- Two buttons: green WhatsApp + navy outline "back home"

- [ ] **Step 4: Run the full test suite**

```bash
npx jest --no-coverage
```

Expected: all tests pass (including the 9 pre-existing tests from Phase 1A)

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/thank-you/page.tsx
git commit -m "feat: redesign thank-you page with WhatsApp CTA"
```

---

## Final verification

- [ ] **Run full test suite**

```bash
npx jest --no-coverage
```

Expected: all tests pass

- [ ] **Check TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Check all four pages in browser**

- [http://localhost:3000](http://localhost:3000) — home with hero + property types + stats + value props + CTA
- [http://localhost:3000/owners](http://localhost:3000/owners) — owners with form card + process steps + CTA
- [http://localhost:3000/seekers](http://localhost:3000/seekers) — seekers with extended form + types
- [http://localhost:3000/thank-you](http://localhost:3000/thank-you) — confirmation with WhatsApp + home link
