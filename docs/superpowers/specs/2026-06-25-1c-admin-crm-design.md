# TOPROP — Phase 1C: Admin CRM Design Spec

**Date:** 2026-06-25  
**Phase:** 1C — Admin CRM  
**Status:** Approved

---

## Overview

Phase 1C builds the internal admin CRM on top of the existing Supabase `leads` and `properties` tables. Three pages: Dashboard (`/admin`), Leads (`/admin/leads`), Properties (`/admin/properties`). All components are `'use client'` — no server-side rendering concerns, direct Supabase JS client.

No authentication in this phase. The `/admin` route group is visually separated from the public site but unprotected (auth is Phase 2).

---

## Architecture

### Route Structure

```
/admin                            → Dashboard
/admin/leads                      → Leads list + drawer
/admin/properties                 → Properties list + table
/admin/properties/new             → Add property form
/admin/properties/[id]/edit       → Edit property form
```

All under `src/app/admin/` with a shared `layout.tsx` providing the admin sidebar nav.

### Layout

`src/app/admin/layout.tsx` — sidebar + main content area.

- Sidebar: navy background (`#1B2B5E`), fixed left, 240px wide
- Logo: "TOPROP" in gold at top
- Nav items: Dashboard (LayoutDashboard), לידים (Users), נכסים (Building2) — Lucide icons
- Active state: gold text + gold left border (4px)
- Main: `flex-1 bg-[#F8F9FA] min-h-screen p-6`

### Data Layer

Three custom hooks, all in `src/hooks/admin/`:

| Hook | File | Purpose |
|------|------|---------|
| `useLeads` | `useLeads.ts` | Fetch + filter leads, update status, save notes |
| `useProperties` | `useProperties.ts` | Fetch + filter + CRUD properties |
| `useLeadDrawer` | `useLeadDrawer.ts` | Selected lead state, drawer open/close, notes edit |

All hooks use `createClient()` from `@/lib/supabase/client`.

### Tech Stack

- **Charts**: `recharts` — BarChart for lead trend
- **Drawer**: shadcn Dialog (`src/components/ui/dialog.tsx`) — used as side sheet (full-height, right-anchored via CSS)
- **Image upload**: Supabase Storage bucket `property-images`, public bucket
- **Confirm dialogs**: shadcn AlertDialog (`src/components/ui/alert-dialog.tsx`)

---

## Page Designs

### 1. Dashboard (`/admin`)

**File:** `src/app/admin/page.tsx`

Three stats cards in a row, then a bar chart, then a recent leads mini-table.

#### Stats Cards

Row of 3 cards, equal width (`grid grid-cols-3 gap-4`):

| Card | Value | Icon |
|------|-------|------|
| לידים חדשים היום | COUNT leads WHERE created_at >= today | UserPlus |
| לידים השבוע | COUNT leads WHERE created_at >= 7 days ago | Users |
| נכסים פעילים | COUNT properties WHERE status = 'active' | Building2 |

Card anatomy: white bg, rounded-xl, p-6, shadow-sm. Icon in gold (40px). Value: navy, 36px, 700. Label: gray, 14px.

Component: `src/components/admin/AdminStatsCard.tsx`

```
Props: { label: string, value: number, icon: LucideIcon, loading: boolean }
```

#### Lead Trend Chart

`src/components/admin/LeadsChart.tsx`

- Recharts `BarChart`, 30-day rolling window
- X-axis: DD/MM date label, every 5th day shown
- Y-axis: integer count
- Bar fill: `#C9A227` (gold), radius [4,4,0,0]
- Data: count of leads grouped by `DATE(created_at)`, last 30 days
- Chart container: white card, rounded-xl, p-6, shadow-sm
- Title above chart: "לידים — 30 יום אחרונים" (navy, 16px 600)
- Responsive wrapper: `<ResponsiveContainer width="100%" height={220}>`

Query:
```sql
SELECT DATE(created_at) as day, COUNT(*) as count
FROM leads
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY day
```

Fill missing days with 0 in JS before passing to Recharts.

#### Recent Leads Table

`src/components/admin/RecentLeadsTable.tsx`

