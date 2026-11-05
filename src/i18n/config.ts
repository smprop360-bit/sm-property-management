export const locales = ['he', 'en', 'ru', 'fr'] as const
export type Locale = (typeof locales)[number]
export type LangProps = { params: Promise<{ lang: string }> }

export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s)

export function stripLocale(path: string) {
  const first = path.split('/')[1]
  return isLocale(first) ? path.slice(first.length + 1) || '/' : path
}

// Hebrew keeps the original unprefixed URLs. /admin exists only in Hebrew.
export function localePath(lang: string, href: string) {
  if (lang === 'he' || !href.startsWith('/') || href.startsWith('/admin')) return href
  return href === '/' ? `/${lang}` : `/${lang}${href}`
}
