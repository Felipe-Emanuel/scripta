import { NextRequest, NextResponse } from 'next/server'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { TSessionCustomer } from '@shared/types'

export default async function middleware(nextRequest: NextRequest) {
  const stringfy = nextRequest.cookies.get('_sst')?.value
  const sessionCustomer: TSessionCustomer = stringfy && JSON.parse(stringfy)
  const token = sessionCustomer?.accessToken

  const signUrl = new URL(APP_ROUTES.public.auth.name, nextRequest.url)
  const isAuthUrl = nextRequest.nextUrl.pathname === APP_ROUTES.public.auth.name

  if (token) {
    if (isAuthUrl) {
      const dashboardUrl = new URL(APP_ROUTES.private.dashboard.name, nextRequest.url)
      return NextResponse.redirect(dashboardUrl)
    }
    return NextResponse.next()
  }

  if (!token) {
    if (isAuthUrl) {
      return NextResponse.next()
    }
    return NextResponse.redirect(signUrl)
  }
}

export const config = {
  matcher: [
    '/',
    '/auth',
    '/dashboard',
    '/books',
    '/characters',
    '/profile',
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
