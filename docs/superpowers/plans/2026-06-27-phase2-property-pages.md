# Phase 2 — Property Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build public property listing + detail landing pages with subdomain routing, contact form, and admin copy-link button.

**Architecture:** Middleware reads the subdomain from the `host` header and rewrites to `/property/[slug]`. Server components fetch from Supabase using `@/lib/supabase/server`. The contact form is a client component that inserts a lead with `lead_type = 'property_interest'` and `property_id`.

**Tech Stack:** Next.js 16 App Router (server + client components), TypeScript strict, Tailwind CSS v4, Supabase JS (`@supabase/ssr`), Lucide React.

---

## Codebase Context

Working directory: `c:\Users\user\Desktop\TOPROP WEBSITE`

**Critical facts:**
- Server Supabase client: `import { createClient } from '@/lib/supabase/server'` — async function, must `await`
- Browser Supabase client: `import { createClient } from '@/lib/supabase/client'` — sync function
- `Property.id` is `string` UUID. `Property.slug` is a unique text slug (e.g. `misrad-tlv-1abc2`).
- `leads` table accepts `lead_type = 'property_interest'` and `property_id uuid` (nullable FK to properties).
- Public pages are inside `src/app/(public)/` route group — they inherit `PublicHeader` + `PublicFooter` from `src/app/(public)/layout.tsx`.
- `formatPrice(price, visible, text)` is exported from `@/lib/utils`.
- `PropertyCard` already exists at `src/components/shared/PropertyCard.tsx` — renders a property card linking to `/property/${property.slug}`.
- `PROPERTY_TYPE_LABELS` and `DEAL_TYPE_LABELS` are exported from `@/lib/types/property`.
- Run tests with: `npx jest --testPathPattern=<path> --no-coverage`

**Phone validation regex (matches existing hook pattern):**
```
/^0[2-9]\d{7,8}$/.test(phone.replace(/[-\s]/g, ''))
```

---

## File Map

```
src/middleware.ts                                         (create)
src/hooks/usePropertyContactForm.ts                      (create)
src/components/public/PropertyContactForm.tsx            (create)
src/components/public/PropertiesFilters.tsx              (create)
src/app/(public)/properties/page.tsx                     (replace stub)
src/app/(public)/property/[slug]/page.tsx                (replace stub)
src/components/admin/PropertiesTable.tsx                 (modify: add copy-link button)
__tests__/hooks/usePropertyContactForm.test.ts           (create)
```

---

## Task 1: Subdomain middleware

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware**

Create `src/middleware.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const hostname = host.split(':')[0]
  const parts = hostname.split('.')

  // No subdomain on localhost or plain domain (toprop.co.il = 2 parts)
  if (hostname === 'localhost' || parts.length <= 2) {
    return NextResponse.next()
  }

  const subdomain = parts[0]

  if (subdomain === 'www' || subdomain === 'admin') {
    return NextResponse.next()
  }

  // Rewrite subdomain to /property/[slug]
  const url = request.nextUrl.clone()
  url.pathname = `/property/${subdomain}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "middleware"
```

Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: subdomain routing middleware for property landing pages"
```

---

## Task 2: usePropertyContactForm hook + tests

**Files:**
- Create: `src/hooks/usePropertyContactForm.ts`
- Create: `__tests__/hooks/usePropertyContactForm.test.ts`

- [ ] **Step 1: Write the failing test**

Create `__tests__/hooks/usePropertyContactForm.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { usePropertyContactForm } from '@/hooks/usePropertyContactForm'

const mockInsert = jest.fn().mockResolvedValue({ error: null })

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}))

describe('usePropertyContactForm', () => {
  it('initializes with empty values and not submitted', () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    expect(result.current.values.full_name).toBe('')
    expect(result.current.values.phone).toBe('')
    expect(result.current.submitted).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it('validates required fields on empty submit', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.full_name).toBe('שם מלא הוא שדה חובה')
    expect(result.current.errors.phone).toBe('טלפון הוא שדה חובה')
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('validates invalid phone format', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '12345' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.phone).toBe('מספר טלפון לא תקין')
  })

  it('clears full_name error when corrected', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.errors.full_name).toBe('שם מלא הוא שדה חובה')
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל' } } as any)
    })
    expect(result.current.errors.full_name).toBeUndefined()
  })

  it('sets submitted=true on successful insert', async () => {
    const { result } = renderHook(() => usePropertyContactForm('prop-uuid-123'))
    act(() => {
      result.current.handleChange({ target: { name: 'full_name', value: 'ישראל ישראלי' } } as any)
      result.current.handleChange({ target: { name: 'phone', value: '0501234567' } } as any)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any)
    })
    expect(result.current.submitted).toBe(true)
    expect(result.current.submitError).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest --testPathPattern=usePropertyContactForm --no-coverage
```

Expected: FAIL — `Cannot find module '@/hooks/usePropertyContactForm'`

- [ ] **Step 3: Create the hook**

Create `src/hooks/usePropertyContactForm.ts`:

