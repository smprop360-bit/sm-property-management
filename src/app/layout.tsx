import type { Metadata } from 'next'
import { Heebo, Frank_Ruhl_Libre } from 'next/font/google'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
})

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TOPROP | ניהול נכסים, השכרה והשקעות',
    template: '%s | TOPROP',
  },
  description: 'TOPROP מנהלת, משכירה ומשביחה נכסים פרטיים ומסחריים. שירות מלא לבעלי נכסים ומשקיעים.',
  metadataBase: new URL('https://toprop.co.il'),
  openGraph: {
    siteName: 'TOPROP',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frank.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
