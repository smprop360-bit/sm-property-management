import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const hostname = host.split(':')[0]
  const parts = hostname.split('.')

  // Skip plain localhost, plain domain (toprop.co.il = 2 parts), or IPv4
  if (parts.length <= 2 || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return NextResponse.next()
  }

  const subdomain = parts[0]

  if (subdomain === 'www' || subdomain === 'admin') {
    return NextResponse.next()
  }

  // Only rewrite if subdomain looks like a valid slug
  if (!/^[a-z0-9-]+$/i.test(subdomain)) {
    return NextResponse.next()
  }

  // Rewrite subdomain to /property/[slug]
  const url = request.nextUrl.clone()
  url.pathname = `/property/${subdomain}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
