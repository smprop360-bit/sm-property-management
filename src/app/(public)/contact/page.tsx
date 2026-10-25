import Link from 'next/link'
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'
import { LeadForm } from '@/components/forms/LeadForm'

export const metadata = {
  title: 'צור קשר | S&M Property Management',
  description: 'דברו איתנו על הנכס שלכם. שלומי ומוטי זמינים לשיחה ולהסביר בדיוק איך אנחנו עובדים.',
}

const contactMethods = [
  {
    icon: Phone,
    label: 'טלפון',
    value: '055-260-1077',
    sub: 'זמינים ראשון–שישי, 8:00–19:00',
    href: 'tel:+972552601077',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'שלחו הודעה עכשיו',
    sub: 'מגיבים בדרך כלל תוך שעה',
    href: 'https://wa.me/972552601077',
  },
  {
    icon: Mail,
    label: 'אימייל',
    value: 'info@sm-property.co.il',
    sub: 'תגובה תוך יום עסקים',
    href: 'mailto:info@sm-property.co.il',
  },
  {
    icon: MapPin,
    label: 'כתובת',
    value: 'תל אביב–יפו',
    sub: 'פגישות בתיאום מראש',
    href: null,
  },
]

const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
}

const goldGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e5a83e, #C8902E)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function ContactPage() {
  return (
    <div style={{ background: '#091524', color: '#fff' }}>

      {/* ── HERO ── */}
      <section
        className="relative px-6 py-24 text-white overflow-hidden lg:px-10 lg:py-36"
        style={{
          background: `
            linear-gradient(160deg, rgba(9,21,36,0.92) 0%, rgba(8,39,79,0.85) 60%, rgba(9,21,36,0.96) 100%),
            url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80') center/cover no-repeat
          `,
        }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(200,144,46,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="mx-auto max-w-7xl relative z-10">
          <p className="text-sm font-bold tracking-[0.18em] mb-5" style={{ color: '#C8902E' }}>
            <span style={{ color: '#ffffff', fontSize: '1.15em' }}>S&amp;M</span> / צור קשר
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl mb-6 max-w-3xl">
            בואו נדבר על{' '}
            <span style={goldGradient}>הנכס שלכם.</span>
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-white/65">
            ספרו לנו מעט על הנכס ועל מה שחשוב לכם. נחזור אליכם עם הצעד הבא שמתאים לכם.
          </p>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { icon: CheckCircle, text: 'ייעוץ ראשוני ללא עלות' },
              { icon: Clock, text: 'חזרה תוך יום עסקים' },
              { icon: CheckCircle, text: 'ללא התחייבות' },
            ].map(item => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-center gap-2 text-white/60 text-sm">
                  <Icon size={15} className="text-[#C8902E] shrink-0" />
                  {item.text}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-6 py-16 lg:px-10 lg:py-24" style={{ background: '#0D1F38' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">

            {/* ── Left: Contact methods ── */}
            <div>
              <p className="text-[#C8902E] text-sm font-bold tracking-widest uppercase mb-3">ערוצי יצירת קשר</p>
              <h2 className="font-heading text-3xl font-bold mb-3">ערוץ שנוח לכם.</h2>
              <p className="text-white/55 leading-relaxed mb-8">
                אפשר להשאיר פרטים בטופס, להתקשר או לשלוח הודעה. נשמור על שיחה ממוקדת וללא התחייבות.
              </p>

              <div className="space-y-3 mb-10">
                {contactMethods.map(method => {
                  const Icon = method.icon
                  const content = (
                    <div
                      className="group flex items-center gap-4 transition-all duration-200"
                      style={{
                        ...glassCard,
                        padding: '16px 20px',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(200,144,46,0.15)', border: '1px solid rgba(200,144,46,0.25)' }}
                      >
                        <Icon size={18} className="text-[#C8902E]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/40 tracking-wide mb-0.5">{method.label}</p>
                        <p className="font-semibold text-white text-sm">{method.value}</p>
                        <p className="text-xs text-white/45 mt-0.5">{method.sub}</p>
                      </div>
                      {method.href && (
                        <ArrowLeft size={16} className="text-[#C8902E] mr-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  )

                  return method.href ? (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={method.label}>{content}</div>
                  )
                })}
              </div>

              {/* Property360 nudge */}
              <div
                style={{
                  ...glassCard,
                  padding: '24px',
                  borderTop: '2px solid #C8902E',
                }}
              >
                <p className="text-[#C8902E] text-xs font-bold tracking-widest uppercase mb-2">לא בטוחים מאיפה להתחיל?</p>
                <h3 className="font-bold text-lg mb-2">התחילו מבדיקת Property360</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  ניתוח חינם של הנכס שלכם — השוואת מסלולים והמלצה ספציפית.
                </p>
                <Link
                  href="/property-360"
                  className="inline-flex items-center gap-2 font-semibold text-sm transition-colors"
                  style={{ color: '#C8902E' }}
                >
                  קראו עוד
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div
              style={{
                ...glassCard,
                padding: '40px',
                borderTop: '3px solid #C8902E',
                borderRadius: '24px',
              }}
            >
              <p className="text-[#C8902E] text-xs font-bold tracking-widest uppercase mb-2">השאירו פרטים</p>
              <h2 className="font-heading text-2xl font-bold mb-1">נחזור אליכם בהקדם.</h2>
              <p className="text-white/50 text-sm mb-8">שם וטלפון מספיקים כדי להתחיל. פרטים נוספים יעזרו לנו להגיע מוכנים.</p>
              <LeadForm leadType="owner" />
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
