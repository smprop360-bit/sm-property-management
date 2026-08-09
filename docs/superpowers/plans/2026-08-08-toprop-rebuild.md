# TOPROP Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** בניית אתר TOPROP לידים מחדש — ניקוי, עיצוב נכון, דף בית מלא, ויזארד Property 360, עמודי שירות, עמודים תומכים.

**Architecture:** Next.js 16 App Router, Server Components כברירת מחדל, Client Components רק לאינטראקציה. טפסים דרך Server Actions עם שמירה ב-Supabase. כל עמוד פאבלי נמצא ב-`src/app/(public)/`.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, Supabase, Heebo + Frank Ruhl Libre

**Spec:** `docs/superpowers/specs/2026-08-08-toprop-rebuild-design.md`

---

## PHASE 0 — ניקוי ותיקוני עיצוב

### Task 1: מחיקת עמודים וקומפוננטים לא רלוונטיים

**Files to delete:**
- `src/app/(public)/owners/page.tsx`
- `src/app/(public)/seekers/page.tsx`
- `src/app/(public)/properties/page.tsx` (ותיקייה שלמה)
- `src/app/(public)/property/` (תיקייה שלמה)
- `src/app/(public)/lp/bnei-brak/page.tsx`
- `src/app/(public)/lp/metropark/page.tsx`
- `src/components/forms/SeekerLeadForm.tsx`
- `src/components/public/PropertiesFilters.tsx`
- `src/components/public/PropertyContactForm.tsx`
- `src/components/shared/PropertyCard.tsx`
- `src/hooks/useSeekerLeadForm.ts`
- `src/hooks/usePropertyContactForm.ts`

- [ ] **Step 1: מחק את הקבצים**

```powershell
Remove-Item -Recurse -Force "src\app\(public)\owners"
Remove-Item -Recurse -Force "src\app\(public)\seekers"
Remove-Item -Recurse -Force "src\app\(public)\properties"
Remove-Item -Recurse -Force "src\app\(public)\property"
Remove-Item -Recurse -Force "src\app\(public)\lp\bnei-brak"
Remove-Item -Recurse -Force "src\app\(public)\lp\metropark"
Remove-Item -Force "src\components\forms\SeekerLeadForm.tsx"
Remove-Item -Force "src\components\public\PropertiesFilters.tsx"
Remove-Item -Force "src\components\public\PropertyContactForm.tsx"
Remove-Item -Force "src\components\shared\PropertyCard.tsx"
Remove-Item -Force "src\hooks\useSeekerLeadForm.ts"
Remove-Item -Force "src\hooks\usePropertyContactForm.ts"
```

- [ ] **Step 2: ודא שה-build עובר**

