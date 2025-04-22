import { GoogleOAuthProvider } from '@react-oauth/google'
import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { TooltipProvider } from '@/components/ui/tooltip'
import { type Locale, routing } from '@/i18n/routing'
import { AuthProvider } from '@/providers/auth-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'

interface LocaleLayoutProps extends PropsWithChildren {
    params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
    title: 'Amster Flora',
    description: 'Amster Flora'
}

const montserrat = Montserrat({
    subsets: ['cyrillic'],
    weight: ['400', '500', '600', '700'],
    display: 'block',
    preload: true
})

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
    const { locale } = await params

    if (!routing.locales.includes(locale as Locale)) {
        notFound()
    }

    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body
                className={`${montserrat.className} flex min-h-screen flex-col overflow-x-hidden antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ReactQueryProvider>
                        <NuqsAdapter>
                            <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
                                <AuthProvider>
                                    <TooltipProvider>
                                        <Header />
                                        <main className='flex-grow'>{children}</main>
                                        <Footer />
                                    </TooltipProvider>
                                </AuthProvider>
                            </GoogleOAuthProvider>
                        </NuqsAdapter>
                    </ReactQueryProvider>
                    <Toaster richColors />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default LocaleLayout
