import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { redirect } from 'next/navigation'
import { isLoggedIn, getSession } from 'lib/session';

export async function middleware(request: NextRequest) {
  const login = await isLoggedIn();
  if (!login && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login
     * - logout
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!login|logout|_next/static|_next/image|favicon.ico).*)',
  ],
}