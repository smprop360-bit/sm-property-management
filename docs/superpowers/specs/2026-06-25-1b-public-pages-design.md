# TOPROP — Phase 1B: Public Landing Pages Design Spec

**Date:** 2026-06-25  
**Phase:** 1B — Public Site  
**Status:** Approved

---

## Overview

Phase 1B fills the skeleton pages from 1A with real Hebrew content, lead-capture forms, and a distinctive visual design. The four pages in scope: Home (`/`), Owners (`/owners`), Seekers (`/seekers`), Thank-you (`/thank-you`).

The Supabase `leads` table already exists. The `LeadForm` base component and `useLeadForm` hook are already built. The `PublicHeader` and `PublicFooter` are already in the layout.

---

## Design System

### Palette

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#1B2B5E` | Primary — dark sections, headings on light, nav |
| Gold | `#C9A227` | Accent — CTAs, icons, borders, large display text on dark |
| Light | `#F8F9FA` | Surface — alternating section backgrounds |
| White | `#FFFFFF` | Cards, clean section backgrounds |
| Dark text | `#1a1a2e` | Body text on light backgrounds |
| White/70 | `rgba(255,255,255,0.7)` | Supporting text on dark backgrounds |

**Accessibility rule:** Gold (`#C9A227`) on white fails WCAG AA for normal text (≈2.3:1). Gold is used only as: large display text on dark backgrounds (contrast ≈5.9:1 ✓), CTA button fills, icons, borders, and decorative underlines. Never as body or caption text on white/light surfaces.

### Typography

Font: Heebo (already loaded via `next/font/google`)

| Role | Weight | Size (mobile / desktop) | Usage |
|------|--------|--------------------------|-------|
| Display | 800 | 40px / 64px | Hero headlines |
| Heading 1 | 700 | 28px / 40px | Section titles |
| Heading 2 | 600 | 20px / 28px | Card titles, subsections |
| Body | 400 | 16px / 16px | Paragraphs |
| Label | 500 | 14px / 14px | Form labels, captions |
| Small | 400 | 12px / 12px | Fine print, errors |

### Signature Element

**Split-color headline:** On dark (navy) hero sections, the headline uses two lines — line 1 in white, line 2 in gold. This is the single memorable visual element. Used exclusively on hero sections; never repeated in body copy or cards.

Example (home hero):
```
המאגר הישראלי        ← white
לנכסים מסחריים       ← gold
```

On light backgrounds (owners hero), the headline is navy only; gold appears as a thick underline beneath the key phrase, not as text color.

### Icons

Lucide React throughout. No emojis. Consistent 24px stroke icons in all body sections; 40-48px icons in feature/type cards.

---

## Page Designs

### 1. Home Page (`/`)

**Single job:** Route visitors to the correct funnel (owner vs. seeker) with authority and speed.

#### Section 1 — Hero

- Full-width, navy-to-dark-navy gradient (`bg-gradient-to-br from-[#1B2B5E] to-[#0f1e47]`)
- Centered content, `min-h-[80vh]`, vertical flex center
- Split headline (display, 800 weight):
  - Line 1 white: "המאגר הישראלי"
  - Line 2 gold: "לנכסים מסחריים"
- Supporting text (white/70, 18px): "משרדים, חנויות, מחסנים, קרקעות ועוד — כל הנכסים המסחריים במקום אחד"
- Two CTAs side-by-side (stacked on mobile):
  - Primary: gold-filled button "אני מחפש נכס" → `/seekers`
  - Secondary: white outline button "יש לי נכס להציע" → `/owners`

```
┌─────────────────────────────────────────────┐
│  [NAVY GRADIENT BACKGROUND]                 │
│                                             │
│         המאגר הישראלי         (white)       │
│         לנכסים מסחריים        (gold)        │
│                                             │
│   משרדים, חנויות, מחסנים, קרקעות ועוד     │
│                                             │
│   [אני מחפש נכס ▶]   [יש לי נכס להציע]   │
│                                             │
└─────────────────────────────────────────────┘
```

#### Section 2 — Property Types

- Pearl background (`bg-[#F8F9FA]`)
- Section eyebrow: "סוגי נכסים"
- Section title: "מה אתה מחפש?" (navy, Heading 1)
- 6-card grid: 2 cols mobile, 3 cols md, 6 cols xl
- Each card: white bg, rounded-xl, hover:shadow-lg, 48px Lucide icon (gold), Hebrew label
  - בניין משרדים — `Building2`
  - חנות — `Store`
  - מחסן — `Warehouse`
  - תעשייה — `Factory`
  - קרקע — `Layers` or `MapPin`
  - עסק — `Briefcase`
