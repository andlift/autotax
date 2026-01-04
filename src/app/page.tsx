import AboutGrid from '@/components/home/AboutGrid';
import AboutLight from '@/components/home/AboutLight';
import Clients from '@/components/home/Clients';
import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhatWeDo from '@/components/home/WhatWeDo';
import { JsonLdMultiple } from '@/components/seo/JsonLd';
import { getLocale, getTranslations } from '@/i18n/server';
import {
  generateLocalizedMetadata,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/utils/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateLocalizedMetadata(locale, { path: '/' });
}

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = await getTranslations();

  // Get FAQ data for structured data
  const faqQuestions = dictionary.faq?.questions;
  const faqs = faqQuestions
    ? Object.values(faqQuestions).map((q) => ({
        question: (q as { question: string; answer: string }).question,
        answer: (q as { question: string; answer: string }).answer,
      }))
    : [];

  // Breadcrumb for homepage
  const breadcrumbNames: Record<string, string> = {
    fr: 'Accueil',
    en: 'Home',
    pt: 'Início',
  };

  const schemas = [
    generateWebSiteSchema(locale),
    generateLocalBusinessSchema(locale),
    generateBreadcrumbSchema(locale, [
      { name: breadcrumbNames[locale] || 'Home', url: '/' },
    ]),
    ...(faqs.length > 0 ? [generateFAQSchema(faqs)] : []),
  ];

  return (
    <>
      <JsonLdMultiple schemas={schemas} />
      <main className="bg-slate-950">
        <Hero />
        <Clients />
        <WhatWeDo />
        <Features />
        <Services />
        <AboutLight />
        <AboutGrid />
        <FAQ />
      </main>
    </>
  );
}
