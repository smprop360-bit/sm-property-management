# TOPROP Foundation 1A — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap the TOPROP Next.js project with RTL design system, Supabase schema, shadcn/ui, and skeleton layouts for all public and admin routes.

**Architecture:** Next.js 14 App Router with route groups `(public)` and `(admin)` for separate layouts. Supabase for DB with browser + server clients. shadcn/ui on Tailwind with navy/gold brand colors and RTL Hebrew via Heebo font.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, shadcn/ui, Radix UI, Supabase SSR, Jest + React Testing Library, Lucide React

**Spec:** `docs/superpowers/specs/2026-06-25-foundation-1a-design.md`

---

## File Map

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout — RTL, Heebo font, metadata |
| `src/app/globals.css` | Tailwind directives + shadcn/ui CSS vars |
| `src/app/(public)/layout.tsx` | Wraps all public pages with header + footer |
| `src/app/(public)/page.tsx` | `/` skeleton |
| `src/app/(public)/owners/page.tsx` | `/owners` skeleton |
| `src/app/(public)/seekers/page.tsx` | `/seekers` skeleton |
| `src/app/(public)/properties/page.tsx` | `/properties` skeleton |
| `src/app/(public)/property/[slug]/page.tsx` | `/property/[slug]` skeleton |
| `src/app/(public)/thank-you/page.tsx` | `/thank-you` skeleton |
| `src/app/(admin)/layout.tsx` | Wraps all admin pages with sidebar |
| `src/app/(admin)/admin/page.tsx` | `/admin` skeleton |
| `src/app/(admin)/admin/leads/page.tsx` | `/admin/leads` skeleton |
| `src/app/(admin)/admin/properties/page.tsx` | `/admin/properties` skeleton |
| `src/app/(admin)/admin/campaigns/page.tsx` | `/admin/campaigns` skeleton |
| `src/app/(admin)/admin/tasks/page.tsx` | `/admin/tasks` skeleton |
| `src/app/(admin)/admin/messages/page.tsx` | `/admin/messages` skeleton |
| `src/app/(admin)/admin/users/page.tsx` | `/admin/users` skeleton |
| `src/app/(admin)/admin/settings/page.tsx` | `/admin/settings` skeleton |
| `src/components/shared/PublicHeader.tsx` | Sticky header with nav + CTA |
| `src/components/shared/PublicFooter.tsx` | Footer with links + WhatsApp |
| `src/components/shared/AdminSidebar.tsx` | Nav sidebar for admin |
| `src/components/shared/PropertyCard.tsx` | Reusable property card |
| `src/components/forms/LeadForm.tsx` | Base lead form component |
| `src/lib/types/property.ts` | Property TypeScript types |
| `src/lib/types/lead.ts` | Lead TypeScript types |
| `src/lib/utils.ts` | cn(), slugify(), formatPrice() |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client |
| `src/hooks/useLeadForm.ts` | Form state + Supabase submit |
| `tailwind.config.ts` | Brand colors + font |
| `supabase/migrations/001_initial_schema.sql` | DB tables |
| `.env.example` | Required env vars |
| `jest.config.ts` | Jest + Next.js config |
| `jest.setup.ts` | jest-dom matchers |
| `__tests__/lib/utils.test.ts` | Utils unit tests |
| `__tests__/components/PropertyCard.test.tsx` | Card render tests |
| `__tests__/forms/LeadForm.test.tsx` | Form validation tests |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: all Next.js boilerplate in project root

- [ ] **Step 1: Run create-next-app in the TOPROP WEBSITE directory**

Open terminal in `c:\Users\user\Desktop\TOPROP WEBSITE` and run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When prompted about existing files, answer **Yes** to proceed. Choose **No** for `src/` if asked (we already pass `--src-dir`).

- [ ] **Step 2: Init git**

```bash
git init
git add .
git commit -m "chore: initial Next.js scaffold"
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: server running on http://localhost:3000 with no errors.

---

## Task 2: Set up Jest + React Testing Library

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Install testing dependencies**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

- [ ] **Step 2: Create jest.config.ts**

```ts
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

