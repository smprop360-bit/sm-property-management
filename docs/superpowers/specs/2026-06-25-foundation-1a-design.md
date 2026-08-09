# TOPROP — Foundation 1A Design Spec

**Date:** 2026-06-25  
**Phase:** 1A — Foundation  
**Status:** Approved

---

## Overview

Foundation 1A establishes the entire technical base of the TOPROP platform. Everything else (public site, CRM, campaigns) is built on top of this. No features are exposed to end users in this phase — the output is a running Next.js app with working Supabase connection, RTL design system, and skeleton layouts.

---

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 App Router + TypeScript | Defined in project spec |
| Styling | Tailwind CSS v3 | Defined in project spec |
| Components | shadcn/ui (built on Radix UI) | User selection — customizable, RTL-friendly |
| Database / Auth / Storage | Supabase | Defined in project spec |
| Hosting | Vercel | Defined in project spec |
| Font | Heebo (Google Fonts) | Best Hebrew web font, clean + professional |

---

## Project Structure

```
toprop/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx            ← PublicLayout (header + footer)
│   │   │   ├── page.tsx              ← /
│   │   │   ├── owners/page.tsx       ← /owners
│   │   │   ├── seekers/page.tsx      ← /seekers
│   │   │   ├── properties/page.tsx   ← /properties
│   │   │   ├── property/[slug]/page.tsx ← /property/[slug]
│   │   │   └── thank-you/page.tsx    ← /thank-you
│   │   ├── (admin)/
│   │   │   ├── layout.tsx            ← AdminLayout (sidebar + topbar)
│   │   │   └── admin/
│   │   │       ├── page.tsx          ← /admin (dashboard)
│   │   │       ├── leads/page.tsx
│   │   │       ├── properties/page.tsx
│   │   │       ├── campaigns/page.tsx
│   │   │       ├── tasks/page.tsx
│   │   │       ├── messages/page.tsx
│   │   │       ├── users/page.tsx
│   │   │       └── settings/page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx                ← root layout (RTL, font, metadata)
│   ├── components/
│   │   ├── ui/                       ← shadcn/ui generated components
│   │   ├── forms/                    ← LeadForm base component
│   │   └── shared/
│   │       ├── PublicHeader.tsx
│   │       ├── PublicFooter.tsx
│   │       ├── AdminSidebar.tsx
│   │       └── PropertyCard.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             ← browser client
│   │   │   └── server.ts             ← server client (cookies)
│   │   ├── types/
│   │   │   ├── property.ts
│   │   │   └── lead.ts
│   │   └── utils.ts                  ← cn(), slug generator, formatPrice
│   └── hooks/
│       └── useLeadForm.ts            ← form state + submission
├── public/
│   └── logo.png
├── .env.local
├── .env.example
└── tailwind.config.ts
```

---

## Supabase Schema

### Table: `properties`

```sql
CREATE TABLE properties (
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
```

### Table: `leads`

```sql
CREATE TABLE leads (
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
```

### Supabase Storage

- Bucket: `property-images` — תמונות נכסים (public)
- Bucket: `assets` — לוגו ותמונות כלליות (public)

---

## Design System

### Color Palette (extracted from logo)

```ts
// tailwind.config.ts
extend: {
  colors: {
    brand: {
      navy:  '#1B2B5E',   // primary — headers, buttons, nav
      gold:  '#C9A227',   // accent — CTAs, highlights, icons
      light: '#F8F9FA',   // surface — card backgrounds, sections
    }
  }
}
```

### Typography

- Font family: **Heebo** (Google Fonts) — Hebrew + Latin
- Root: `dir="rtl"` + `lang="he"`
- Base size: 16px
- Scale: Tailwind defaults

### RTL Setup

```tsx
// app/layout.tsx
<html lang="he" dir="rtl">
```

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
body { font-family: 'Heebo', sans-serif; }
```

### shadcn/ui Config

- Style: `default`
- Base color: `slate`
- CSS variables: enabled
- Brand colors mapped to CSS variables (`--primary`, `--accent`)

---

## Foundation Components

### PublicHeader
- לוגו שמאלה (RTL: ימינה), nav links: דירות / משרדים / מחסנים / בעלי נכסים / צור קשר
- CTA button: "פרסם נכס" (→ /owners) בצבע gold
- Mobile: hamburger menu

### PublicFooter
- שורת לוגו + tagline
- לינקים: מדיניות פרטיות, תנאי שימוש, צור קשר
- כפתורי WhatsApp + טלפון

### AdminSidebar
- לוגו בראש
- ניווט: דשבורד / לידים / נכסים / קמפיינים / משימות / הודעות / משתמשים / הגדרות
- Active state בצבע navy
- ללא auth בשלב זה

### PropertyCard
- תמונה ראשית
- סוג + עיר + שטח
- מחיר (או "מחיר לפי פנייה")
- כפתור "פרטים נוספים"

### LeadForm (base)
- שדות: שם מלא, טלפון, אימייל (optional), הודעה (optional)
- Hidden fields: lead_type, page_url, utm_*
- Submit → Supabase `leads` table insert
- On success → redirect to /thank-you

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://luwpyyxxzdifeoxcufsw.supabase.co/rest/v1/
NEXT_PUBLIC_SUPABASE_ANON_KEY=<REDACTED_JWT>
SUPABASE_SERVICE_ROLE_KEY=<REDACTED_SECRET>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Auth

Deferred to Phase 2. Admin area is accessible without login during development.

---

## Out of Scope for 1A

- Page content (copywriting, hero sections) — Phase 1B
- Lead form logic per page — Phase 1B
- CRM functionality — Phase 1C
- Any analytics/tracking — Phase 1B
- Authentication — Phase 2

---

## Success Criteria

1. `npm run dev` runs without errors
2. `/` renders with PublicLayout (header + footer, RTL, Heebo font)
3. `/admin` renders with AdminSidebar
4. Supabase connection works — `properties` and `leads` tables exist
5. shadcn/ui components render correctly in RTL
6. Brand colors (navy + gold) applied via Tailwind
7. No TypeScript errors (`npm run build` passes)
