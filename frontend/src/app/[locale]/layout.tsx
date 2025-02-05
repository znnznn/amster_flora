import { Locale, routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';



interface LocaleLayoutProps extends PropsWithChildren {
  params: { locale: string };
}
const LocaleLayout = async ({
  children,
  params: { locale }
}: LocaleLayoutProps) => {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;