import { getT, pageMeta } from '@/i18n/server';
import type { LangProps } from '@/i18n/config';
export const generateMetadata = pageMeta('/accessibility', 'הצהרת נגישות', 'הצהרת נגישות של S&M Property Management בהתאם לתקן IS 5568 ותקנות שוויון זכויות לאנשים עם מוגבלות.');

export default async function AccessibilityPage({ params }: LangProps) {
  const { lang } = await params;
  const t = getT(lang);
  return (
    <div style={{ background: '#091524', color: '#fff', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 py-20 lg:px-8">

        <p className="text-sm font-bold tracking-[0.18em] mb-4" style={{ color: '#C8902E' }}>
          {t('S&M / נגישות')}
        </p>
        <h1 className="font-heading text-4xl font-bold mb-3 sm:text-5xl">
          {t('הצהרת נגישות')}
        </h1>
        <p className="text-white/50 text-sm mb-12">{t('עודכן לאחרונה: אוקטובר 2026')}</p>

        <div className="space-y-10 leading-8 text-white/80">

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>{t('מחויבות לנגישות')}</h2>
            <p>
              {t('S&M Property Management מחויבת להנגיש את אתר האינטרנט שלה לכלל הציבור, לרבות אנשים עם מוגבלות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998, ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013.')}
            </p>
            <p className="mt-3">
              {t('האתר בנוי בהתאם לתקן הישראלי IS 5568, המבוסס על הנחיות WCAG 2.0 ברמה AA.')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>{t('התאמות נגישות שבוצעו')}</h2>
            <ul className="space-y-2 list-none">
              {[
                t('האתר מוגדר לקריאה מימין לשמאל (RTL) בשפה העברית'),
                t('ניתן לנווט באתר באמצעות מקלדת בלבד'),
                t('קיים יחס ניגודיות מספק בין הטקסט לרקע'),
                t('לכל התמונות יש תיאור טקסטואלי חלופי (alt text)'),
                t('כל שדות הטפסים מסומנים בתוויות (labels) ברורות'),
                t('מבנה כותרות היררכי ועקבי בכל עמודי האתר'),
                t('גודל הטקסט ניתן לשינוי ללא אובדן פונקציונליות עד 200%'),
                t('הקישורים מתארים את יעדם בצורה ברורה'),
                t('אין תוכן מהבהב שעלול לגרום לפרכוס'),
                t('האתר תואם לדפדפנים המודרניים ולמכשירים ניידים'),
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span style={{ color: '#C8902E', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>{t('מגבלות נגישות ידועות')}</h2>
            <p>
              {t('אנו עובדים באופן מתמיד לשיפור הנגישות. להלן מגבלות ידועות שאנו עובדים לתקן:')}
            </p>
            <ul className="mt-3 space-y-2 list-none">
              <li className="flex gap-3 items-start">
                <span style={{ color: '#e5a83e', flexShrink: 0 }}>•</span>
                <span>{t('חלק מהתכנים שנוצרו על ידי צדדים שלישיים (כגון מפות) עשויים שלא לעמוד במלוא דרישות הנגישות.')}</span>
              </li>
              <li className="flex gap-3 items-start">
                <span style={{ color: '#e5a83e', flexShrink: 0 }}>•</span>
                <span>{t('קובצי PDF ישנים באתר עשויים שלא להיות נגישים במלואם — ניתן לבקש גרסה נגישה בפנייה אלינו.')}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>{t('פנייה בנושא נגישות')}</h2>
            <p>
              {t('נתקלתם בבעיית נגישות באתר? יש לכם הצעה לשיפור? אנחנו כאן לעזור.')}
            </p>
            <p className="mt-2">
              {t('ניתן לפנות אלינו בכל אחת מהדרכים הבאות, ונשתדל להשיב בתוך 5 ימי עסקים:')}
            </p>
            <div className="mt-4 p-5 rounded-2xl space-y-3" style={{ background: 'rgba(200,144,46,0.08)', border: '1px solid rgba(200,144,46,0.2)' }}>
              <p>
                <strong style={{ color: '#C8902E' }}>{t('דוא"ל:')} </strong>
                <a href="mailto:info@prop360.co.il" className="hover:underline" style={{ color: '#fff' }}>
                  info@prop360.co.il
                </a>
              </p>
              <p>
                <strong style={{ color: '#C8902E' }}>{t('טלפון:')} </strong>
                <a href="tel:+972552601077" className="hover:underline" style={{ color: '#fff' }} dir="ltr">
                  055-260-1077
                </a>
              </p>
              <p>
                <strong style={{ color: '#C8902E' }}>WhatsApp: </strong>
                <a href="https://wa.me/972552601077" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#fff' }}>
                  {t('שלחו הודעה')}
                </a>
              </p>
            </div>
            <p className="mt-4 text-white/55 text-sm">
              {t('בקשה לתיקון ליקוי נגישות תועבר לטיפול בהקדם ולא יאוחר מ-60 יום מקבלת הפנייה, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (תקנה 35א(ג)).')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>{t('מידע נוסף')}</h2>
            <p>
              {t('למידע נוסף על נגישות דיגיטלית בישראל ניתן לפנות ל')}
              <a
                href="https://www.gov.il/he/departments/moj_disability_rights"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline mx-1"
                style={{ color: '#C8902E' }}
              >
                {t('נציבות שוויון זכויות לאנשים עם מוגבלות')}
              </a>
              {t('במשרד המשפטים.')}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
