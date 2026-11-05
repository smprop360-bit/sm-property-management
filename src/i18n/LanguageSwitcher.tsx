'use client'

import { usePathname } from 'next/navigation'
import { useLang } from './client'
import { localePath, stripLocale } from './config'

// Inline SVG: emoji flags do not render on Windows.
const flags: Record<string, React.ReactNode> = {
  he: (
    <>
      <rect width="24" height="16" fill="#fff" />
      <rect y="1.5" width="24" height="2.2" fill="#0038b8" />
      <rect y="12.3" width="24" height="2.2" fill="#0038b8" />
      <path d="M12 4.6l2.9 5H9.1zM12 11.4l-2.9-5h5.8z" fill="none" stroke="#0038b8" strokeWidth=".7" />
    </>
  ),
  en: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3" />
    </>
  ),
  ru: (
    <>
      <rect width="24" height="16" fill="#fff" />
      <rect y="5.33" width="24" height="5.34" fill="#0039a6" />
      <rect y="10.67" width="24" height="5.33" fill="#d52b1e" />
    </>
  ),
  fr: (
    <>
      <rect width="24" height="16" fill="#fff" />
      <rect width="8" height="16" fill="#0055a4" />
      <rect x="16" width="8" height="16" fill="#ef4135" />
    </>
  ),
}

const names: Record<string, string> = { he: 'עברית', en: 'English', ru: 'Русский', fr: 'Français' }

export default function LanguageSwitcher() {
  const lang = useLang()
  const path = stripLocale(usePathname())

  return (
    <nav aria-label="Language" dir="ltr" className="flex items-center gap-1">
      {Object.keys(flags).map((l) => (
        // Plain <a>: switching language must reload the root layout (<html lang dir>).
        <a
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          lang={l}
          title={names[l]}
          aria-label={names[l]}
          aria-current={l === lang ? 'true' : undefined}
          className={`inline-flex items-center justify-center min-h-9 min-w-9 transition-opacity ${
            l === lang ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            aria-hidden="true"
            style={{ borderRadius: 2, outline: l === lang ? '1.5px solid #C8902E' : '1px solid rgba(255,255,255,0.25)', outlineOffset: 1 }}
          >
            {flags[l]}
          </svg>
        </a>
      ))}
    </nav>
  )
}