- Last 10 leads, ordered by `created_at DESC`
- Columns: שם, טלפון, סוג, עיר, סטטוס, תאריך
- Status badge: colored pill (see status colors below)
- White card, rounded-xl, p-6, shadow-sm
- Title: "לידים אחרונים" (navy, 16px 600)
- Row click: navigates to `/admin/leads` (not opens drawer — dashboard is read-only)

---

### 2. Leads Page (`/admin/leads`)

**File:** `src/app/admin/leads/page.tsx`

Filter bar across top, full-width leads table below, side drawer overlay for lead detail.

#### Filter Bar

`src/components/admin/LeadsFilterBar.tsx`

Three inline controls (flex row, gap-3):

1. **Search input** — free text, filters on `full_name` OR `phone` (client-side filter)
2. **Property type select** — "כל הסוגים" + all PROPERTY_TYPE_LABELS values
3. **Status select** — "כל הסטטוסים" + all LEAD_STATUS_LABELS values

All filters are client-side (data already fetched). No server re-fetch on filter change.

#### Status Definitions

```typescript
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'lost'] as const
export type LeadStatus = typeof LEAD_STATUSES[number]

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new:        'חדש',
  contacted:  'יצרנו קשר',
  qualified:  'מתאים',
  closed:     'נסגר',
  lost:       'לא רלוונטי',
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  new:        'bg-blue-100 text-blue-700',
  contacted:  'bg-yellow-100 text-yellow-700',
  qualified:  'bg-green-100 text-green-700',
  closed:     'bg-brand-navy/10 text-brand-navy',
  lost:       'bg-gray-100 text-gray-500',
}
```

These are added to `src/lib/types/lead.ts` (new file).

#### Leads Table

`src/components/admin/LeadsTable.tsx`

Columns:

| Column | Content |
|--------|---------|
| שם | `full_name` |
| טלפון | `phone` (tel: link) |
| אימייל | `email` or `—` |
| סוג נכס | `PROPERTY_TYPE_LABELS[property_type]` or `—` |
| עיר | `city` or `—` |
| סטטוס | Inline status select (see below) |
| תאריך | `created_at` formatted DD/MM/YY |
| פעולות | "פרטים" button → opens drawer |

**Inline status select:** Each row's status cell is a native `<select>` element styled as a colored pill. On change, calls `useLeads.updateStatus(id, newStatus)` directly — no drawer required.

Row hover: `hover:bg-gray-50`. White bg, rounded-xl, shadow-sm wrapping card.

#### Lead Drawer

`src/components/admin/LeadDrawer.tsx`

Implemented as shadcn `Dialog` with custom CSS to anchor it to the right side:

```css
/* Override Dialog positioning */
.lead-drawer-content {
  position: fixed;
  top: 0;
  right: 0;           /* RTL: right = document start */
  bottom: 0;
  width: 420px;
  margin: 0;
  border-radius: 0;
  transform: none;
  translate: none;
}
```

Drawer sections (top to bottom):

1. **Header** — Lead name (navy, 20px 700) + close button (X icon)
2. **Contact** — Phone (with WhatsApp button: green, `MessageCircle` icon, URL: `https://wa.me/972${phone.replace(/^0/, '')}` — strips leading 0 for international format), email if present
3. **Details** — property_type, city, budget, size_needed in a 2-col label/value grid
4. **Status** — Label + full-width styled `<select>` for status change (same options as filter)
5. **Notes** — `<Textarea>` (rows=5), save button "שמור הערות" (gold). Notes are stored in `leads.notes` (text column, added via DB migration in this phase).
6. **Meta** — Created at, UTM source if present

Drawer is managed by `useLeadDrawer` hook:
```typescript
export function useLeadDrawer() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [notesValue, setNotesValue] = useState('')
  const open = selectedLead !== null
  function openDrawer(lead: Lead) { setSelectedLead(lead); setNotesValue(lead.notes ?? '') }
  function closeDrawer() { setSelectedLead(null) }
  return { selectedLead, notesValue, setNotesValue, open, openDrawer, closeDrawer }
}
```