```typescript
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ContactFormValues {
  full_name: string
  phone: string
  message: string
}

interface ContactFormErrors {
  full_name?: string
  phone?: string
}

export function usePropertyContactForm(propertyId: string) {
  const [values, setValues] = useState<ContactFormValues>({
    full_name: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: ContactFormErrors = {}
    if (!values.full_name.trim()) {
      newErrors.full_name = 'שם מלא הוא שדה חובה'
    }
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
    setSubmitError(null)
    const supabase = createClient()
    const utmParams = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    )

    const { error } = await supabase.from('leads').insert({
      full_name: values.full_name.trim(),
      phone: values.phone.trim(),
      message: values.message.trim() || null,
      lead_type: 'property_interest',
      property_id: propertyId,
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
      setSubmitted(true)
    }
  }

  return { values, errors, loading, submitted, submitError, handleChange, handleSubmit }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest --testPathPattern=usePropertyContactForm --no-coverage
```

Expected: PASS — 5 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/hooks/usePropertyContactForm.ts __tests__/hooks/usePropertyContactForm.test.ts
git commit -m "feat: add usePropertyContactForm hook with validation"
```

---

## Task 3: PropertyContactForm component

**Files:**
- Create: `src/components/public/PropertyContactForm.tsx`

- [ ] **Step 1: Create component**

Create `src/components/public/PropertyContactForm.tsx`:

```tsx
'use client'

import { usePropertyContactForm } from '@/hooks/usePropertyContactForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface PropertyContactFormProps {
  propertyId: string
  propertyTitle: string
}