- [ ] **Step 3: Create jest.setup.ts**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, ensure `"scripts"` contains:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 5: Run Jest to verify setup**

```bash
npm test -- --passWithNoTests
```

Expected: `Test Suites: 0 passed` — no errors.

- [ ] **Step 6: Commit**

```bash
git add jest.config.ts jest.setup.ts package.json package-lock.json
git commit -m "chore: add Jest + React Testing Library"
```

---

## Task 3: Configure Tailwind with brand colors + RTL font

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B2B5E',
          gold: '#C9A227',
          light: '#F8F9FA',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-heebo)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 226 54% 24%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 44 76% 47%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 226 54% 24%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 3: Verify dev server has no errors**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind with TOPROP brand colors and shadcn/ui CSS vars"
```

---

## Task 4: Install and configure shadcn/ui

**Files:**
- Create: `components.json`
- Create: `src/components/ui/` (generated)

- [ ] **Step 1: Init shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

- [ ] **Step 2: Add required components**

```bash
npx shadcn@latest add button input label textarea badge card select table dialog
```

- [ ] **Step 3: Verify components exist**

```bash
ls src/components/ui/
```

Expected: `button.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `badge.tsx`, `card.tsx`, `select.tsx`, `table.tsx`, `dialog.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ components.json
git commit -m "feat: add shadcn/ui with core components"
```

---

## Task 5: TypeScript types

**Files:**
- Create: `src/lib/types/property.ts`
- Create: `src/lib/types/lead.ts`

- [ ] **Step 1: Create property types**

```ts
// src/lib/types/property.ts
export type PropertyType = 'office' | 'store' | 'warehouse' | 'industry' | 'land' | 'business'
export type DealType = 'rent' | 'sale' | 'both'
export type PropertyStatus = 'active' | 'inactive' | 'rented' | 'sold'

export interface Property {
  id: string
  title: string
  slug: string
  type: PropertyType
  deal_type: DealType
  city: string
  area: string | null
  address: string | null
  size_sqm: number
  floor: string | null
  price: number | null
  price_visible: boolean
  price_text: string | null
  description: string | null
  features: string[]
  images: string[]
  status: PropertyStatus
  created_at: string
  updated_at: string
}

export type PropertyInsert = Omit<Property, 'id' | 'created_at' | 'updated_at'>
export type PropertyUpdate = Partial<PropertyInsert>

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  office: 'משרד',
  store: 'חנות',
  warehouse: 'מחסן',
  industry: 'תעשייה',
  land: 'קרקע',
  business: 'עסק',
}

export const DEAL_TYPE_LABELS: Record<DealType, string> = {
  rent: 'להשכרה',
  sale: 'למכירה',
  both: 'למכירה / השכרה',
}
```

- [ ] **Step 2: Create lead types**

```ts
// src/lib/types/lead.ts
export type LeadType = 'owner' | 'seeker' | 'property_interest'

export const LEAD_STATUSES = [
  'חדש',
  'בטיפול',
  'לא ענה',
  'חזרתי אליו',
  'רלוונטי',
  'לא רלוונטי',
  'נקבעה פגישה',
  'נשלחה הצעה',
  'נסגרה עסקה',
  'במעקב',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export interface Lead {
  id: number
  full_name: string
  phone: string
  email: string | null
  lead_type: LeadType
  property_id: string | null
  city: string | null
  property_type: string | null
  size_needed: string | null
  budget: string | null
  message: string | null
  source: string | null
  page_url: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  status: LeadStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at' | 'updated_at'>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/types/
git commit -m "feat: add TypeScript types for Property and Lead"
```

---

## Task 6: Utility functions (TDD)

**Files:**
- Create: `__tests__/lib/utils.test.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Write failing tests**

```ts
// __tests__/lib/utils.test.ts
import { slugify, formatPrice } from '@/lib/utils'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('office tel aviv')).toBe('office-tel-aviv')
  })
  it('converts to lowercase', () => {
    expect(slugify('Office Petah Tikva')).toBe('office-petah-tikva')
  })
  it('collapses multiple spaces', () => {
    expect(slugify('office  double  space')).toBe('office-double-space')
  })
  it('removes non-alphanumeric chars', () => {
    expect(slugify('office (floor 3)')).toBe('office-floor-3')
  })
})

