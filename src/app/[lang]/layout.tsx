import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, locales, type LangProps } from '@/i18n/config'
import { I18nProvider } from '@/i18n/client'
import { getDict, getT } from '@/i18n/server'
import '../globals.css'

const ogLocale: Record<string, string> = { he: 'he_IL', en: 'en_US', ru: 'ru_RU', fr: 'fr_FR' }

export const generateStaticParams = () => locales.map((lang) => ({ lang }))

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const { lang } = await params
  const t = getT(lang)
  return {
    title: {
      default: `S&M Property Management | ${t('ניהול נכסים בגישה אישית')}`,
      template: '%s | S&M Property Management',
    },
    description: t('ניהול נכסים, השכרה, תחזוקה ו-PROPERTY360 — עם תקשורת ברורה ותהליך עבודה מסודר.'),
    metadataBase: new URL('https://prop360.co.il'),
    openGraph: {
      siteName: 'S&M Property Management',
      url: 'https://prop360.co.il',
      locale: ogLocale[lang],
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function RootLayout({ children, params }: LangProps & { children: React.ReactNode }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <html lang={lang} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <body className="font-sans antialiased">
        <I18nProvider lang={lang} dict={getDict(lang)}>{children}</I18nProvider>
      </body>
    </html>
  )
}