```bash
npm run build
```
Expected: שגיאות על imports שבורים — תקן אותם ב-Task הבא.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove legacy property-listing pages and components"
```

---

### Task 2: עדכון צבעי brand ב-globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: עדכן את ה-`@theme` block**

מצא את הבלוק:
```css
@theme {
  --color-brand-navy: #1B2B5E;
  --color-brand-gold: #C9A227;
  --color-brand-light: #F8F9FA;
  --font-sans: var(--font-heebo), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-frank), var(--font-heebo), ui-sans-serif, system-ui, sans-serif;
}
```

החלף ב:
```css
@theme {
  --color-navy: #08274F;
  --color-navy-dark: #051A34;
  --color-gold: #C8902E;
  --color-gold-soft: #D9AE55;
  --color-surface: #F7F8FA;
  --color-brand-text: #0B1F36;
  --color-brand-muted: #687386;
  /* backward compat */
  --color-brand-navy: #08274F;
  --color-brand-gold: #C8902E;
  --color-brand-light: #F7F8FA;
  --font-sans: var(--font-heebo), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-frank), var(--font-heebo), ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: update brand color tokens to spec (navy #08274F, gold #C8902E)"
```

---

### Task 3: עדכון מטא-דאטה ב-layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: קרא את הקובץ**

```bash
cat src/app/layout.tsx
```

- [ ] **Step 2: עדכן את ה-metadata**

מצא את אובייקט `metadata` ועדכן:
```typescript
export const metadata: Metadata = {
  title: {
    default: 'TOPROP | ניהול נכסים, השכרה והשקעות',
    template: '%s | TOPROP',
  },
  description: 'TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים. שירות מלא לבעלי נכסים ומשקיעים.',
  metadataBase: new URL('https://toprop.co.il'),
  openGraph: {
    siteName: 'TOPROP',
    locale: 'he_IL',
    type: 'website',
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: update site metadata to TOPROP property management"
```

---

### Task 4: כתיבת PublicHeader מחדש

**Files:**
- Modify: `src/components/shared/PublicHeader.tsx`

- [ ] **Step 1: כתוב את הקומפוננט**

```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'ראשי' },
  { href: '/property-management', label: 'ניהול נכסים' },
  { href: '/airbnb-management', label: 'Airbnb' },
  { href: '/commercial-property-management', label: 'מסחרי' },
  { href: '/investors', label: 'למשקיעים' },
  { href: '/how-it-works', label: 'איך זה עובד' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading font-bold text-2xl text-navy">TOPROP</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-brand-text hover:text-navy font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm text-brand-muted hover:text-navy transition-colors"
            >
              כניסת בעלי נכסים
            </Link>
            <Link
              href="/property-360"
              className="bg-gold hover:bg-gold-soft text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              בדיקת הנכס שלי
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-brand-text hover:text-navy font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/property-360"
            className="bg-gold text-white text-center font-semibold px-4 py-3 rounded-lg mt-2"
            onClick={() => setMobileOpen(false)}
          >
            בדיקת הנכס שלי
          </Link>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: ודא build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/PublicHeader.tsx
git commit -m "feat: rebuild PublicHeader with TOPROP nav and gold CTA"
```

---

### Task 5: כתיבת PublicFooter מחדש

**Files:**
- Modify: `src/components/shared/PublicFooter.tsx`

- [ ] **Step 1: כתוב את הקומפוננט**

```typescript
import Link from 'next/link';

const serviceLinks = [
  { href: '/property-management', label: 'ניהול נכסים' },
  { href: '/commercial-property-management', label: 'ניהול נכסים מסחריים' },
  { href: '/airbnb-management', label: 'Airbnb / Short Term' },
  { href: '/investors', label: 'למשקיעים' },
  { href: '/property-360', label: 'Property 360' },
];

const companyLinks = [
  { href: '/about', label: 'אודות' },
  { href: '/how-it-works', label: 'איך זה עובד' },
  { href: '/pricing', label: 'מחירון' },
  { href: '/blog', label: 'מאמרים' },
  { href: '/contact', label: 'צור קשר' },
];

export default function PublicFooter() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-heading font-bold text-2xl text-white">TOPROP</span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              ניהול נכסים • השכרה • השקעות
            </p>
            <p className="mt-2 text-xs text-gray-500">
              מנהלים את הנכס. ממקסמים את ההשקעה.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">שירותים</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">החברה</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">צור קשר</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="tel:+972552601077" className="hover:text-gold transition-colors">
                  +972 55 260-1077
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/972552601077"
                  className="hover:text-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/property-360" className="bg-gold hover:bg-gold-soft text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors inline-block mt-2">
                  בדיקת הנכס שלי
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TOPROP. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <Link href="/en" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/PublicFooter.tsx
git commit -m "feat: rebuild PublicFooter with TOPROP brand and service links"
```

---

## PHASE 1 — דף הבית

### Task 6: יצירת תיקיית home/ וסקשן Hero

**Files:**
- Create: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: צור תיקייה**

```bash
mkdir -p src/components/home
```

- [ ] **Step 2: כתוב HeroSection**

```typescript
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-navy text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          הנכס שלך צריך לעבוד בשבילך.
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-4">
          TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים, עם שירות מלא לבעלי נכסים
          ומשקיעים – משלב בחירת אסטרטגיית ההשכרה ועד לניהול השוטף.
        </p>
        <p className="text-sm text-white/50 mb-10 tracking-wide">
          ניהול לטווח ארוך&nbsp;•&nbsp;Airbnb&nbsp;•&nbsp;מסחרי&nbsp;•&nbsp;השבחה&nbsp;•&nbsp;שותפויות
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/property-360"
            className="bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            בדיקת הנכס שלי
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/50 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            דברו איתנו
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat: add HeroSection component"
```

---

### Task 7: ServicesSection

**Files:**
- Create: `src/components/home/ServicesSection.tsx`

- [ ] **Step 1: כתוב ServicesSection**

```typescript
import Link from 'next/link';
import { Building2, Waves, Briefcase, TrendingUp, Handshake } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'ניהול לטווח ארוך',
    body: 'ניהול שוטף מקצועי של נכסים למגורים — שוכרים, חוזים, תחזוקה ודוחות.',
    href: '/property-management',
  },
  {
    icon: Waves,
    title: 'Airbnb / Short Term',
    body: 'בדיקת כדאיות ראשית, ואז ניהול מלא של השכרת נופש בתפוסה מקסימלית.',
    href: '/airbnb-management',
  },
  {
    icon: Briefcase,
    title: 'נכסים מסחריים',
    body: 'ניהול משרדים, חנויות ומחסנים עם חשיבה עסקית ורווחיות.',
    href: '/commercial-property-management',
  },
  {
    icon: TrendingUp,
    title: 'השבחה',
    body: 'זיהוי פוטנציאל השבחה, תכנון ובצוע פרויקטים להגדלת ערך הנכס.',
    href: '/investors',
  },
  {
    icon: Handshake,
    title: 'שותפויות והשקעות',
    body: 'מסלולי שותפות ייחודיים למשקיעים המחפשים ניהול עם מעורבות.',
    href: '/investors',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
          איך הנכס שלך צריך לעבוד?
        </h2>
        <p className="text-brand-muted text-center mb-12 text-lg">בחרו את המסלול המתאים לכם</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href + s.title}
                href={s.href}
                className="group bg-surface hover:bg-white border border-gray-100 hover:border-gold/30 hover:shadow-md rounded-2xl p-6 transition-all flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center transition-colors">
                  <Icon size={24} className="text-navy group-hover:text-gold transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-base mb-1">{s.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{s.body}</p>
                </div>
                <span className="text-gold text-sm font-medium mt-auto">קראו עוד ←</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/ServicesSection.tsx
git commit -m "feat: add ServicesSection with 5 service cards"
```

---

### Task 8: Property360Section

**Files:**
- Create: `src/components/home/Property360Section.tsx`

- [ ] **Step 1: כתוב Property360Section**

```typescript
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const points = [
  'השוואת שכירות ארוכת טווח מול Short-Term',
  'בדיקת פוטנציאל השבחה',
  'בדיקת התאמה לניהול מלא',
  'בדיקת התאמה לשותפות',
  'המלצה על מסלול פעולה',
];

export default function Property360Section() {
  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider">
              PROPERTY 360
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-3">
            TOPROP Property 360
          </h2>
          <p className="text-brand-muted text-lg mb-8">
            לא בטוחים מה הדרך הנכונה להשכיר או להפעיל את הנכס?
          </p>
          <ul className="space-y-4 mb-10">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-brand-text">{p}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/property-360"
            className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            קבלו בדיקת Property 360
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Property360Section.tsx
git commit -m "feat: add Property360Section"
```

---

### Task 9: WhyTopropSection

**Files:**
- Create: `src/components/home/WhyTopropSection.tsx`

- [ ] **Step 1: כתוב WhyTopropSection**

```typescript
import { Eye, Calculator, MapPin, Award, BarChart3 } from 'lucide-react';

const items = [
  {
    icon: Eye,
    title: 'שקיפות מלאה',
    body: 'דוחות חודשיים, הודעות בזמן אמת וגישה מלאה לכל מה שקורה בנכס.',
  },
  {
    icon: Calculator,
    title: 'חשיבה כלכלית',
    body: 'אנחנו לא רק מנהלים — אנחנו בוחנים כיצד למקסם את הרווחיות של הנכס.',
  },
  {
    icon: MapPin,
    title: 'כתובת אחת',
    body: 'כל הנושאים — שוכרים, ספקים, תיקונים, חוזים — מטופלים דרכנו.',
  },
  {
    icon: Award,
    title: 'ניהול מקצועי',
    body: 'צוות מנוסה עם גישה שיטתית לכל היבט של ניהול הנכס.',
  },
  {
    icon: BarChart3,
    title: 'טכנולוגיה ודיווח',
    body: 'מערכת דיגיטלית עם דוחות, מעקב הכנסות ועדכונים שוטפים.',
  },
];

export default function WhyTopropSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
          לא רק מנהלים את הנכס. מנהלים את ההשקעה.
        </h2>
        <p className="text-brand-muted text-center text-lg mb-12">
          הגישה שלנו שונה — ואנחנו רוצים שתרגישו את זה
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/WhyTopropSection.tsx
git commit -m "feat: add WhyTopropSection"
```

---

### Task 10: OwnerPortalPreview

**Files:**
- Create: `src/components/home/OwnerPortalPreview.tsx`

- [ ] **Step 1: כתוב OwnerPortalPreview**

```typescript
const kpis = [
  { label: 'נכסים מנוהלים', value: '3', unit: '' },
  { label: 'הכנסה חודשית', value: '12,400', unit: '₪' },
  { label: 'תפוסה ממוצעת', value: '97', unit: '%' },
  { label: 'תקלות פתוחות', value: '1', unit: '' },
  { label: 'חוזים לחידוש', value: '2', unit: '' },
];

export default function OwnerPortalPreview() {
  return (
    <section className="bg-navy-dark text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
          בעל הנכס רואה הכול.
        </h2>
        <p className="text-white/60 text-lg mb-12">
          גם כשאנחנו מנהלים — אתם תמיד בשליטה.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <div className="text-2xl font-bold text-gold mb-1">
                {kpi.value}{kpi.unit}
              </div>
              <div className="text-xs text-white/50">{kpi.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/30">* נתוני הדגמה בלבד</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/OwnerPortalPreview.tsx
git commit -m "feat: add OwnerPortalPreview with demo KPIs"
```

---

### Task 11: HowItWorksSection

**Files:**
- Create: `src/components/home/HowItWorksSection.tsx`

- [ ] **Step 1: כתוב HowItWorksSection**

```typescript
const steps = [
  { n: 1, title: 'מספרים לנו על הנכס', body: 'ממלאים טופס קצר עם פרטי הנכס ומצבו הנוכחי.' },
  { n: 2, title: 'Property Review', body: 'אנחנו בוחנים את הנכס ומכינים המלצת מסלול.' },
  { n: 3, title: 'בוחרים מסלול', body: 'ארוך טווח, Airbnb, מסחרי, השבחה — ביחד מחליטים.' },
  { n: 4, title: 'קליטה למערכת', body: 'הנכס נכנס למערכת, חוזים, מפתחות ואנשי קשר.' },
  { n: 5, title: 'TOPROP מנהלת', body: 'אנחנו מטפלים בכל — שוכרים, ספקים, תחזוקה.' },
  { n: 6, title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים ועדכונים שוטפים.' },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy text-center mb-4">
          איך זה עובד?
        </h2>
        <p className="text-brand-muted text-center text-lg mb-14">
          תהליך ברור, פשוט ומובנה
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">{s.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/HowItWorksSection.tsx
git commit -m "feat: add HowItWorksSection with 6 steps"
```

---

### Task 12: OverseasSection + CommercialSection + AirbnbSection

**Files:**
- Create: `src/components/home/OverseasSection.tsx`
- Create: `src/components/home/CommercialAirbnbSection.tsx`

- [ ] **Step 1: כתוב OverseasSection**

```typescript
import Link from 'next/link';

export default function OverseasSection() {
  return (
    <section className="bg-navy py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
          הנכס בישראל. אתם יכולים להיות בכל מקום בעולם.
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          ניהול מקומי לבעלי נכסים שאינם נמצאים בישראל — שוכרים, ספקים, חוזים, ביקורים ודוחות.
        </p>
        <Link
          href="/property-management"
          className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors"
        >
          ניהול נכס מרחוק
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: כתוב CommercialAirbnbSection**

```typescript
import Link from 'next/link';

export default function CommercialAirbnbSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface rounded-3xl p-8 sm:p-10 flex flex-col gap-4">
          <span className="text-xs font-bold text-gold tracking-widest uppercase">מסחרי</span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
            נכס מסחרי צריך מנהל שחושב עסקית.
          </h3>
          <p className="text-brand-muted leading-relaxed">
            ניהול משרדים, חנויות ומחסנים עם מיקוד ברווחיות, יציבות שוכרים וחוזים איכותיים.
          </p>
          <Link
            href="/commercial-property-management"
            className="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors mt-auto w-fit"
          >
            ניהול נכס מסחרי
          </Link>
        </div>

        <div className="bg-surface rounded-3xl p-8 sm:p-10 flex flex-col gap-4">
          <span className="text-xs font-bold text-gold tracking-widest uppercase">Airbnb</span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
            Airbnb או שכירות רגילה? קודם בודקים מה באמת משתלם.
          </h3>
          <p className="text-brand-muted leading-relaxed">
            לפני שמחליטים, אנחנו בוחנים את הפוטנציאל האמיתי של הנכס לשכירות נופש.
          </p>
          <Link
            href="/airbnb-management"
            className="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors mt-auto w-fit"
          >
            בדיקת כדאיות Airbnb
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/OverseasSection.tsx src/components/home/CommercialAirbnbSection.tsx
git commit -m "feat: add OverseasSection and CommercialAirbnbSection"
```

---

### Task 13: FinalCtaSection

**Files:**
- Create: `src/components/home/FinalCtaSection.tsx`

- [ ] **Step 1: כתוב FinalCtaSection**

```typescript
import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="bg-gold py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
          רוצים לדעת מה הנכס שלכם יכול לעשות יותר טוב?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/property-360"
            className="bg-navy hover:bg-navy-dark text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            בדיקת הנכס שלי
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/60 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            דברו איתנו
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/FinalCtaSection.tsx
git commit -m "feat: add FinalCtaSection"
```

---

### Task 14: הרכבת דף הבית

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: כתוב את דף הבית**

```typescript
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import Property360Section from '@/components/home/Property360Section';
import WhyTopropSection from '@/components/home/WhyTopropSection';
import OwnerPortalPreview from '@/components/home/OwnerPortalPreview';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import OverseasSection from '@/components/home/OverseasSection';
import CommercialAirbnbSection from '@/components/home/CommercialAirbnbSection';
import FinalCtaSection from '@/components/home/FinalCtaSection';

export const metadata = {
  title: 'TOPROP | ניהול נכסים, השכרה והשקעות',
  description:
    'TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים. בדקו את הנכס שלכם עם Property 360.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Property360Section />
      <WhyTopropSection />
      <OwnerPortalPreview />
      <HowItWorksSection />
      <OverseasSection />
      <CommercialAirbnbSection />
      <FinalCtaSection />
    </>
  );
}
```

- [ ] **Step 2: הרץ build**

```bash
npm run build 2>&1 | tail -30
```
Expected: ✓ Compiled successfully

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## PHASE 2 — Property 360 ויזארד

### Task 15: Server Action לשמירת ליד

**Files:**
- Create: `src/app/actions/property360.ts`

- [ ] **Step 1: צור תיקייה ו-action**

```bash
mkdir -p src/app/actions
```

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type Property360Data = {
  property_type: string;
  city: string;
  address: string;
  area_sqm: string;
  rooms: string;
  floor: string;
  parking: boolean;
  elevator: boolean;
  balcony: boolean;
  status: string;
  current_monthly_rent: string;
  interests: string[];
  full_name: string;
  phone: string;
  email: string;
  consent: boolean;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export async function submitProperty360(data: Property360Data) {
  const supabase = await createClient();

  const { error } = await supabase.from('leads').insert({
    full_name: data.full_name,
    phone: data.phone,
    email: data.email,
    source: 'property360',
    utm_source: data.utm_source ?? null,
    utm_campaign: data.utm_campaign ?? null,
    utm_content: data.utm_content ?? null,
    property_type: data.property_type,
    city: data.city,
    address: data.address,
    area_sqm: data.area_sqm ? parseInt(data.area_sqm) : null,
    current_rent: data.current_monthly_rent ? parseInt(data.current_monthly_rent) : null,
    interest: data.interests.join(', '),
    status: 'NEW',
  });

  if (error) {
    console.error('property360 insert error:', error);
    throw new Error('שגיאה בשמירת הפרטים. נסו שוב.');
  }

  redirect('/thank-you');
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/actions/property360.ts
git commit -m "feat: add property360 server action with Supabase insert"
```

---

### Task 16: WizardShell — מעטפת הויזארד

**Files:**
- Create: `src/components/property-360/WizardShell.tsx`

- [ ] **Step 1: כתוב WizardShell**

```typescript
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
      {/* Progress */}
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

      {/* Steps */}
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
```

- [ ] **Step 2: צור תיקיית steps**

```bash
mkdir -p src/components/property-360/steps
```

- [ ] **Step 3: Commit**

```bash
git add src/components/property-360/WizardShell.tsx
git commit -m "feat: add WizardShell with 7-step navigation and progress bar"
```

---

### Task 17: שלבי הויזארד 1-4

**Files:**
- Create: `src/components/property-360/steps/Step1PropertyType.tsx`
- Create: `src/components/property-360/steps/Step2Location.tsx`
- Create: `src/components/property-360/steps/Step3Details.tsx`
- Create: `src/components/property-360/steps/Step4Status.tsx`

- [ ] **Step 1: Step1PropertyType**

```typescript
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
            className={`border-2 rounded-xl py-4 px-3 text-center font-medium transition-all ${
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
```

- [ ] **Step 2: Step2Location**

```typescript
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
```

- [ ] **Step 3: Step3Details**

```typescript
import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

export default function Step3Details({ data, update, next, back }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">פרטי הנכס</h2>
      <p className="text-brand-muted mb-8">מידע על הנכס</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { key: 'area_sqm', label: 'שטח (מ"ר)', placeholder: '80' },
          { key: 'rooms', label: 'חדרים', placeholder: '3' },
          { key: 'floor', label: 'קומה', placeholder: '2' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-navy mb-1">{label}</label>
            <input
              type="number"
              value={data[key as keyof Property360Data] as string}
              onChange={(e) => update({ [key]: e.target.value } as Partial<Property360Data>)}
              placeholder={placeholder}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-6 mb-8">
        {[
          { key: 'parking', label: 'חניה' },
          { key: 'elevator', label: 'מעלית' },
          { key: 'balcony', label: 'מרפסת' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data[key as keyof Property360Data] as boolean}
              onChange={(e) => update({ [key]: e.target.checked } as Partial<Property360Data>)}
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
```

- [ ] **Step 4: Step4Status**

```typescript
import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

const statuses = [
  { value: 'rented', label: 'מושכר כרגע' },
  { value: 'vacant', label: 'פנוי' },
  { value: 'tenant_leaving', label: 'השוכר עוזב בקרוב' },
  { value: 'renovation', label: 'בשיפוץ' },
];

export default function Step4Status({ data, update, next, back }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">מצב הנכס</h2>
      <p className="text-brand-muted mb-8">מהו מצב הנכס כיום?</p>
      <div className="flex flex-col gap-3 mb-8">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => update({ status: s.value })}
            className={`border-2 rounded-xl py-4 px-5 text-right font-medium transition-all ${
              data.status === s.value
                ? 'border-gold bg-gold/5 text-navy'
                : 'border-gray-200 text-brand-muted hover:border-gold/50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={next}
          disabled={!data.status}
          className="flex-1 bg-navy disabled:opacity-40 hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors"
        >
          המשך
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/property-360/steps/
git commit -m "feat: add wizard steps 1-4 (property type, location, details, status)"
```

---

### Task 18: שלבי הויזארד 5-7

**Files:**
- Create: `src/components/property-360/steps/Step5Income.tsx`
- Create: `src/components/property-360/steps/Step6Interest.tsx`
- Create: `src/components/property-360/steps/Step7Contact.tsx`

- [ ] **Step 1: Step5Income**

```typescript
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
```

- [ ] **Step 2: Step6Interest**

```typescript
import type { Property360Data } from '@/app/actions/property360';

type Props = {
  data: Property360Data;
  update: (patch: Partial<Property360Data>) => void;
  next: () => void;
  back: () => void;
};

const interests = [
  { value: 'management', label: 'ניהול שוטף' },
  { value: 'long_term_rental', label: 'השכרה לטווח ארוך' },
  { value: 'airbnb', label: 'Airbnb / Short Term' },
  { value: 'improvement', label: 'השבחת הנכס' },
  { value: 'partnership', label: 'שותפות עם TOPROP' },
  { value: 'not_sure', label: 'לא בטוח — רוצה ייעוץ' },
];

export default function Step6Interest({ data, update, next, back }: Props) {
  const toggle = (value: string) => {
    const current = data.interests;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update({ interests: updated });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">מה מעניין אותך?</h2>
      <p className="text-brand-muted mb-8">ניתן לבחור יותר מאפשרות אחת</p>
      <div className="flex flex-col gap-3 mb-8">
        {interests.map((i) => (
          <button
            key={i.value}
            onClick={() => toggle(i.value)}
            className={`border-2 rounded-xl py-4 px-5 text-right font-medium transition-all ${
              data.interests.includes(i.value)
                ? 'border-gold bg-gold/5 text-navy'
                : 'border-gray-200 text-brand-muted hover:border-gold/50'
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors">חזרה</button>
        <button
          onClick={next}
          disabled={data.interests.length === 0}
          className="flex-1 bg-navy disabled:opacity-40 hover:bg-navy-dark text-white font-semibold py-4 rounded-xl transition-colors"
        >
          המשך
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Step7Contact**

```typescript
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
        <button onClick={back} className="flex-1 border border-gray-200 text-brand-muted py-4 rounded-xl hover:border-navy transition-colors" disabled={loading}>חזרה</button>
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
```

- [ ] **Step 4: Commit**

```bash
git add src/components/property-360/steps/
git commit -m "feat: add wizard steps 5-7 (income, interests, contact)"
```

---

### Task 19: עמוד property-360

**Files:**
- Create: `src/app/(public)/property-360/page.tsx`

- [ ] **Step 1: כתוב את העמוד**

```typescript
import WizardShell from '@/components/property-360/WizardShell';

export const metadata = {
  title: 'Property 360 | TOPROP',
  description: 'בדיקת הנכס שלך — השוואת מסלולים, פוטנציאל השבחה והמלצת פעולה.',
};

export default function Property360Page() {
  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-2xl mx-auto px-4 mb-8 text-center">
        <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider">
          PROPERTY 360
        </span>
        <h1 className="font-heading text-3xl font-bold text-navy mt-4 mb-2">
          בדיקת הנכס שלי
        </h1>
        <p className="text-brand-muted">
          כמה שאלות קצרות ונחזור אליכם עם המלצה מותאמת אישית
        </p>
      </div>
      <WizardShell />
    </div>
  );
}
```

- [ ] **Step 2: ודא build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/property-360/page.tsx
git commit -m "feat: add Property 360 wizard page"
```

---

### Task 20: עדכון thank-you page

**Files:**
- Modify: `src/app/(public)/thank-you/page.tsx`

- [ ] **Step 1: כתוב דף תודה**

```typescript
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'תודה! | TOPROP',
  description: 'קיבלנו את הפרטים שלך ונחזור אליך בקרוב.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <CheckCircle2 size={56} className="text-gold mx-auto mb-6" />
        <h1 className="font-heading text-3xl font-bold text-navy mb-3">תודה!</h1>
        <p className="text-brand-muted text-lg mb-2">קיבלנו את הפרטים שלכם.</p>
        <p className="text-brand-muted mb-8">נחזור אליכם תוך יום עסקים אחד לתיאום שיחה.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/972552601077"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            המשיכו ב-WhatsApp
          </a>
          <Link
            href="/"
            className="border border-gray-200 text-brand-muted hover:border-navy hover:text-navy font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            חזרה לאתר
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(public)/thank-you/page.tsx
git commit -m "feat: update thank-you page with WhatsApp CTA"
```

---

## PHASE 3 — עמודי שירות

### Task 21: קומפוננט ServicePageTemplate (משותף לכל עמודי שירות)

**Files:**
- Create: `src/components/services/ServicePageTemplate.tsx`

- [ ] **Step 1: כתוב ServicePageTemplate**

```typescript
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

type ServicePageTemplateProps = {
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ServicePageTemplate({
  badge,
  title,
  subtitle,
  body,
  features,
  ctaLabel = 'בדיקת הנכס שלי',
  ctaHref = '/property-360',
}: ServicePageTemplateProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-4 inline-block">
            {badge}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-white/70 text-xl">{subtitle}</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-text text-lg leading-relaxed mb-12">{body}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-surface rounded-xl p-4">
                <CheckCircle2 size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-brand-text">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaHref}
              className="bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors text-center"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors text-center"
            >
              דברו איתנו
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services/ServicePageTemplate.tsx
git commit -m "feat: add ServicePageTemplate reusable component"
```

---

### Task 22: 4 עמודי שירות

**Files:**
- Create: `src/app/(public)/property-management/page.tsx`
- Create: `src/app/(public)/commercial-property-management/page.tsx`
- Create: `src/app/(public)/airbnb-management/page.tsx`
- Create: `src/app/(public)/investors/page.tsx`

- [ ] **Step 1: property-management/page.tsx**

```typescript
import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'ניהול נכסים | TOPROP',
  description: 'ניהול מקצועי של נכסי מגורים לטווח ארוך — שוכרים, חוזים, תחזוקה ודוחות.',
};

export default function PropertyManagementPage() {
  return (
    <ServicePageTemplate
      badge="ניהול נכסים"
      title="ניהול נכסים לטווח ארוך"
      subtitle="שוכרים איכותיים, חוזים מסודרים, תחזוקה שוטפת — ואתם פנויים."
      body="TOPROP מנהלת את הנכס שלכם מקצה לקצה. אנחנו אחראים על מציאת שוכרים, ניהול חוזים, גביית שכירות, תחזוקה שוטפת, טיפול בתקלות ודיווח חודשי שקוף."
      features={[
        'מציאת שוכרים מאומתים',
        'ניסוח וניהול חוזי שכירות',
        'גביית שכירות ודיווח חודשי',
        'טיפול בתחזוקה ותקלות',
        'ניהול עבור בעלים מחו"ל',
        'שקיפות מלאה בכל שלב',
      ]}
    />
  );
}
```

- [ ] **Step 2: commercial-property-management/page.tsx**

```typescript
import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'ניהול נכסים מסחריים | TOPROP',
  description: 'ניהול מקצועי של משרדים, חנויות ומחסנים עם חשיבה עסקית.',
};

export default function CommercialPropertyManagementPage() {
  return (
    <ServicePageTemplate
      badge="מסחרי"
      title="ניהול נכסים מסחריים"
      subtitle="משרדים, חנויות ומחסנים — מנוהלים עם מיקוד ברווחיות."
      body="ניהול נכס מסחרי שונה מניהול דירת מגורים. TOPROP מתמחה בהבנת הצרכים העסקיים של בעלי נכסים מסחריים, תוך שמירה על שוכרים איכותיים ויציבות הכנסה."
      features={[
        'השכרת נכסים מסחריים',
        'ניהול חוזים מסחריים מורכבים',
        'תחזוקה ותיקונים שוטפים',
        'ניהול ספקים וקבלנים',
        'דוחות הכנסות ורווחיות',
        'ייעוץ לשיפור תפוסה',
      ]}
    />
  );
}
```

- [ ] **Step 3: airbnb-management/page.tsx**

```typescript
import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'ניהול Airbnb | TOPROP',
  description: 'בדיקת כדאיות ראשית וניהול מלא של השכרת נופש בתפוסה מקסימלית.',
};

export default function AirbnbManagementPage() {
  return (
    <ServicePageTemplate
      badge="Airbnb / Short Term"
      title="ניהול Airbnb ושכירות קצרת טווח"
      subtitle="קודם בודקים אם זה משתלם. אחר כך מנהלים מקצועית."
      body="לפני שמחליטים על Airbnb, TOPROP בוחנת את הפוטנציאל האמיתי של הנכס — מיקום, ביקוש, תחרות ורווחיות צפויה. רק אחר כך מציעים ניהול מלא."
      features={[
        'בדיקת כדאיות לפני הכל',
        'ניהול תפעולי מלא',
        'אירוח, קבלת אורחים, ניקיון',
        'תמחור דינמי ואופטימיזציה',
        'ניהול ביקורות ותגובות',
        'דוחות הכנסה חודשיים',
      ]}
      ctaLabel="בדיקת כדאיות Airbnb"
    />
  );
}
```

- [ ] **Step 4: investors/page.tsx**

```typescript
import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'למשקיעים | TOPROP',
  description: 'Property 360, השבחת נכסים, שותפויות וניהול פורטפוליו.',
};

export default function InvestorsPage() {
  return (
    <ServicePageTemplate
      badge="למשקיעים"
      title="ניהול נכסים למשקיעים"
      subtitle="לא רק מנהלים — מייצרים תשואה."
      body="TOPROP עובדת עם משקיעים פרטיים ומוסדיים לניהול פורטפוליו נכסים, זיהוי פוטנציאל השבחה וקידום שותפויות אסטרטגיות."
      features={[
        'ניהול פורטפוליו נכסים',
        'Property 360 — בחינת מסלול מיטבי',
        'ניתוח פוטנציאל השבחה',
        'מסלולי שותפות מותאמים',
        'דוחות תשואה מפורטים',
        'ייעוץ לרכישה ומכירה',
      ]}
      ctaLabel="קבלו בדיקת Property 360"
    />
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/property-management/ src/app/(public)/commercial-property-management/ src/app/(public)/airbnb-management/ src/app/(public)/investors/
git commit -m "feat: add 4 service pages using ServicePageTemplate"
```

---

## PHASE 4 — עמודים תומכים

### Task 23: pricing, how-it-works, about, contact

**Files:**
- Create: `src/app/(public)/pricing/page.tsx`
- Create: `src/app/(public)/how-it-works/page.tsx`
- Create: `src/app/(public)/about/page.tsx`
- Create: `src/app/(public)/contact/page.tsx`
- Create: `src/app/(public)/blog/page.tsx`
- Create: `src/app/(public)/en/page.tsx`

- [ ] **Step 1: pricing/page.tsx**

```typescript
import Link from 'next/link';

export const metadata = {
  title: 'מחירון | TOPROP',
  description: 'חבילות ניהול נכסים של TOPROP — CORE, PREMIUM ו-PRIVATE.',
};

const packages = [
  {
    name: 'CORE',
    positioning: 'ניהול שוטף',
    price: 'החל מ-6%–7%',
    note: 'בכפוף למינימום חודשי',
    features: ['ניהול שוכרים', 'גביית שכירות', 'תחזוקה בסיסית', 'דוחות חודשיים'],
  },
  {
    name: 'PREMIUM',
    positioning: 'ניהול מלא ודיווח מתקדם',
    price: 'החל מ-8%–9%',
    note: 'בכפוף למינימום חודשי',
    features: ['כל מה שב-CORE', 'ניהול פעיל של חידוש חוזים', 'דוחות מתקדמים', 'עדיפות בטיפול'],
    highlight: true,
  },
  {
    name: 'PRIVATE',
    positioning: 'ניהול פורטפוליו',
    price: 'הצעה מותאמת',
    note: 'לפורטפוליו של 3+ נכסים',
    features: ['ניהול פורטפוליו', 'מנהל תיק אישי', 'ניתוח תשואה', 'ייעוץ אסטרטגי'],
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">מחירון וחבילות</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          שקיפות מחיר — ללא הפתעות
        </p>
      </section>

      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-2xl p-8 border-2 flex flex-col ${
                pkg.highlight ? 'border-gold shadow-lg' : 'border-gray-100'
              }`}
            >
              {pkg.highlight && (
                <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                  הכי פופולרי
                </span>
              )}
              <h2 className="font-heading text-2xl font-bold text-navy mb-1">{pkg.name}</h2>
              <p className="text-brand-muted text-sm mb-4">{pkg.positioning}</p>
              <div className="text-3xl font-bold text-navy mb-1">{pkg.price}</div>
              <p className="text-xs text-brand-muted mb-6">{pkg.note}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="text-sm text-brand-text flex items-center gap-2">
                    <span className="text-gold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/property-360"
                className="w-full text-center bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-xl transition-colors"
              >
                מתחילים
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-brand-muted max-w-2xl mx-auto">
          * המחירים לא כוללים עמלת תיווך, ניהול פרויקטים, ניקיון, תיקונים וספקים חיצוניים.
          המחיר הסופי תלוי בסוג הנכס ומורכבות הניהול.
        </p>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: how-it-works/page.tsx**

```typescript
import Link from 'next/link';

export const metadata = {
  title: 'איך זה עובד | TOPROP',
  description: 'תהליך קליטת נכס ב-TOPROP — 6 שלבים פשוטים וברורים.',
};

const steps = [
  { n: 1, title: 'מספרים לנו על הנכס', body: 'ממלאים טופס Property 360 עם פרטי הנכס, מצבו ומה מעניין אתכם.' },
  { n: 2, title: 'Property Review', body: 'צוות TOPROP בוחן את הנכס, מנתח את השוק ומכין המלצת מסלול בכתב.' },
  { n: 3, title: 'בוחרים מסלול', body: 'נפגשים, עוברים על האפשרויות ומחליטים יחד על מסלול הפעולה.' },
  { n: 4, title: 'קליטה למערכת', body: 'הנכס נכנס לניהול — חוזים, מפתחות, אנשי קשר, ספקים.' },
  { n: 5, title: 'TOPROP מנהלת', body: 'אנחנו מטפלים בכל — שוכרים, ספקים, תחזוקה, גביה.' },
  { n: 6, title: 'דוחות ושקיפות', body: 'מקבלים דוחות חודשיים, עדכונים בזמן אמת וגישה לכל מה שקורה.' },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">איך זה עובד?</h1>
        <p className="text-white/70 text-xl">תהליך ברור, פשוט ומובנה</p>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-10 mb-16">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg">
                  {s.n}
                </div>
                <div className="pt-2">
                  <h2 className="font-semibold text-navy text-xl mb-2">{s.title}</h2>
                  <p className="text-brand-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/property-360"
              className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              התחילו עם Property 360
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: about/page.tsx**

```typescript
export const metadata = {
  title: 'אודות | TOPROP',
  description: 'TOPROP — חברת ניהול נכסים עם גישת משקיע.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">אודות TOPROP</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          חברת ניהול נכסים עם גישת משקיע — מנהלים את הנכס, ממקסמים את ההשקעה.
        </p>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-lg text-brand-text">
          <p className="text-xl leading-relaxed mb-6">
            TOPROP היא חברת ניהול נכסים המתמחה בניהול, השכרה והשבחה של נכסים פרטיים ומסחריים בישראל.
          </p>
          <p className="leading-relaxed mb-6">
            הגישה שלנו שונה: אנחנו לא רק מנהלים — אנחנו חושבים כמו משקיעים. כל נכס מטופל עם מיקוד ברווחיות, שמירה על ערכו לאורך זמן ושקיפות מלאה כלפי הבעלים.
          </p>
          <p className="leading-relaxed">
            אנחנו מציעים שירות מלא לבעלי נכסים — משלב בחירת אסטרטגיית ההשכרה, דרך ניהול השוכרים והספקים, ועד דיווח שוטף ושקוף.
          </p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: contact/page.tsx**

```typescript
import Link from 'next/link';

export const metadata = {
  title: 'צור קשר | TOPROP',
  description: 'דברו איתנו — טלפון, WhatsApp או טופס יצירת קשר.',
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">צור קשר</h1>
        <p className="text-white/70 text-xl">נשמח לשמוע עליכם ועל הנכס שלכם</p>
      </section>

      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <div className="flex flex-col gap-6 mb-8">
            <a
              href="tel:+972552601077"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-2xl">📞</div>
              <div>
                <div className="font-semibold text-navy">טלפון</div>
                <div className="text-brand-muted text-sm" dir="ltr">+972 55 260-1077</div>
              </div>
            </a>
            <a
              href="https://wa.me/972552601077"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">💬</div>
              <div>
                <div className="font-semibold text-navy">WhatsApp</div>
                <div className="text-brand-muted text-sm">שלחו הודעה עכשיו</div>
              </div>
            </a>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-brand-muted mb-4">רוצים שנחזור אליכם עם ניתוח הנכס?</p>
            <Link
              href="/property-360"
              className="inline-block bg-gold hover:bg-gold-soft text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              מלאו Property 360
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: blog/page.tsx**

```typescript
export const metadata = {
  title: 'מאמרים | TOPROP',
  description: 'מאמרים ומדריכים לבעלי נכסים ומשקיעים.',
};

export default function BlogPage() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">מאמרים</h1>
        <p className="text-white/70 text-xl">ידע מקצועי לבעלי נכסים ומשקיעים</p>
      </section>
      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-brand-muted py-20">
          מאמרים יתווספו בקרוב.
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: en/page.tsx**

```typescript
import Link from 'next/link';

export const metadata = {
  title: 'TOPROP | Property Management in Israel',
  description: 'Full-service property management for Israeli properties — long-term rentals, Airbnb, commercial, and investments.',
};

export default function EnglishPage() {
  return (
    <div>
      <section className="bg-navy text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
          Managing Property. Maximizing Investment.
        </h1>
        <p className="text-white/70 text-xl max-w-3xl mx-auto mb-8">
          TOPROP provides full-service property management for residential and commercial properties in Israel — for local and overseas owners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/property-360"
            className="bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            Check My Property
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/50 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Long-Term Rentals', body: 'Professional tenant management, contracts, maintenance and monthly reporting.' },
            { title: 'Airbnb & Short Term', body: 'Feasibility analysis first, then full Airbnb management and optimization.' },
            { title: 'Commercial Properties', body: 'Offices, retail and warehouses managed with business-first thinking.' },
          ].map((item) => (
            <div key={item.title} className="p-6">
              <h3 className="font-semibold text-navy text-lg mb-2">{item.title}</h3>
              <p className="text-brand-muted text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/app/(public)/pricing/ src/app/(public)/how-it-works/ src/app/(public)/about/ src/app/(public)/contact/ src/app/(public)/blog/ src/app/(public)/en/
git commit -m "feat: add pricing, how-it-works, about, contact, blog, en pages"
```

---

## PHASE 5 — Build Final Check

### Task 24: בדיקה סופית ותיקונים

- [ ] **Step 1: הרץ build מלא**

```bash
npm run build 2>&1
```
Expected: ✓ Compiled successfully, 0 errors

- [ ] **Step 2: הרץ type check**

```bash
npx tsc --noEmit 2>&1
```
Expected: ללא שגיאות

- [ ] **Step 3: הרץ lint**

```bash
npm run lint 2>&1
```
Expected: No ESLint warnings or errors

- [ ] **Step 4: הרץ dev ובדוק ידנית**

```bash
npm run dev
```

בדוק:
- [ ] דף הבית `/` — כל הסקשנים נטענים
- [ ] Header — ניווט עובד, כפתורי CTA עובדים
- [ ] Footer — קישורים עובדים
- [ ] Property 360 `/property-360` — הויזארד עובר שלבים
- [ ] שלב 7 — submit שולח ל-Supabase ומפנה ל-`/thank-you`
- [ ] RTL נכון בנייד
- [ ] צבעים: navy כהה, gold בולט, לבן שולט

- [ ] **Step 5: Commit סופי**

```bash
git add -A
git commit -m "feat: complete TOPROP rebuild — homepage, property-360, service pages, supporting pages"
```

---

## הערות לביצוע

**Tailwind v4 classes:** הצבעים מוגדרים ב-`@theme` כ-`--color-navy`, `--color-gold` וכו׳. ב-Tailwind v4 אלו זמינים כ-`bg-navy`, `text-gold`, `bg-gold-soft`, `bg-navy-dark`, `text-brand-text`, `text-brand-muted`, `bg-surface`.

**Server vs Client:** WizardShell ו-PublicHeader הם `'use client'`. כל שאר העמודים הם Server Components.

**Supabase:** ה-action ב-`src/app/actions/property360.ts` משתמש ב-`createClient` מ-`@/lib/supabase/server` — וודא שהטבלה `leads` קיימת ב-Supabase עם השדות הנדרשים.

**אם חסרים שדות בטבלת leads:** הוסף migration או הוסף אותם ישירות ב-Supabase Studio.