describe('formatPrice', () => {
  it('returns "מחיר לפי פנייה" when price_visible is false', () => {
    expect(formatPrice(1000000, false)).toBe('מחיר לפי פנייה')
  })
  it('returns custom text when provided and visible', () => {
    expect(formatPrice(1000000, true, 'במשא ומתן')).toBe('במשא ומתן')
  })
  it('returns "מחיר לפי פנייה" when price is null and visible', () => {
    expect(formatPrice(null, true)).toBe('מחיר לפי פנייה')
  })
  it('formats price with ₪ and thousands separator', () => {
    expect(formatPrice(15000, true)).toBe('₪15,000')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- __tests__/lib/utils.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/utils'`

- [ ] **Step 3: Implement utils.ts**

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(
  price: number | null,
  visible: boolean,
  text?: string | null
): string {
  if (!visible) return 'מחיר לפי פנייה'
  if (text) return text
  if (price === null) return 'מחיר לפי פנייה'
  return `₪${price.toLocaleString('he-IL')}`
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- __tests__/lib/utils.test.ts
```

Expected: PASS — 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts __tests__/lib/utils.test.ts
git commit -m "feat: add utility functions (cn, slugify, formatPrice) with tests"
```

---

## Task 7: Supabase clients

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`

- [ ] **Step 1: Install Supabase packages**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

- [ ] **Step 2: Create browser client**

```ts
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 3: Create server client**

```ts
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — ignore
          }
        },
      },
    }
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase/ package.json package-lock.json
git commit -m "feat: add Supabase browser and server clients"
```

---

## Task 8: Root layout (RTL + Heebo)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace root layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TOPROP | המאגר הישראלי לנכסים',
  description: 'נכסים מסחריים למכירה ולהשכרה בישראל — משרדים, חנויות, מחסנים ועוד.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000 — text should be RTL and use Heebo font (check DevTools > Computed > font-family).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure root layout with RTL, Hebrew lang, and Heebo font"
```

---

## Task 9: PublicHeader + PublicFooter + public layout

**Files:**
- Create: `src/components/shared/PublicHeader.tsx`
- Create: `src/components/shared/PublicFooter.tsx`
- Create: `src/app/(public)/layout.tsx`

- [ ] **Step 1: Install lucide-react (if not already installed)**

```bash
npm install lucide-react
```

- [ ] **Step 2: Create PublicHeader**

```tsx
// src/components/shared/PublicHeader.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/properties?type=office', label: 'משרדים' },
  { href: '/properties?type=store', label: 'חנויות' },
  { href: '/properties?type=warehouse', label: 'מחסנים' },
  { href: '/properties', label: 'כל הנכסים' },
  { href: '/seekers', label: 'מחפשים נכס' },
]

export function PublicHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/logo.png" alt="TOPROP" width={120} height={40} priority />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:flex bg-brand-gold hover:bg-brand-gold/90 text-white"
            >
              <Link href="/owners">פרסם נכס</Link>
            </Button>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setOpen(!open)}
              aria-label="תפריט"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-navy rounded-lg hover:bg-brand-light"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-3 w-full bg-brand-gold hover:bg-brand-gold/90 text-white"
            >
              <Link href="/owners">פרסם נכס</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create PublicFooter**

```tsx
// src/components/shared/PublicFooter.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="/logo.png"
              alt="TOPROP"
              width={100}
              height={33}
              className="brightness-0 invert"
            />
            <p className="text-sm text-gray-400">TOP PROPERTY FOR YOU</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <Link href="/owners" className="hover:text-brand-gold transition-colors">
              בעלי נכסים
            </Link>
            <Link href="/seekers" className="hover:text-brand-gold transition-colors">
              מחפשים נכס
            </Link>
            <Link href="/properties" className="hover:text-brand-gold transition-colors">
              נכסים
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/972500000000"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="tel:+972500000000"
              className="flex items-center gap-2 border border-white/20 hover:border-brand-gold text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Phone size={16} />
              התקשרו
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TOPROP. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Create public layout**

```tsx
// src/app/(public)/layout.tsx
import { PublicHeader } from '@/components/shared/PublicHeader'
import { PublicFooter } from '@/components/shared/PublicFooter'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
```

- [ ] **Step 5: Copy logo to public/**

```bash
cp "ChatGPT Image Jun 25, 2026, 06_20_49 AM.png" public/logo.png
```

Or copy `LOGO.png` → `public/logo.png` using file explorer.

- [ ] **Step 6: Verify in browser**

Visit http://localhost:3000 — should show header with logo + nav links, and footer at the bottom.

- [ ] **Step 7: Commit**

```bash
git add src/components/shared/PublicHeader.tsx src/components/shared/PublicFooter.tsx src/app/"(public)"/layout.tsx public/logo.png
git commit -m "feat: add PublicHeader, PublicFooter, and public route group layout"
```

---

## Task 10: AdminSidebar + admin layout

**Files:**
- Create: `src/components/shared/AdminSidebar.tsx`
- Create: `src/app/(admin)/layout.tsx`

- [ ] **Step 1: Create AdminSidebar**

```tsx
// src/components/shared/AdminSidebar.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building2,
  Megaphone,
  CheckSquare,
  MessageSquare,
  UserCog,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'דשבורד', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'לידים', icon: Users },
  { href: '/admin/properties', label: 'נכסים', icon: Building2 },
  { href: '/admin/campaigns', label: 'קמפיינים', icon: Megaphone },
  { href: '/admin/tasks', label: 'משימות', icon: CheckSquare },
  { href: '/admin/messages', label: 'הודעות', icon: MessageSquare },
  { href: '/admin/users', label: 'משתמשים', icon: UserCog },
  { href: '/admin/settings', label: 'הגדרות', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-brand-navy text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Image
          src="/logo.png"
          alt="TOPROP"
          width={100}
          height={33}
          className="brightness-0 invert"
        />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-gold text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/40 text-center">TOPROP Admin</p>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Create admin layout**

```tsx
// src/app/(admin)/layout.tsx
import { AdminSidebar } from '@/components/shared/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-brand-light p-8 overflow-auto">{children}</main>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Visit http://localhost:3000/admin — should show navy sidebar on the right (RTL) with nav items.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/AdminSidebar.tsx src/app/"(admin)"/layout.tsx
git commit -m "feat: add AdminSidebar and admin route group layout"
```

---

## Task 11: Skeleton pages — public + admin

**Files:**
- Create: all page.tsx skeletons (13 files)

- [ ] **Step 1: Create public skeleton pages**

```tsx
// src/app/(public)/page.tsx
export default function HomePage() {
  return <div className="p-8 text-center text-brand-navy">עמוד הבית — בקרוב</div>
}
```

```tsx
// src/app/(public)/owners/page.tsx
export default function OwnersPage() {
  return <div className="p-8 text-center text-brand-navy">בעלי נכסים — בקרוב</div>
}
```

```tsx
// src/app/(public)/seekers/page.tsx
export default function SeekersPage() {
  return <div className="p-8 text-center text-brand-navy">מחפשים נכס — בקרוב</div>
}
```

```tsx
// src/app/(public)/properties/page.tsx
export default function PropertiesPage() {
  return <div className="p-8 text-center text-brand-navy">נכסים — בקרוב</div>
}
```

```tsx
// src/app/(public)/property/[slug]/page.tsx
export default function PropertyPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-8 text-center text-brand-navy">
      נכס: {params.slug} — בקרוב
    </div>
  )
}
```

```tsx
// src/app/(public)/thank-you/page.tsx
export default function ThankYouPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-navy mb-4">תודה!</h1>
        <p className="text-gray-600">קיבלנו את פנייתך ונחזור אליך בהקדם.</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create admin skeleton pages**

```tsx
// src/app/(admin)/admin/page.tsx
export default function AdminDashboardPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">דשבורד</h1>
}
```

```tsx
// src/app/(admin)/admin/leads/page.tsx
export default function AdminLeadsPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">ניהול לידים</h1>
}
```

```tsx
// src/app/(admin)/admin/properties/page.tsx
export default function AdminPropertiesPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">ניהול נכסים</h1>
}
```

```tsx
// src/app/(admin)/admin/campaigns/page.tsx
export default function AdminCampaignsPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">קמפיינים</h1>
}
```

```tsx
// src/app/(admin)/admin/tasks/page.tsx
export default function AdminTasksPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">משימות</h1>
}
```

```tsx
// src/app/(admin)/admin/messages/page.tsx
export default function AdminMessagesPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">הודעות אוטומטיות</h1>
}
```

```tsx
// src/app/(admin)/admin/users/page.tsx
export default function AdminUsersPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">משתמשים והרשאות</h1>
}
```

```tsx
// src/app/(admin)/admin/settings/page.tsx
export default function AdminSettingsPage() {
  return <h1 className="text-2xl font-bold text-brand-navy">הגדרות</h1>
}
```

- [ ] **Step 3: Verify all routes in browser**

Visit each URL and confirm no 404s:
- http://localhost:3000/
- http://localhost:3000/owners
- http://localhost:3000/seekers
- http://localhost:3000/properties
- http://localhost:3000/property/test-slug
- http://localhost:3000/thank-you
- http://localhost:3000/admin
- http://localhost:3000/admin/leads
- http://localhost:3000/admin/properties

- [ ] **Step 4: Commit**

```bash
git add src/app/
git commit -m "feat: add skeleton pages for all public and admin routes"
```

---

## Task 12: PropertyCard component (TDD)

**Files:**
- Create: `__tests__/components/PropertyCard.test.tsx`
- Create: `src/components/shared/PropertyCard.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/PropertyCard.test.tsx
import { render, screen } from '@testing-library/react'
import { PropertyCard } from '@/components/shared/PropertyCard'
import type { Property } from '@/lib/types/property'

