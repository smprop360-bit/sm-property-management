import type { MetadataRoute } from 'next'
import { localePath, locales } from '@/i18n/config'

const routes = [
  '/',
  '/property-management',
  '/commercial-property-management',
  '/airbnb-management',
  '/investors',
  '/property-360',
  '/pricing',
  '/how-it-works',
  '/about',
  '/blog',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((lang) => ({
      url: `https://prop360.co.il${localePath(lang, route)}`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : route === '/property-360' ? 0.9 : 0.7,
    })),
  )
}
