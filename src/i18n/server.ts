import type { Metadata } from 'next'
import { locales, localePath, type LangProps } from './config'
import enUi from './messages/en.json'
import ruUi from './messages/ru.json'
import frUi from './messages/fr.json'
import enContent from './messages/en.content.json'
import ruContent from './messages/ru.content.json'
import frContent from './messages/fr.content.json'

const SITE = 'https://prop360.co.il'
const ui: Record<string, Record<string, string>> = { en: enUi, ru: ruUi, fr: frUi }
const content: Record<string, Record<string, string>> = { en: enContent, ru: ruContent, fr: frContent }

// Sent to the browser. Article bodies and legal pages stay server-only.
export const getDict = (lang: string) => ui[lang] ?? {}

export function getT(lang: string) {
  const dict = { ...content[lang], ...ui[lang] }
  return (s: string) => dict[s] ?? s
}

export function metaFor(lang: string, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}${localePath(lang, path)}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE}${localePath(l, path)}`])),
    },
  }
}

export function pageMeta(path: string, title: string, description: string) {
  return async ({ params }: LangProps) => {
    const { lang } = await params
    const t = getT(lang)
    return metaFor(lang, path, t(title), t(description))
  }
}