const mockProperty: Property = {
  id: 'abc-123',
  title: 'משרד במרכז תל אביב',
  slug: 'office-tel-aviv-123',
  type: 'office',
  deal_type: 'rent',
  city: 'תל אביב',
  area: 'מרכז',
  address: null,
  size_sqm: 150,
  floor: '3',
  price: 15000,
  price_visible: true,
  price_text: null,
  description: null,
  features: [],
  images: [],
  status: 'active',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

describe('PropertyCard', () => {
  it('renders property title', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('משרד במרכז תל אביב')).toBeInTheDocument()
  })

  it('renders city and area', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('תל אביב, מרכז')).toBeInTheDocument()
  })

  it('renders formatted price when visible', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText(/15,000/)).toBeInTheDocument()
  })

  it('renders "מחיר לפי פנייה" when price_visible is false', () => {
    render(<PropertyCard property={{ ...mockProperty, price_visible: false }} />)
    expect(screen.getByText('מחיר לפי פנייה')).toBeInTheDocument()
  })

  it('renders link to property page', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByRole('link', { name: /פרטים נוספים/ })).toHaveAttribute(
      'href',
      '/property/office-tel-aviv-123'
    )
  })
})
```

- [ ] **Step 2: Run test to confirm failure**

```bash
npm test -- __tests__/components/PropertyCard.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/shared/PropertyCard'`

