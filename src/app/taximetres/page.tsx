import {
  Hero,
  Products,
  Specs,
  Certifications,
  OurServices,
  CTA,
} from '@/components/taximeters';
import { JsonLdMultiple } from '@/components/seo/JsonLd';
import { getLocale } from '@/i18n/server';
import {
  generateLocalizedMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  SITE_URL,
} from '@/utils/seo';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

// SEO content per locale for taximeters page
const taximetersPageSeo: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Taximètres AIR W ULTRA | Installation Professionnelle Luxembourg | AUTO TAX & TECH',
    description: 'Installation, programmation et maintenance certifiées des taximètres AIR W ULTRA au Luxembourg. Gamme complète Basic, Connecté et Cam. Service rapide à Sandweiler.',
  },
  en: {
    title: 'AIR W ULTRA Taximeters | Professional Installation Luxembourg | AUTO TAX & TECH',
    description: 'Certified installation, programming and maintenance of AIR W ULTRA taximeters in Luxembourg. Complete range Basic, Connecté and Cam. Fast service in Sandweiler.',
  },
  pt: {
    title: 'Taxímetros AIR W ULTRA | Instalação Profissional Luxemburgo | AUTO TAX & TECH',
    description: 'Instalação, programação e manutenção certificada de taxímetros AIR W ULTRA no Luxemburgo. Gama completa Basic, Connecté e Cam. Serviço rápido em Sandweiler.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const content = taximetersPageSeo[locale];

  return generateLocalizedMetadata(locale, {
    title: content.title,
    description: content.description,
    path: '/taximetres',
  });
}

export default async function TaximetresPage() {
  const locale = await getLocale();
  const content = taximetersPageSeo[locale];

  // Breadcrumb labels per locale
  const breadcrumbLabels: Record<Locale, { home: string; taximeters: string }> = {
    fr: { home: 'Accueil', taximeters: 'Taximètres' },
    en: { home: 'Home', taximeters: 'Taximeters' },
    pt: { home: 'Início', taximeters: 'Taxímetros' },
  };

  const schemas = [
    generateLocalBusinessSchema(locale),
    generateBreadcrumbSchema(locale, [
      { name: breadcrumbLabels[locale].home, url: '/' },
      { name: breadcrumbLabels[locale].taximeters, url: '/taximetres' },
    ]),
    generateServiceSchema(locale, {
      name: breadcrumbLabels[locale].taximeters,
      description: content.description,
      url: '/taximetres',
    }),
  ];

  return (
    <>
      <JsonLdMultiple schemas={schemas} />
      <main className="bg-slate-950">
        <Hero />
        <Products />
        <OurServices />
        <Specs />
        <Certifications />
        <CTA />
      </main>
    </>
  );
}