- Each card links to `/seekers`

```
┌─────────────────────────────────────────────┐
│ [PEARL BACKGROUND]                          │
│ סוגי נכסים                                  │
│ מה אתה מחפש?                                │
│                                             │
│ [משרד] [חנות] [מחסן] [תעשייה] [קרקע] [עסק] │
│                                             │
└─────────────────────────────────────────────┘
```

#### Section 3 — Stats Bar

- Navy background
- 3 stats in row (stacked on mobile):
  - `500+` / "נכסים במאגר" 
  - `30` / "ערים"
  - `מאות` / "עסקאות שנסגרו"
- Number: gold, 48px, 800 weight
- Label: white/70, 14px

#### Section 4 — Value Props

- White background
- Section title: "למה TOPROP?" (navy)
- 3 columns (1 col mobile → 3 col md):
  - מהיר ואפקטיבי — `Zap` icon — "פרסום מיידי, לקוחות רלוונטיים בתוך ימים"
  - אמינות מלאה — `Shield` icon — "נכסים מאומתים, לידים איכותיים בלבד"
  - ליווי מקצועי — `Users` icon — "צוות מקצועי שמלווה אותך לאורך כל הדרך"

#### Section 5 — Owner CTA Banner

- Gold-to-amber gradient background (`bg-gradient-to-r from-[#C9A227] to-[#e0b830]`)
- Text: "בעל נכס? תן לנו להגיע ללקוחות הנכונים עבורך" (white, 24px 700)
- Button: navy-filled "פרסם עכשיו" → `/owners`

---

### 2. Owners Page (`/owners`)

**Single job:** Capture property owner leads with a confident, professional first impression.

#### Section 1 — Hero + Form

- Pearl background
- Two-column layout on desktop (text left, form right in RTL = form starts, text after):
  - Column A (copy): 
    - Eyebrow: "לבעלי נכסים"
    - Headline: "פרסם את הנכס שלך" (navy, display weight)
    - Gold rule (4px thick, 60px wide, under headline)
    - Subtext: "אנחנו מגיעים ללקוחות הנכונים. בלי בינוניות, בלי בזבוז זמן."
    - 3 brief bullets with gold checkmarks:
      - פרסום רחב ברחבי ישראל
      - לידים איכותיים בלבד
      - ייעוץ ושיווק ללא עלות ראשונית
  - Column B (form card):
    - White card, rounded-2xl, shadow-xl, padding 32px
    - Card title: "השאר פרטים ונחזור אליך" (navy, 18px 600)
    - `<LeadForm leadType="owner" />`

