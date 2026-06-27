# Phase 2 — Property Pages Design Spec

## Goal

Build public-facing property pages: a listing page, a per-property landing page, and subdomain routing so each property can be shared via its own URL (e.g., `misrad-tlv.toprop.co.il`).

## Architecture

### Subdomain routing via middleware

`middleware.ts` intercepts every request and reads the `host` header. If a subdomain is present (not `www`, not `admin`, not `localhost`), it extracts it as the property slug and internally rewrites the request to `/property/[slug]`. The visitor's URL stays unchanged.

In local development, subdomains don't resolve — test directly via `/property/[slug]`. In production on Vercel, add a wildcard DNS record `*.toprop.co.il → Vercel` and a wildcard domain in the Vercel project settings.

### Pages

Three pages are built or replaced:

| Route | Description |
|---|---|
| `/properties` | Public listing of all active properties |
| `/property/[slug]` | Property landing page (also the subdomain target) |

### Lead creation

The contact form on the property detail page creates a lead with `lead_type = 'property_interest'` and `property_id` set to the property's UUID. This links the lead to the property in the admin CRM.

## Pages

### `/properties` — listing page

Server component. Fetches all properties with `status = 'active'` from Supabase using the server client (`@/lib/supabase/server`). Renders a responsive grid using the existing `PropertyCard` component.

**Filters:** Client-side filter bar (type, deal_type) — no server round-trip needed since the full list is fetched once.

**Empty state:** "אין נכסים זמינים כרגע" with a CTA to contact.

**Layout:** Consistent with existing public pages — `PublicHeader`, `PublicFooter`, `max-w-6xl` container, navy hero band at top with page title.

### `/property/[slug]` — property landing page

Server component. Fetches property by slug from Supabase. Returns 404 if not found or not active.

**Sections:**
1. **Hero image** — first image full-width (or placeholder if none). Deal type badge overlay.
2. **Details bar** — type, city/area, size, floor, price (or price_text if not visible).
3. **Description** — full text if present.
4. **Contact form** — name, phone (required), message (optional). On submit: inserts lead with `lead_type = 'property_interest'`, `property_id`. Shows success message inline (no redirect).
5. **Footer** — standard `PublicFooter`.

**No `PublicHeader`** on the subdomain landing page — it's a standalone page without site navigation.

### Admin: copy link button

In `PropertiesTable.tsx`, add a copy-link icon button next to each property's edit/delete actions. Copies `https://${property.slug}.toprop.co.il` to clipboard. Shows a brief "הועתק!" tooltip confirmation.

## Data flow

```
Supabase (properties table, status='active')
  ↓ server fetch
/properties page → PropertyCard grid
/property/[slug] page → detail + contact form
  ↓ form submit (client)
Supabase (leads table, lead_type='property_interest', property_id=...)
```

## Middleware

```
src/middleware.ts
```

Runs on all routes. Skips: `_next/*`, `api/*`, `favicon.ico`, static files.

Logic:
1. Read `host` header
2. Strip port if present
3. Split on `.` — if more than 2 parts and first part is not `www` or `admin`, treat first part as slug
4. Rewrite to `/property/[slug]`

## Files

**Create:**
- `src/middleware.ts`
- `src/app/(public)/properties/page.tsx` (replace stub)
- `src/app/(public)/property/[slug]/page.tsx` (replace stub)
- `src/components/public/PropertyContactForm.tsx`
- `src/components/public/PropertiesFilters.tsx`

**Modify:**
- `src/components/admin/PropertiesTable.tsx` (add copy-link button)

## Out of scope

- Auth on subdomain pages
- Subdomain-specific analytics
- Custom domain per property (not wildcard subdomain)
- Image gallery / lightbox (first image only)
- Property search by text