- [ ] **Step 3: Implement PropertyCard**

```tsx
// src/components/shared/PropertyCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { PROPERTY_TYPE_LABELS, DEAL_TYPE_LABELS } from '@/lib/types/property'
import type { Property } from '@/lib/types/property'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-brand-light">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            אין תמונה
          </div>
        )}
        <Badge className="absolute top-3 end-3 bg-brand-navy text-white text-xs">
          {DEAL_TYPE_LABELS[property.deal_type]}
        </Badge>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-brand-navy border-brand-navy text-xs">
            {PROPERTY_TYPE_LABELS[property.type]}
          </Badge>
          <span className="text-brand-gold font-semibold text-sm">
            {formatPrice(property.price, property.price_visible, property.price_text)}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-1">{property.title}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {property.city}{property.area ? `, ${property.area}` : ''}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={14} />
            {property.size_sqm} מ"ר
          </span>
        </div>

        <Button asChild className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white">
          <Link href={`/property/${property.slug}`}>פרטים נוספים</Link>
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- __tests__/components/PropertyCard.test.tsx
```

Expected: PASS — 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/PropertyCard.tsx __tests__/components/PropertyCard.test.tsx
git commit -m "feat: add PropertyCard component with tests"
```

---

## Task 13: LeadForm + useLeadForm (TDD)

**Files:**
- Create: `__tests__/forms/LeadForm.test.tsx`
- Create: `src/hooks/useLeadForm.ts`
- Create: `src/components/forms/LeadForm.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/forms/LeadForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm } from '@/components/forms/LeadForm'

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

