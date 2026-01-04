import HeaderWrapper from '@/components/shared/HeaderWrapper';
import ScrollToTop from '@/components/shared/ScrollToTop';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import Footer from '@/components/shared/footer/Footer';
import { AppContextProvider } from '@/context/AppContext';
import { I18nProvider } from '@/i18n/client';
import { getLocale, getTranslations } from '@/i18n/server';
import { localeConfig } from '@/i18n/config';
import { interTight } from '@/utils/font';
import { generateMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  ...generateMetadata(),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getTranslations();
  const { direction } = localeConfig[locale];

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${interTight.variable} antialiased`}>
        <AppContextProvider>
          <I18nProvider locale={locale} dictionary={dictionary}>
            <Suspense>
              <SmoothScrollProvider>
                <HeaderWrapper />
                {children}
                <Footer />
                <ScrollToTop />
              </SmoothScrollProvider>
            </Suspense>
          </I18nProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
