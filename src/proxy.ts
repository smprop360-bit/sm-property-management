import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
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

  // Subdomain routing disabled - property pages removed
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
