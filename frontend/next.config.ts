import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    experimental: {
        inlineCss: true
    }
}

export default withSentryConfig(withNextIntl(nextConfig), {
    org: 'nazar-p6',
    project: 'javascript-nextjs',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: false,
    sourcemaps: {
        disable: true
    },
    disableLogger: true
})
