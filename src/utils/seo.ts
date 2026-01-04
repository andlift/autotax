import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

export const SITE_URL = 'https://autotax-zeta.vercel.app';
export const SITE_NAME = 'AUTO TAX & TECH';

// SEO metadata per locale
export const seoContent: Record<Locale, {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  hreflang: string;
}> = {
  fr: {
    title: 'AUTO TAX & TECH | Installation Taximètres & Réparation Vitres Automobiles | Luxembourg',
    description: 'Spécialiste de l\'installation de taximètres AIR W ULTRA et réparation de pare-brise au Luxembourg. Service certifié, rapide et professionnel à Sandweiler. Devis gratuit.',
    keywords: [
      'installation taximètre luxembourg',
      'taximètre AIR W ULTRA',
      'réparation pare-brise luxembourg',
      'vitres automobiles luxembourg',
      'équipement taxi luxembourg',
      'remplacement pare-brise sandweiler',
      'taximètre professionnel',
      'ATA Electronics luxembourg',
      'service taxi luxembourg',
      'vitre latérale automobile',
    ],
    ogLocale: 'fr_LU',
    hreflang: 'fr-LU',
  },
  en: {
    title: 'AUTO TAX & TECH | Taximeter Installation & Windshield Repair | Luxembourg',
    description: 'Expert AIR W ULTRA taximeter installation and windshield repair in Luxembourg. Certified, fast and professional service in Sandweiler. Free quote.',
    keywords: [
      'taximeter installation luxembourg',
      'AIR W ULTRA taximeter',
      'windshield repair luxembourg',
      'car glass luxembourg',
      'taxi equipment luxembourg',
      'windshield replacement sandweiler',
      'professional taximeter',
      'ATA Electronics luxembourg',
      'taxi service luxembourg',
      'side window repair',
    ],
    ogLocale: 'en_LU',
    hreflang: 'en-LU',
  },
  pt: {
    title: 'AUTO TAX & TECH | Instalação de Taxímetros & Reparação de Vidros | Luxemburgo',
    description: 'Especialista em instalação de taxímetros AIR W ULTRA e reparação de pára-brisas no Luxemburgo. Serviço certificado, rápido e profissional em Sandweiler. Orçamento gratuito.',
    keywords: [
      'instalação taxímetro luxemburgo',
      'taxímetro AIR W ULTRA',
      'reparação pára-brisas luxemburgo',
      'vidros automóveis luxemburgo',
      'equipamento táxi luxemburgo',
      'substituição pára-brisas sandweiler',
      'taxímetro profissional',
      'ATA Electronics luxemburgo',
      'serviço táxi luxemburgo',
      'vidro lateral automóvel',
    ],
    ogLocale: 'pt_PT',
    hreflang: 'pt-PT',
  },
};

/**
 * Generate metadata for a page based on locale
 */
export function generateLocalizedMetadata(
  locale: Locale,
  options?: {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
  }
): Metadata {
  const content = seoContent[locale];
  const canonicalUrl = options?.path ? `${SITE_URL}${options.path}` : SITE_URL;
  const ogImage = options?.image || `${SITE_URL}/images/auto-tax-og.png`;

  return {
    metadataBase: new URL(SITE_URL),
    title: options?.title || content.title,
    description: options?.description || content.description,
    keywords: content.keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: options?.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr-LU': canonicalUrl,
        'en-LU': canonicalUrl,
        'pt-PT': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: canonicalUrl,
      title: options?.title || content.title,
      description: options?.description || content.description,
      locale: content.ogLocale,
      alternateLocale: Object.values(seoContent)
        .filter(c => c.ogLocale !== content.ogLocale)
        .map(c => c.ogLocale),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options?.title || content.title,
      description: options?.description || content.description,
      images: [ogImage],
    },
    other: {
      'geo.region': 'LU',
      'geo.placename': 'Sandweiler',
      'geo.position': '49.6167;6.2333',
      'ICBM': '49.6167, 6.2333',
    },
  };
}

/**
 * Generate JSON-LD for WebSite schema
 */
export function generateWebSiteSchema(locale: Locale) {
  const content = seoContent[locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: content.description,
    inLanguage: content.hreflang,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD for LocalBusiness schema
 */
export function generateLocalBusinessSchema(locale: Locale) {
  const content = seoContent[locale];

  const descriptions: Record<Locale, string> = {
    fr: 'Spécialiste de l\'installation de taximètres et réparation de vitres automobiles au Luxembourg.',
    en: 'Specialist in taximeter installation and automotive glass repair in Luxembourg.',
    pt: 'Especialista em instalação de taxímetros e reparação de vidros automóveis no Luxemburgo.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    description: descriptions[locale],
    url: SITE_URL,
    telephone: '+352 26 777 503',
    email: 'info@autotaxtech.lu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zone Industrielle Rolach, Hall H1',
      addressLocality: 'Sandweiler',
      postalCode: 'L-5236',
      addressCountry: 'LU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.6167,
      longitude: 6.2333,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: '€€',
    areaServed: {
      '@type': 'Country',
      name: 'Luxembourg',
    },
    sameAs: [],
  };
}

/**
 * Generate JSON-LD for BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD for FAQPage schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD for Service schema
 */
export function generateServiceSchema(
  locale: Locale,
  service: {
    name: string;
    description: string;
    url: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${service.url}/#service`,
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: {
      '@id': `${SITE_URL}/#localbusiness`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Luxembourg',
    },
  };
}