```
┌────────────────────────────────────────────────────────┐
│ [PEARL BACKGROUND]                                     │
│                                                        │
│  ┌──────────────────┐  ┌────────────────────────────┐  │
│  │ לבעלי נכסים       │  │ השאר פרטים ונחזור אליך   │  │
│  │                  │  │                            │  │
│  │ פרסם את הנכס שלך  │  │  [שם מלא]                │  │
│  │ ────────         │  │  [טלפון]                  │  │
│  │                  │  │  [אימייל]                 │  │
│  │ אנחנו מגיעים...  │  │  [הודעה]                  │  │
│  │                  │  │  [שלח פנייה]              │  │
│  │ ✓ פרסום רחב      │  │                            │  │
│  │ ✓ לידים איכותיים │  └────────────────────────────┘  │
│  │ ✓ ייעוץ ושיווק   │                                  │
│  └──────────────────┘                                  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

#### Section 2 — Process

- White background
- Title: "איך זה עובד?" (navy)
- 3 steps in horizontal row (vertical on mobile):
  - שלב 1: "מלא את הטופס" — `ClipboardList` icon
  - שלב 2: "נתאם שיחת היכרות" — `Phone` icon
  - שלב 3: "אנחנו מטפלים בשיווק" — `TrendingUp` icon
- Connector line between steps (hidden on mobile)

#### Section 3 — Bottom CTA

- Navy background
- "מוכן להתחיל?" + gold button "פרסם את הנכס שלך" → scrolls to form (#owner-form)

---

### 3. Seekers Page (`/seekers`)

**Single job:** Capture property seeker leads with property-type and city context.

#### Section 1 — Hero + Form

- Navy background
- Centered copy above form:
  - Split headline: "מצא את הנכס" (white) / "שחיפשת" (gold)
  - Subtext (white/70): "ספר לנו מה אתה מחפש ונמצא לך את הנכס המתאים"
- Centered `<SeekerLeadForm />` card (max-w-lg, white card, 32px padding, rounded-2xl, shadow-xl)

```
┌──────────────────────────────────────────────┐
│  [NAVY BACKGROUND]                           │
│                                              │
│          מצא את הנכס           (white)       │
│          שחיפשת                (gold)        │
│          ספר לנו מה אתה מחפש...             │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │ מה אתה מחפש?                          │   │
│  │  [סוג נכס ▾]    [עיר]               │   │
│  │  [תקציב (₪)]   [גודל משוער (מ"ר)]   │   │
│  │  [שם מלא]       [טלפון]             │   │
│  │  [הודעה נוספת]                       │   │
│  │  [שלח פנייה]                          │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

#### Section 2 — Property Types (visual)

- Pearl background
- Title: "מה אנחנו מציעים"
- 6 type cards (same design as Home page types grid)

#### Section 3 — How We Help

- White background
- 3 value props tailored to seekers:
  - גישה למאגר — "אלפי נכסים מסחריים ברחבי ישראל"
  - חיפוש מותאם — "מצאנו לך את הנכס לפי הצרכים שלך"
  - ליווי עד הסגירה — "אנחנו איתך מהחיפוש עד חתימת החוזה"

---

### 4. Thank-you Page (`/thank-you`)

**Single job:** Confirm submission and offer immediate WhatsApp contact.

- Full-height centered layout (`min-h-[80vh] flex items-center justify-center`)
- Gold circle with white `CheckCircle` icon (64px, circle bg gold/10)
- Headline: "קיבלנו את פנייתך!" (navy, 32px 700)
- Body: "אחד מהנציגים שלנו יחזור אליך בהקדם האפשרי. בינתיים, אפשר לדבר איתנו ישירות בווצאפ."
- Two buttons (stacked, centered):
  - Primary (gold): `MessageCircle` icon + "דבר איתנו בווצאפ" → `https://wa.me/972500000000` (placeholder, updated in production)
  - Secondary (navy outline): "חזרה לעמוד הבית" → `/`

---

## Components to Create

| Component | File | Notes |
|-----------|------|-------|
| `SeekerLeadForm` | `src/components/forms/SeekerLeadForm.tsx` | Extended form with property_type, city, budget, size_needed |
| `useSeekerLeadForm` | `src/hooks/useSeekerLeadForm.ts` | Extended hook for seeker fields |

## Components to Reuse (No Changes)

- `LeadForm` — used as-is on Owners page with `leadType="owner"`
- `PublicHeader`, `PublicFooter` — already in layout
- All shadcn/ui components: Button, Input, Label, Textarea, Select, Card, Badge

---

## Seeker Form Extended Fields

The `leads` table already has columns: `property_type`, `city`, `budget`, `size_needed`.

`SeekerLeadForm` captures:
- `property_type` (Select): one of `office|store|warehouse|industry|land|business`
- `city` (Input, free text)
- `budget` (Input, free text e.g. "10,000 ₪ לחודש")
- `size_needed` (Input, free text e.g. "100-200 מ\"ר")
- `full_name` (required)
- `phone` (required, Israeli format)
- `email` (optional)
- `message` (optional)

Validation: same phone regex as `useLeadForm`. `full_name` and `phone` are required. All other fields optional.

`useSeekerLeadForm` mirrors `useLeadForm` but extends the Supabase insert with the extra 4 fields and sets `lead_type: 'seeker'`.

---

## RTL Notes

- All layouts use RTL-aware Tailwind (start/end instead of left/right)
- Icons in buttons: `gap-2` with icon after text in RTL (so visually icon appears on right of text)
- Form `Select` trigger: chevron on left side in RTL (handled by shadcn Select component)
- Two-column layout on owners page: in RTL, the form column appears on the right (document start), copy on the left

---

## Animations

- Hero headline: `animate-fade-in` (tw-animate-css: `fade-in 0.6s ease-out`)  
- Section cards: no JS scroll animation (keeps it clean, avoids AI-generated feeling)
- Button hover: scale-[1.02] via Tailwind `hover:scale-[1.02] transition-transform duration-200`
- Type cards hover: `hover:shadow-lg hover:-translate-y-1 transition-all duration-200`

---

## Out of Scope for 1B

- Real property listings (1B-ii, after Supabase data entry)
- Analytics/pixel tracking (Phase 1B tracking sub-phase)
- Authentication
- Real WhatsApp number (placeholder used)
- Real stats numbers (hardcoded, updated in production)
