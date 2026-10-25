import type { MetadataRoute } from 'next'

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
  return routes.map((route) => ({
    url: `https://prop360.co.il${route}`,
    lastModified: new Date('2026-10-18'),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/property-360' ? 0.9 : 0.7,
  }))
}
