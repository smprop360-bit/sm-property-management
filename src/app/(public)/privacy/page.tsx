export const metadata = {
  title: 'מדיניות פרטיות | S&M Property Management',
  description: 'מדיניות הפרטיות של S&M Property Management — כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם בהתאם לחוק הגנת הפרטיות הישראלי.',
};

export default function PrivacyPage() {
  return (
    <div style={{ background: '#091524', color: '#fff', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 py-20 lg:px-8" dir="rtl" lang="he">

        <p className="text-sm font-bold tracking-[0.18em] mb-4" style={{ color: '#C8902E' }}>
          S&amp;M / פרטיות
        </p>
        <h1 className="font-heading text-4xl font-bold mb-3 sm:text-5xl">
          מדיניות פרטיות
        </h1>
        <p className="text-white/50 text-sm mb-12">עודכן לאחרונה: אוקטובר 2026</p>

        <div className="space-y-10 leading-8 text-white/80">

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>מבוא</h2>
            <p>
              S&amp;M Property Management (&quot;החברה&quot;, &quot;אנחנו&quot;) מחויבת להגן על פרטיותכם.
              מדיניות זו מסבירה אילו פרטים אנו אוספים, כיצד אנו משתמשים בהם, ומהן זכויותיכם בהתאם
              לחוק הגנת הפרטיות, תשמ&quot;א-1981, ותקנות הגנת הפרטיות (אבטחת מידע), תשע&quot;ז-2017.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>מידע שאנו אוספים</h2>
            <p className="mb-3">אנו עשויים לאסוף את סוגי המידע הבאים:</p>
            <ul className="space-y-2 list-none">
              {[
                'פרטי זיהוי: שם מלא, כתובת דוא"ל, מספר טלפון',
                'פרטי נכס: כתובת הנכס, סוג הנכס, פרטי שכירות',
                'מידע פיננסי: פרטים לצרכי חיוב ותשלומים (מוצפן ומאובטח)',
                'מידע טכני: כתובת IP, סוג דפדפן, עמודים שנצפו — לצרכי אנליטיקה בלבד',
                'תכתובת: הודעות שנשלחו דרך טפסי יצירת קשר או וואטסאפ',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span style={{ color: '#C8902E', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>כיצד אנו משתמשים במידע</h2>
            <ul className="space-y-2 list-none">
              {[
                'מתן שירותי ניהול נכסים ויצירת קשר בנושא בקשותיכם',
                'ניהול חוזי שכירות ועסקאות נדל"ן',
                'שיפור האתר וחוויית המשתמש',
                'שליחת עדכונים ומידע רלוונטי (בהסכמתכם בלבד)',
                'עמידה בדרישות חוקיות ורגולטוריות',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span style={{ color: '#C8902E', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>שיתוף מידע עם צדדים שלישיים</h2>
            <p>
              אנו לא מוכרים ולא משכירים את המידע האישי שלכם לצדדים שלישיים. המידע עשוי להיות משותף
              רק במקרים הבאים:
            </p>
            <ul className="mt-3 space-y-2 list-none">
              <li className="flex gap-3 items-start">
                <span style={{ color: '#e5a83e', flexShrink: 0 }}>•</span>
                <span><strong>ספקי שירות:</strong> כגון ספקי תשלומים, פלטפורמות CRM — אך ורק לצורך מתן השירות.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span style={{ color: '#e5a83e', flexShrink: 0 }}>•</span>
                <span><strong>דרישה חוקית:</strong> כאשר נדרש על פי חוק, צו שיפוטי, או רשות מוסמכת.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span style={{ color: '#e5a83e', flexShrink: 0 }}>•</span>
                <span><strong>הגנה על זכויות:</strong> למניעת הונאה או לצרכי אבטחה.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>אבטחת מידע</h2>
            <p>
              אנו נוקטים באמצעי אבטחה טכניים וארגוניים מתאימים להגנה על המידע שלכם, לרבות הצפנת
              SSL/TLS, גישה מוגבלת על בסיס הצורך, ועמידה בתקנות הגנת הפרטיות (אבטחת מידע), תשע&quot;ז-2017.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>עוגיות (Cookies)</h2>
            <p>
              האתר עשוי להשתמש בעוגיות טכניות הכרחיות לתפקוד האתר. אנו לא משתמשים בעוגיות שיווקיות
              ולא עוקבים אחריכם ברחבי האינטרנט.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>שמירת מידע</h2>
            <p>
              אנו שומרים את המידע האישי שלכם כל עוד הוא נחוץ למטרות שלשמן נאסף, או כנדרש על פי חוק —
              בדרך כלל 7 שנים לצרכי תיעוד עסקי. לאחר מכן המידע יימחק בצורה מאובטחת.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>זכויותיכם</h2>
            <p className="mb-3">בהתאם לחוק הגנת הפרטיות, תשמ&quot;א-1981, עומדות לכם הזכויות הבאות:</p>
            <ul className="space-y-2 list-none">
              {[
                'זכות עיון: לבקש לראות את המידע האישי שאנו מחזיקים עליכם',
                'זכות תיקון: לדרוש תיקון מידע שגוי או לא מעודכן',
                'זכות מחיקה: לבקש מחיקת המידע בנסיבות מסוימות',
                'זכות הסרה מרשימות תפוצה: בכל עת, ללא תנאי',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span style={{ color: '#C8902E', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>פנייה בנושא פרטיות</h2>
            <p>לכל שאלה, בקשה, או תלונה בנושא הגנת הפרטיות, ניתן לפנות אלינו:</p>
            <div className="mt-4 p-5 rounded-2xl space-y-3" style={{ background: 'rgba(200,144,46,0.08)', border: '1px solid rgba(200,144,46,0.2)' }}>
              <p>
                <strong style={{ color: '#C8902E' }}>דוא&quot;ל: </strong>
                <a href="mailto:info@prop360.co.il" className="hover:underline" style={{ color: '#fff' }}>
                  info@prop360.co.il
                </a>
              </p>
              <p>
                <strong style={{ color: '#C8902E' }}>טלפון: </strong>
                <a href="tel:+972552601077" className="hover:underline" style={{ color: '#fff' }} dir="ltr">
                  055-260-1077
                </a>
              </p>
              <p>
                <strong style={{ color: '#C8902E' }}>WhatsApp: </strong>
                <a href="https://wa.me/972552601077" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#fff' }}>
                  שלחו הודעה
                </a>
              </p>
            </div>
            <p className="mt-4 text-white/55 text-sm">
              נשתדל להשיב לפניות בנושא פרטיות תוך 30 יום.
              במקרה של אי שביעות רצון, ניתן לפנות לרשות להגנת הפרטיות במשרד המשפטים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#C8902E' }}>שינויים במדיניות</h2>
            <p>
              אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר עם תאריך כניסה לתוקף.
              המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה למדיניות המעודכנת.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