export function PropertyContactForm({ propertyId, propertyTitle }: PropertyContactFormProps) {
  const { values, errors, loading, submitted, submitError, handleChange, handleSubmit } =
    usePropertyContactForm(propertyId)

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <CheckCircle size={48} className="text-brand-gold" />
        <h3 className="text-xl font-bold text-brand-navy">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-gray-600 text-sm">נחזור אליך בהקדם.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">
        מעוניין ב: <span className="font-medium text-brand-navy">{propertyTitle}</span>
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="contact_full_name">שם מלא *</Label>
        <Input
          id="contact_full_name"
          name="full_name"
          value={values.full_name}
          onChange={handleChange}
          placeholder="ישראל ישראלי"
        />
        {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact_phone">טלפון *</Label>
        <Input
          id="contact_phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="05X-XXXXXXX"
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact_message">הודעה (אופציונלי)</Label>
        <Textarea
          id="contact_message"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="פרטים נוספים..."
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

      {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}
    </form>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "PropertyContactForm"
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/public/PropertyContactForm.tsx
git commit -m "feat: add PropertyContactForm component"
```

---

## Task 4: Property detail page

**Files:**
- Modify: `src/app/(public)/property/[slug]/page.tsx` (replace stub)

Read `src/lib/types/property.ts` before starting to confirm field names.

- [ ] **Step 1: Replace the stub**

Replace `src/app/(public)/property/[slug]/page.tsx` entirely:

```tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Maximize2, Layers, Building2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PropertyContactForm } from '@/components/public/PropertyContactForm'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import { formatPrice } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!property) notFound()

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-72 md:h-[420px] bg-brand-light">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Building2 size={64} />
          </div>
        )}
        <div className="absolute inset-0 bg-brand-navy/40" />
        <div className="absolute bottom-6 start-6 end-6">
          <span className="inline-block bg-brand-gold text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {DEAL_TYPE_LABELS[property.deal_type]}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow">
            {property.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Details column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Building2 size={16} className="text-brand-gold" />
                <span>{PROPERTY_TYPE_LABELS[property.type]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} className="text-brand-gold" />
                <span>
                  {property.city}
                  {property.area ? `, ${property.area}` : ''}
                  {property.address ? ` — ${property.address}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Maximize2 size={16} className="text-brand-gold" />
                <span>{property.size_sqm} מ"ר</span>
              </div>
              {property.floor && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Layers size={16} className="text-brand-gold" />
                  <span>קומה {property.floor}</span>
                </div>
              )}
              <div className="ms-auto font-bold text-brand-gold text-base">
                {formatPrice(property.price, property.price_visible, property.price_text)}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-brand-navy mb-3">תיאור הנכס</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}
          </div>

          {/* Contact form column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h2 className="font-bold text-brand-navy text-lg mb-4">מעוניין? צור קשר</h2>
              <PropertyContactForm
                propertyId={property.id}
                propertyTitle={property.title}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "property"
```

Expected: no errors in property files.

- [ ] **Step 3: Verify manually**

Start the dev server if not running: `npm run dev`

Navigate to `http://localhost:3000/property/<slug>` where `<slug>` is the slug of a property you added in the admin (check the DB or admin properties list for the slug value).

Expected: property detail page with image, details bar, and contact form.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(public)/property/[slug]/page.tsx"
git commit -m "feat: property detail landing page with contact form"
```

---

## Task 5: Properties listing page

**Files:**
- Create: `src/components/public/PropertiesFilters.tsx`
- Modify: `src/app/(public)/properties/page.tsx` (replace stub)

- [ ] **Step 1: Create PropertiesFilters client component**

Create `src/components/public/PropertiesFilters.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { PropertyCard } from '@/components/shared/PropertyCard'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import type { Property } from '@/lib/types/property'

interface PropertiesFiltersProps {
  properties: Property[]
}

export function PropertiesFilters({ properties }: PropertiesFiltersProps) {
  const [filterType, setFilterType] = useState('')
  const [filterDeal, setFilterDeal] = useState('')

  const filtered = properties.filter(p => {
    const matchesType = !filterType || p.type === filterType
    const matchesDeal = !filterDeal || p.deal_type === filterDeal
    return matchesType && matchesDeal
  })

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm min-w-[140px]"
        >
          <option value="">כל הסוגים</option>
          {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <select
          value={filterDeal}
          onChange={e => setFilterDeal(e.target.value)}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm min-w-[140px]"
        >
          <option value="">כל סוגי העסקה</option>
          {Object.entries(DEAL_TYPE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">אין נכסים זמינים כרגע</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Replace the properties listing page stub**

Replace `src/app/(public)/properties/page.tsx` entirely:

```tsx
import { createClient } from '@/lib/supabase/server'
import { PropertiesFilters } from '@/components/public/PropertiesFilters'

export default async function PropertiesPage() {
  const supabase = await createClient()
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* Hero band */}
      <section className="bg-brand-navy py-16 px-4 text-center">
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">
          המאגר הישראלי
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white">
          נכסים מסחריים
        </h1>
        <p className="text-white/60 mt-2 text-sm">
          {properties?.length ?? 0} נכסים זמינים
        </p>
      </section>

      {/* Listing */}
      <section className="py-12 px-4 bg-brand-light min-h-[60vh]">
        <div className="max-w-6xl mx-auto">
          <PropertiesFilters properties={properties ?? []} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "properties"
```

Expected: no errors.

- [ ] **Step 4: Verify manually**

Navigate to `http://localhost:3000/properties`.

Expected: navy hero with count, filter bar, grid of property cards (or empty state if no active properties).

- [ ] **Step 5: Commit**

```bash
git add src/components/public/PropertiesFilters.tsx "src/app/(public)/properties/page.tsx"
git commit -m "feat: public properties listing page with type and deal filters"
```

---

## Task 6: Copy-link button in admin PropertiesTable

**Files:**
- Modify: `src/components/admin/PropertiesTable.tsx`

Read `src/components/admin/PropertiesTable.tsx` before starting to see the current actions column structure.

- [ ] **Step 1: Add copy-link state and button**

In `src/components/admin/PropertiesTable.tsx`:

**Add `Link2`, `Check` to the lucide import:**

```tsx
import { Pencil, Trash2, AlertTriangle, Link2, Check } from 'lucide-react'
```

**Add `copiedId` state inside the component (after the existing `confirmId` state):**

```tsx
const [copiedId, setCopiedId] = useState<string | null>(null)
```

**Add `copyLink` function inside the component (after the state declarations):**

```tsx
function copyLink(slug: string, id: string) {
  navigator.clipboard.writeText(`https://${slug}.toprop.co.il`)
  setCopiedId(id)
  setTimeout(() => setCopiedId(null), 2000)
}
```

**Replace the actions `<div>` (the one with edit + delete buttons) with:**

```tsx
<div className="flex items-center gap-2">
  <button
    onClick={() => copyLink(prop.slug, prop.id)}
    className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-gold"
    aria-label="העתק קישור"
    title={`https://${prop.slug}.toprop.co.il`}
  >
    {copiedId === prop.id ? (
      <Check size={16} className="text-green-500" />
    ) : (
      <Link2 size={16} />
    )}
  </button>
  <Link
    href={`/admin/properties/${prop.id}/edit`}
    className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-navy"
    aria-label="עריכה"
  >
    <Pencil size={16} />
  </Link>
  <button
    onClick={() => setConfirmId(prop.id)}
    className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
    aria-label="מחיקה"
  >
    <Trash2 size={16} />
  </button>
</div>
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "PropertiesTable"
```

Expected: no output.

- [ ] **Step 3: Verify manually**

Navigate to `http://localhost:3000/admin/properties`. Click the link icon on a property. Check clipboard — should contain `https://<slug>.toprop.co.il`. Icon should briefly turn green with a checkmark.

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/PropertiesTable.tsx
git commit -m "feat: copy-link button in admin properties table"
```

---

## Final verification

- [ ] **Run all tests**

```bash
npx jest --no-coverage
```

Expected: all tests pass (existing 42 + 5 new = 47 total), no regressions.

- [ ] **TypeScript clean**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Manual smoke test**
  1. `/admin/properties` → copy link button works, shows checkmark
  2. `/properties` → listing page loads, filters work
  3. `/property/<slug>` → detail page loads with image, details, form
  4. Submit contact form → lead appears in `/admin/leads` with `property_interest` type