`useLeads` hook API:
```typescript
export function useLeads() {
  // state
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  // filters (client-side)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('')

  // computed
  const filteredLeads = leads.filter(...)  // apply all 3 filters

  // actions
  async function updateStatus(id: string, status: LeadStatus): Promise<void>
  async function saveNotes(id: string, notes: string): Promise<void>

  return { leads: filteredLeads, loading, searchQuery, setSearchQuery,
           filterType, setFilterType, filterStatus, setFilterStatus,
           updateStatus, saveNotes }
}
```

---

### 3. Properties Page (`/admin/properties`)

**File:** `src/app/admin/properties/page.tsx`

Filter bar + table with add button, inline edit/delete actions.

#### Filter Bar

`src/components/admin/PropertiesFilterBar.tsx`

- Search input (free text, filters on `title` OR `city`)
- Property type select
- "הוסף נכס" button (gold, links to `/admin/properties/new`)

#### Properties Table

`src/components/admin/PropertiesTable.tsx`

Columns:

| Column | Content |
|--------|---------|
| תמונה | `<img>` thumbnail (48×48, rounded-lg, object-cover) or gray placeholder |
| כותרת | `title` |
| סוג | `PROPERTY_TYPE_LABELS[property_type]` |
| עיר | `city` |
| מחיר | `price` formatted with ₪ and commas, or `—` |
| גודל | `size_sqm` + `מ"ר` or `—` |
| סטטוס | Status badge (`active`/`inactive`) |
| פעולות | Edit icon button (→ `/admin/properties/[id]/edit`) + Delete icon button (opens confirm dialog) |

Delete confirm: shadcn AlertDialog — "האם אתה בטוח? פעולה זו לא ניתנת לביטול." with "מחק" (red) and "ביטול" buttons.

#### useProperties Hook

```typescript
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('')

  const filteredProperties = properties.filter(...)

  async function deleteProperty(id: string): Promise<void>

  return { properties: filteredProperties, loading, searchQuery, setSearchQuery,
           filterType, setFilterType, deleteProperty }
}
```

---

### 4. Property Form (`/admin/properties/new` and `/admin/properties/[id]/edit`)

**Files:**
- `src/app/admin/properties/new/page.tsx`
- `src/app/admin/properties/[id]/edit/page.tsx`
- `src/components/admin/PropertyForm.tsx`

Both pages render `<PropertyForm />` with different initial state. The `[id]/edit` page fetches the property by ID and passes it to the form as `initialValues`.

#### Form Sections

**Section 1 — פרטים בסיסיים (Basic Details)**
- `title` — Input, required
- `property_type` — Select (PROPERTY_TYPE_LABELS), required
- `status` — Select: פעיל (`active`) / לא פעיל (`inactive`), required, default `active`

**Section 2 — מיקום (Location)**
- `city` — Input, required
- `address` — Input, optional
- `neighborhood` — Input, optional

**Section 3 — מפרט (Specs)**
- `size_sqm` — Number Input, optional
- `price` — Number Input, optional (₪/month or purchase price)
- `price_type` — Select: שכירות (`rent`) / מכירה (`sale`), optional
- `floor` — Number Input, optional
- `rooms` — Number Input, optional
- `description` — Textarea (rows=4), optional

**Section 4 — תמונות (Images)**
- Upload input: `accept="image/*"`, multiple allowed
- On file select: upload each to Supabase Storage `property-images/{propertyId}/{filename}`
- Display uploaded images as thumbnail grid (80×80, removable via X button)
- Existing images shown on edit, new uploads appended
- `images` field in properties table: `text[]` (array of public URLs)

#### usePropertyForm Hook

```typescript
// src/hooks/admin/usePropertyForm.ts
export function usePropertyForm(initialValues?: Partial<PropertyFormValues>) {
  const [values, setValues] = useState<PropertyFormValues>(merge(defaults, initialValues))
  const [errors, setErrors] = useState<Partial<Record<keyof PropertyFormValues, string>>>({})
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>(initialValues?.images ?? [])
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent): Promise<void>
  // on submit: validate, upload new images to storage, insert or update property row

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  function handleSelectChange(name: keyof PropertyFormValues, value: string): void
  function handleImageAdd(files: File[]): void
  function handleImageRemove(url: string): void  // removes from existingImages
  function handleNewImageRemove(index: number): void  // removes from imageFiles

  return { values, errors, loading, submitError, existingImages, imageFiles,
           handleChange, handleSelectChange, handleImageAdd, handleImageRemove,
           handleNewImageRemove, handleSubmit }
}
```

