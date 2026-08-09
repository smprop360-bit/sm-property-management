# TOPROP Website — Rebuild Design Spec
**Date:** 2026-08-08  
**Status:** Approved  
**Source of truth:** `TOPROP_BUILD_SPEC.json`

---

## 1. מטרה

בניית אתר לידים פרמיום עבור חברת TOPROP לניהול נכסים. האתר מחליף את המבנה הנוכחי (site של רישום נכסים) ב-site לידים ממוקד המרה, עברית RTL ראשית, mobile-first.

---

## 2. ניקוי — מה נמחק

| קובץ / תיקייה | סיבה |
|---|---|
| `src/app/(public)/owners/` | לא בספק החדש |
| `src/app/(public)/seekers/` | לא בספק החדש |
| `src/app/(public)/properties/` | לא רלוונטי לאתר ליד-ג׳נרציה |
| `src/app/(public)/property/` | לא רלוונטי |
| `src/app/(public)/lp/bnei-brak/` | לנדינג פייג׳ ישן |
| `src/app/(public)/lp/metropark/` | לנדינג פייג׳ ישן |
| `src/components/forms/SeekerLeadForm.tsx` | שייך ל-seekers |
| `src/components/public/PropertiesFilters.tsx` | שייך לרישום נכסים |
| `src/components/public/PropertyContactForm.tsx` | שייך לרישום נכסים |
| `src/components/shared/PropertyCard.tsx` | שייך לרישום נכסים |
| `src/hooks/useSeekerLeadForm.ts` | שייך ל-seekers |
| `src/hooks/usePropertyContactForm.ts` | שייך לרישום נכסים |
| `design-system/MASTER.md` | צבעים ופונטים שגויים — ייכתב מחדש |

**מה נשאר בלי שינוי:** כל האדמין (`/admin/*`, קומפוננטים, hooks), shadcn/ui primitives, Supabase clients, lib/types, lib/utils, lib/proxy.ts.

---

## 3. תיקונים

| מה | מה משתנה |
|---|---|
| `src/app/layout.tsx` | מטא-דאטה: כותרת → "TOPROP \| ניהול נכסים, השכרה והשקעות" |
| `src/app/globals.css` | צבעי brand: navy `#08274F`, navy-dark `#051A34`, gold `#C8902E`, gold-soft `#D9AE55`, surface `#F7F8FA`, text `#0B1F36`, muted `#687386` |
| `design-system/MASTER.md` | נכתב מחדש: פונטים Heebo + Frank Ruhl, צבעי navy/gold |
| `src/components/shared/PublicHeader.tsx` | ניווט חדש לפי IA הספק |
| `src/components/shared/PublicFooter.tsx` | תוכן ועיצוב לפי הספק |

---

## 4. ארכיטקטורת נתיבים חדשה

```
src/app/(public)/
├── page.tsx                               # /
├── property-management/page.tsx           # ניהול נכסים
├── commercial-property-management/page.tsx # ניהול נכסים מסחריים
├── airbnb-management/page.tsx             # Airbnb
├── investors/page.tsx                     # למשקיעים
├── property-360/page.tsx                  # ויזארד + שמירת ליד
├── pricing/page.tsx                       # מחירון וחבילות
├── how-it-works/page.tsx                  # איך זה עובד
├── about/page.tsx                         # אודות
├── blog/page.tsx                          # מאמרים
├── contact/page.tsx                       # צור קשר
├── en/page.tsx                            # English (שלד)
├── lp/[slug]/page.tsx                     # לנדינג פייג׳ דינמי (נשאר)
└── thank-you/page.tsx                     # דף תודה (מעודכן)
```

---

## 5. קומפוננטים חדשים

```
src/components/
├── home/
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── Property360Section.tsx
│   ├── WhyTopropSection.tsx
│   ├── OwnerPortalPreview.tsx
│   ├── HowItWorksSection.tsx
│   ├── OverseasSection.tsx
│   ├── CommercialSection.tsx
│   ├── AirbnbSection.tsx
│   └── FinalCtaSection.tsx
├── property-360/
│   ├── WizardShell.tsx
│   └── steps/
│       ├── Step1PropertyType.tsx
│       ├── Step2Location.tsx
│       ├── Step3Details.tsx
│       ├── Step4Status.tsx
│       ├── Step5Income.tsx
│       ├── Step6Interest.tsx
│       └── Step7Contact.tsx
└── shared/
    ├── PublicHeader.tsx   # ריבילד
    └── PublicFooter.tsx   # ריבילד
```

---

## 6. עיצוב דף הבית

### 6.1 Hero
- רקע navy `#08274F` עם texture/gradient עדין
- כותרת: Frank Ruhl Libre, גדול, לבן — "הנכס שלך צריך לעבוד בשבילך."
- תיאור: Heebo 400, לבן/opacity
- שורת תמיכה: "ניהול לטווח ארוך • Airbnb • מסחרי • השבחה • שותפויות"
- CTA ראשי: כפתור gold מלא — "בדיקת הנכס שלי"
- CTA משני: כפתור outline לבן — "דברו איתנו"

