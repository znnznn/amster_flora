import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'

import { getMiddlewareAccessToken } from './api/auth/server-auth-storage'
import { PUBLIC_ROUTES } from './config/routes'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
    const response = intlMiddleware(request)

    const { pathname } = request.nextUrl

    if (!PUBLIC_ROUTES.includes(pathname.replace(/^\/(uk|en)/, '/'))) {
        const token = getMiddlewareAccessToken(request)

        if (!token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return response
    }

    // // Check for authentication token
    // const token = middlewareCookies.getAccessToken(request)
    // if (!token) {
    //     const loginUrl = new URL('/', request.url)
    //     loginUrl.searchParams.set('from', request.nextUrl.pathname)
    //     return NextResponse.redirect(loginUrl)
    // }

    return response
}

export const config = {
    matcher: [
        '/',
        '/(uk|en)/:path*',
        '/((?!_next/static|_next/image|favicon.ico|public/).*)'
    ]
}