On submit (new property):
1. Validate required fields
2. Insert property row (without images) → get `id`
3. Upload each `imageFile` to `property-images/{id}/{filename}` → collect public URLs
4. Update property row with `images` array
5. Navigate to `/admin/properties`

On submit (edit property):
1. Validate
2. Upload any new `imageFiles` → collect URLs
3. Final images = `[...existingImages, ...newUrls]`
4. Update property row with all fields including `images`
5. Navigate to `/admin/properties`

#### PropertyFormValues Type

```typescript
export interface PropertyFormValues {
  title: string
  property_type: string
  status: 'active' | 'inactive'
  city: string
  address: string
  neighborhood: string
  size_sqm: string       // kept as string for input; parsed to number on insert
  price: string
  price_type: 'rent' | 'sale' | ''
  floor: string
  rooms: string
  description: string
  images: string[]       // existing image URLs
}
```

---

## Database Schema Additions

`leads` table already has: `id, created_at, full_name, phone, email, message, lead_type, property_type, city, budget, size_needed, utm_source, utm_medium, utm_campaign`

**Add to `leads`:**
```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes text;
```

`properties` table already has: `id, created_at, title, property_type, city, address, size_sqm, price, description, images`

**Add to `properties`:**
```sql
ALTER TABLE properties ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS neighborhood text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price_type text;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS floor integer;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS rooms integer;
```

**Supabase Storage:**
- Create bucket `property-images`, set to public
- Policy: allow INSERT for all (no auth in phase 1C)

---

## Components Summary

| Component | File | Purpose |
|-----------|------|---------|
| AdminStatsCard | `src/components/admin/AdminStatsCard.tsx` | Single stat card |
| LeadsChart | `src/components/admin/LeadsChart.tsx` | Recharts 30-day bar chart |
| RecentLeadsTable | `src/components/admin/RecentLeadsTable.tsx` | Dashboard recent leads |
| LeadsFilterBar | `src/components/admin/LeadsFilterBar.tsx` | Leads page filters |
| LeadsTable | `src/components/admin/LeadsTable.tsx` | Full leads table + inline status |
| LeadDrawer | `src/components/admin/LeadDrawer.tsx` | Side drawer for lead detail |
| PropertiesFilterBar | `src/components/admin/PropertiesFilterBar.tsx` | Properties page filters + add button |
| PropertiesTable | `src/components/admin/PropertiesTable.tsx` | Properties table + actions |
| PropertyForm | `src/components/admin/PropertyForm.tsx` | Add/edit property form |

## Hooks Summary

| Hook | File | Purpose |
|------|------|---------|
| useLeads | `src/hooks/admin/useLeads.ts` | Leads data + filters + mutations |
| useLeadDrawer | `src/hooks/admin/useLeadDrawer.ts` | Drawer state management |
| useProperties | `src/hooks/admin/useProperties.ts` | Properties data + filters + delete |
| usePropertyForm | `src/hooks/admin/usePropertyForm.ts` | Property form state + submit |

## Type Files

| File | Contents |
|------|---------|
| `src/lib/types/lead.ts` | `LeadStatus`, `LEAD_STATUSES`, `LEAD_STATUS_LABELS`, `LEAD_STATUS_COLORS`, `Lead` interface |
| `src/lib/types/property.ts` | Extended with `PropertyFormValues` (existing `PROPERTY_TYPE_LABELS` already there) |

---

## Out of Scope for 1C

- Authentication / access control (Phase 2)
- Real-time updates / Supabase subscriptions
- Bulk actions on leads or properties
- Property listing on public site (Phase 1B-ii)
- Export / reporting
- Multi-user / roles
