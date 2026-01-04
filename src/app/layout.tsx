import HeaderWrapper from '@/components/shared/HeaderWrapper';
import ScrollToTop from '@/components/shared/ScrollToTop';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import Footer from '@/components/shared/footer/Footer';
import { AppContextProvider } from '@/context/AppContext';
import { I18nProvider } from '@/i18n/client';
import { getLocale, getTranslations } from '@/i18n/server';
import { localeConfig } from '@/i18n/config';
import { interTight } from '@/utils/font';
import { SITE_URL, SITE_NAME, seoContent } from '@/utils/seo';
import type { Metadata, Viewport } from 'next';
import { ReactNode, Suspense } from 'react';
import './globals.css';

// Default metadata for the entire site
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  verification: {
    // Add Google Search Console verification if available
    // google: 'your-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getTranslations();
  const { direction } = localeConfig[locale];
  const { hreflang } = seoContent[locale];

  // Map locale to proper BCP 47 language tag
  const langMap: Record<string, string> = {
    fr: 'fr-LU',
    en: 'en-LU',
    pt: 'pt-PT',
  };

  return (
    <html lang={langMap[locale] || locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* Hreflang tags for multilingual SEO */}
        <link rel="alternate" hrefLang="fr-LU" href={SITE_URL} />
        <link rel="alternate" hrefLang="en-LU" href={SITE_URL} />
        <link rel="alternate" hrefLang="pt-PT" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        {/* Geo meta tags for Luxembourg */}
        <meta name="geo.region" content="LU" />
        <meta name="geo.placename" content="Sandweiler" />
        <meta name="geo.position" content="49.6167;6.2333" />
        <meta name="ICBM" content="49.6167, 6.2333" />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
