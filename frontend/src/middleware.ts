import createMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'

import { getMiddlewareAccessToken } from './api/auth/server-auth-storage'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export const middleware = (request: NextRequest) => {
    const response = intlMiddleware(request)

    const { pathname } = request.nextUrl

    const token = getMiddlewareAccessToken(request)

    // if (!PUBLIC_ROUTES.includes(pathname.replace(/^\/(uk|en)/, '/')) && !token) {
    //     if (!token) {
    //         return NextResponse.redirect(new URL('/', request.url))
    //     }
    //     return response
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