describe('LeadForm', () => {
  it('shows validation errors when submitting empty form', async () => {
    render(<LeadForm leadType="owner" />)
    fireEvent.click(screen.getByRole('button', { name: /שלח פנייה/ }))
    await waitFor(() => {
      expect(screen.getByText('שם מלא הוא שדה חובה')).toBeInTheDocument()
      expect(screen.getByText('טלפון הוא שדה חובה')).toBeInTheDocument()
    })
  })

  it('clears error when user starts typing', async () => {
    render(<LeadForm leadType="owner" />)
    fireEvent.click(screen.getByRole('button', { name: /שלח פנייה/ }))
    await waitFor(() => {
      expect(screen.getByText('שם מלא הוא שדה חובה')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByLabelText(/שם מלא/), { target: { value: 'ישראל' } })
    expect(screen.queryByText('שם מלא הוא שדה חובה')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm failure**

```bash
npm test -- __tests__/forms/LeadForm.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/forms/LeadForm'`

- [ ] **Step 3: Create useLeadForm hook**

```ts
// src/hooks/useLeadForm.ts
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { LeadType } from '@/lib/types/lead'

interface FormValues {
  full_name: string
  phone: string
  email: string
  message: string
}

interface FormErrors {
  full_name?: string
  phone?: string
}

interface UseLeadFormOptions {
  leadType: LeadType
  propertyId?: string
}

export function useLeadForm({ leadType, propertyId }: UseLeadFormOptions) {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>({
    full_name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!values.full_name.trim()) newErrors.full_name = 'שם מלא הוא שדה חובה'
    if (!values.phone.trim()) newErrors.phone = 'טלפון הוא שדה חובה'
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
      lead_type: leadType,
      property_id: propertyId ?? null,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      utm_source: utmParams.get('utm_source'),
      utm_medium: utmParams.get('utm_medium'),
      utm_campaign: utmParams.get('utm_campaign'),
      utm_content: utmParams.get('utm_content'),
      source: utmParams.get('source'),
    })

    setLoading(false)
    if (!error) router.push('/thank-you')
  }

  return { values, errors, loading, handleChange, handleSubmit }
}
```

- [ ] **Step 4: Create LeadForm component**

```tsx
// src/components/forms/LeadForm.tsx
'use client'

import { useLeadForm } from '@/hooks/useLeadForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { LeadType } from '@/lib/types/lead'

interface LeadFormProps {
  leadType: LeadType
  propertyId?: string
  className?: string
}

export function LeadForm({ leadType, propertyId, className }: LeadFormProps) {
  const { values, errors, loading, handleChange, handleSubmit } = useLeadForm({
    leadType,
    propertyId,
  })

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">שם מלא *</Label>
          <Input
            id="full_name"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            placeholder="ישראל ישראלי"
            className={errors.full_name ? 'border-red-500' : ''}
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs">{errors.full_name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">טלפון *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="05X-XXXXXXX"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">אימייל</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="israel@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">הודעה</Label>
          <Textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="ספר לנו על הנכס / מה אתה מחפש..."
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-3"
        >
          {loading ? 'שולח...' : 'שלח פנייה'}
        </Button>
      </div>
    </form>
  )
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
npm test -- __tests__/forms/LeadForm.test.tsx
```

Expected: PASS — 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useLeadForm.ts src/components/forms/LeadForm.tsx __tests__/forms/LeadForm.test.tsx
git commit -m "feat: add LeadForm and useLeadForm hook with validation tests"
```

---

## Task 14: Supabase SQL migration

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`

- [ ] **Step 1: Create migration file**

```sql
-- supabase/migrations/001_initial_schema.sql

-- Properties
CREATE TABLE IF NOT EXISTS properties (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  slug          text UNIQUE NOT NULL,
  type          text NOT NULL CHECK (type IN ('office','store','warehouse','industry','land','business')),
  deal_type     text NOT NULL CHECK (deal_type IN ('rent','sale','both')),
  city          text NOT NULL,
  area          text,
  address       text,
  size_sqm      numeric NOT NULL,
  floor         text,
  price         numeric,
  price_visible boolean DEFAULT true,
  price_text    text,
  description   text,
  features      text[] DEFAULT '{}',
  images        text[] DEFAULT '{}',
  status        text DEFAULT 'active' CHECK (status IN ('active','inactive','rented','sold')),
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id            bigserial PRIMARY KEY,
  full_name     text NOT NULL,
  phone         text NOT NULL,
  email         text,
  lead_type     text NOT NULL CHECK (lead_type IN ('owner','seeker','property_interest')),
  property_id   uuid REFERENCES properties(id) ON DELETE SET NULL,
  city          text,
  property_type text,
  size_needed   text,
  budget        text,
  message       text,
  source        text,
  page_url      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  status        text DEFAULT 'חדש',
  notes         text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

- [ ] **Step 2: Run migration in Supabase**

1. Go to https://supabase.com → create new project (name: `toprop`, region: closest to Israel e.g. `eu-central-1`)
2. Wait for project to provision
3. Go to **SQL Editor** → paste the entire SQL above → click **Run**
4. Verify: go to **Table Editor** — should see `properties` and `leads` tables

- [ ] **Step 3: Create storage buckets**

In Supabase dashboard → **Storage** → **New bucket**:
- Name: `property-images`, Public: ✅
- Name: `assets`, Public: ✅

- [ ] **Step 4: Commit migration file**

```bash
git add supabase/
git commit -m "feat: add initial Supabase schema for properties and leads"
```

---

## Task 15: Environment setup + final build verification

**Files:**
- Create: `.env.local`
- Create: `.env.example`

- [ ] **Step 1: Create .env.example**

```bash
# .env.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 2: Create .env.local with real values**

In Supabase dashboard → **Project Settings** → **API**:
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY`

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 3: Add .env.local to .gitignore**

Verify `.gitignore` contains `.env.local` (create-next-app adds this by default).

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all tests pass (utils + PropertyCard + LeadForm).

- [ ] **Step 5: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 6: Smoke test the dev server**

```bash
npm run dev
```

Visit and verify:
- [ ] http://localhost:3000 — home with header + footer, RTL, Heebo font
- [ ] http://localhost:3000/owners — header + footer visible
- [ ] http://localhost:3000/admin — sidebar visible, navy background
- [ ] http://localhost:3000/admin/leads — sidebar with "לידים" highlighted

- [ ] **Step 7: Final commit**

```bash
git add .env.example
git commit -m "feat: foundation 1A complete — RTL design system, Supabase schema, shadcn/ui, skeleton layouts"
```

---

## Success Criteria Checklist

- [ ] `npm run dev` starts without errors
- [ ] All 15 routes resolve (no 404s)
- [ ] RTL layout confirmed in browser (text flows right-to-left)
- [ ] Heebo font applied (check DevTools → Computed → font-family)
- [ ] Navy + gold brand colors visible in header and sidebar
- [ ] Admin sidebar highlights active route
- [ ] All tests pass (`npm test`)
- [ ] Production build passes (`npm run build`)
- [ ] Supabase `properties` and `leads` tables exist in dashboard
