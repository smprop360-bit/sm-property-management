# TOPROP Website — PROJECT.md

## 1. Project
**Brand:** TOPROP  
**Domain:** TOPROP.CO.IL  
**Primary language:** Hebrew (RTL)  
**Secondary language:** English  
**Core positioning:** Property Management • Rentals • Investments  
**Hebrew line:** ניהול נכסים • השכרה • השקעות  
**Tagline:** מנהלים את הנכס. ממקסמים את ההשקעה.  
**English tagline:** Managing Property. Maximizing Investment.

## 2. Main Goal
Build a premium, conversion-focused website that attracts property owners and investors, qualifies them, and turns them into management leads.

Primary funnel:

Visitor → Property 360 → Qualified Lead → Call/Meeting → Proposal → Management Agreement

## 3. Working Strategy
**Audit first. Do not rebuild blindly.**

Before destructive changes:
1. Inspect the current repository.
2. Read all repository instructions and Claude/VS Code skills.
3. Create `AUDIT.md`.
4. Create `KEEP_REMOVE_REFACTOR.md`.
5. Decide what to keep, refactor, remove, or rebuild.
6. Update this file with the actual architecture after the audit.

## 4. Product Principles
- Hebrew-first RTL.
- Mobile-first.
- Premium corporate real-estate visual language.
- White + navy + gold.
- Clear value proposition in under 5 seconds.
- Website must generate qualified owner leads, not just look good.
- No fabricated trust numbers, reviews, case studies or client counts.
- Owner Portal is future scope, not required for the marketing MVP.
- Property 360 is the main lead magnet.
- Long-term management + commercial management are primary launch services.
- Airbnb is feasibility-first.
- Partnership / Guaranteed Rent are selective offerings, not blanket promises.

## 5. Homepage Core Copy
### Hero
**הנכס שלך צריך לעבוד בשבילך.**

TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים, עם שירות מלא לבעלי נכסים ומשקיעים – משלב בחירת אסטרטגיית ההשכרה ועד לניהול השוטף.

Primary CTA: **בדיקת הנכס שלי**  
Secondary CTA: **דברו איתנו**

Support line:
**ניהול לטווח ארוך • Airbnb • מסחרי • השבחה • שותפויות**

## 6. Primary Pages
- `/`
- `/property-management`
- `/commercial-property-management`
- `/airbnb-management`
- `/investors`
- `/property-360`
- `/pricing`
- `/how-it-works`
- `/about`
- `/blog`
- `/contact`
- `/en`

## 7. MVP
### Public website
- Home
- Property Management
- Commercial Management
- Airbnb
- Investors
- Property 360
- Pricing
- How It Works
- About
- Blog
- Contact
- English-ready architecture

### Lead system
- Property 360 wizard
- Contact forms
- UTM/source capture
- Lead persistence
- Lead status pipeline
- Basic protected lead admin

### Not MVP
- Full Owner Portal
- Tenant Portal
- Vendor Portal
- Full accounting
- Airbnb channel manager
- Guaranteed-rent engine

## 8. Preferred Technical Direction
- Next.js App Router
- TypeScript strict
- Tailwind CSS
- Zod
- Supabase when persistence/auth is needed
- Vercel
- GA4 + Search Console
- Meta Pixel when campaigns start

The existing repository must be audited before forcing these choices if a valid current stack already exists.

## 9. Required Documentation
- `PROJECT.md` — living source of truth
- `AUDIT.md`
- `KEEP_REMOVE_REFACTOR.md`
- `TASKS.md`
- `CHANGELOG.md`
- `DECISIONS.md`

## 10. Implementation Order
1. Audit existing project
2. Clean/restructure
3. Design system + layout + RTL
4. Homepage
5. Property 360
6. Service pages
7. Lead admin
8. SEO / Analytics / Accessibility / Performance
9. English
10. Owner Portal (later phase)

## 11. Quality Gates
Before marking a phase complete:
- Build passes
- Type checking passes
- No critical console errors
- Responsive tested
- RTL tested
- Forms validated
- Accessibility basics checked
- SEO metadata checked
- Documentation updated

## 12. Current Status
**Status:** Waiting for repository audit.

## 13. Next Action
Open the current TOPROP website project in Claude Code / VS Code, ask Claude to read `TOPROP_BUILD_SPEC.json`, audit the entire repository, and create:
- `AUDIT.md`
- `KEEP_REMOVE_REFACTOR.md`
- updated `PROJECT.md`
- ordered `TASKS.md`

No major deletions before that audit is reviewed.
