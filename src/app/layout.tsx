import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'S&M Property Management | ניהול נכסים בגישה אישית',
    template: '%s | S&M Property Management',
  },
  description: 'ניהול נכסים, השכרה, תחזוקה ו-PROPERTY360 — עם תקשורת ברורה ותהליך עבודה מסודר.',
  metadataBase: new URL('https://prop360.co.il'),
  alternates: {
    canonical: 'https://prop360.co.il',
  },
  openGraph: {
    siteName: 'S&M Property Management',
    url: 'https://prop360.co.il',
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
