import { NextRequest, NextResponse } from 'next/server'
import { isLocale } from '@/i18n/config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  const url = request.nextUrl.clone()

  if (first === 'admin') return NextResponse.next()

  // Hebrew lives on the unprefixed URLs, so /he/* would only duplicate them.
  if (first === 'he') {
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }
  if (isLocale(first)) return NextResponse.next()

  url.pathname = `/he${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[^/]+$).*)'],
}
