import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type PropsWithChildren } from 'react'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { type Locale, routing } from '@/i18n/routing'
import { ReactQueryProvider } from '@/providers/react-query-provider'

interface LocaleLayoutProps extends PropsWithChildren {
    params: { locale: string }
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

const LocaleLayout = async ({ children, params: { locale } }: LocaleLayoutProps) => {
    if (!routing.locales.includes(locale as Locale)) {
        notFound()
    }

    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body
                className={`${montserrat.className} flex min-h-screen flex-col antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ReactQueryProvider>
                        <NuqsAdapter>
                            <Header />
                            <main className='flex-grow'>{children}</main>
                            <Footer />
                        </NuqsAdapter>
                    </ReactQueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default LocaleLayout