### 6.2 Services
- רקע לבן, 5 כרטיסים בגריד
- כל כרטיס: אייקון + כותרת + משפט + חץ לעמוד שירות
- שירותים: ניהול ארוך טווח, Airbnb, מסחרי, השבחה, שותפויות

### 6.3 Property 360
- רקע `#F7F8FA`, accent gold
- כותרת "TOPROP Property 360"
- 5 נקודות עם צ׳קמארקים
- CTA: "קבלו בדיקת Property 360"

### 6.4 למה TOPROP
- רקע לבן, 5 עמודות/כרטיסים
- ללא מספרים מומצאים
- ערכים: שקיפות מלאה, חשיבה כלכלית, כתובת אחת, ניהול מקצועי, טכנולוגיה

### 6.5 Owner Portal Preview
- רקע navy כהה `#051A34`
- 5 KPI cards — demo בלבד, לא מחובר לנתונים אמיתיים
- "גם כשאנחנו מנהלים — אתם תמיד בשליטה."

### 6.6 איך זה עובד
- 6 שלבים ממוספרים, timeline אופקי/אנכי
- ללא עיצוב עמוס

### 6.7 Overseas
- סקשן קצר, navy, לבעלי נכסים מחו"ל
- CTA: "ניהול נכס מרחוק"

### 6.8 מסחרי + Airbnb
- 2 סקשנים קומפקטיים זה לצד זה (desktop) / מוערמים (mobile)
- CTA לכל אחד לעמוד השירות

### 6.9 Final CTA
- רקע gold `#C8902E`
- "רוצים לדעת מה הנכס שלכם יכול לעשות יותר טוב?"
- 2 כפתורים: navy + outline

---

## 7. Property 360 — ויזארד

7 שלבים לינאריים עם progress bar:

| שלב | תוכן | שדות |
|-----|-------|-------|
| 1 | סוג נכס | דירה / בית / משרד / חנות / מחסן / אחר |
| 2 | מיקום | עיר + כתובת |
| 3 | פרטי נכס | שטח, חדרים, קומה, חניה, מעלית, מרפסת |
| 4 | מצב נכס | מושכר / פנוי / שוכר עוזב / שיפוץ |
| 5 | הכנסה | שכירות נוכחית + שאיפה (אופציונלי) |
| 6 | תחומי עניין | ניהול / ארוך טווח / Airbnb / השבחה / שותפות / לא בטוח |
| 7 | פרטי קשר | שם, טלפון, אימייל, הסכמה |

**אחרי הגשה:** שמירה ב-Supabase, UTM capture, הפניה ל-`/thank-you`.  
**אין הבטחת הערכה אוטומטית.**

---

## 8. Header חדש

ניווט: ראשי | ניהול נכסים | השכרה | Airbnb | מסחרי | למשקיעים | איך זה עובד | אודות | צור קשר

CTA בheader: "בדיקת הנכס שלי" (gold) + "כניסת בעלי נכסים" (outline, מוביל לאדמין)

Mobile: hamburger menu, RTL

---

## 9. Footer חדש

- שורה 1: לוגו + tagline
- שורה 2: קישורי ניווט
- שורה 3: פרטי קשר (טלפון, אימייל, WhatsApp)
- שורה 4: זכויות יוצרים + קישורי משפטי

---

## 10. עיצוב — צבעים ופונטים

| טוקן | ערך |
|------|-----|
| navy | `#08274F` |
| navy-dark | `#051A34` |
| gold | `#C8902E` |
| gold-soft | `#D9AE55` |
| white | `#FFFFFF` |
| surface | `#F7F8FA` |
| text | `#0B1F36` |
| muted | `#687386` |

**פונטים:**
- כותרות: Frank Ruhl Libre (כבר טעון)
- גוף: Heebo (כבר טעון)

---

## 11. שלבי ביצוע

| שלב | מה בונים | תוצאה |
|-----|-----------|--------|
| 0 | ניקוי + תיקוני עיצוב + header/footer | repo נקי ומיושר |
| 1 | דף הבית — כל 9 הסקשנים | עמוד הבית פרודקשן-רדי |
| 2 | Property 360 ויזארד + שמירת ליד | זרימת ליד מלאה |
| 3 | עמודי שירות (property-management, commercial, airbnb, investors) | 4 עמודי שירות |
| 4 | pricing + how-it-works + about + contact + blog + en | אתר מלא |
| 5 | SEO + אנליטיקס + נגישות + build check | מוכן לאוויר |

---

## 12. שערי איכות לכל שלב

- `npm run build` עובר ללא שגיאות
- `npm run lint` נקי
- RTL נבדק בנייד ובדסקטופ
- אין מספרים/נתונים מומצאים
- טפסים מאומתים בצד שרת
- UTM נשמר עם כל ליד
