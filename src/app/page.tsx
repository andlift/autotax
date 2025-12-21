import AboutGrid from '@/components/home/AboutGrid';
import AboutLight from '@/components/home/AboutLight';
import Clients from '@/components/home/Clients';
import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhatWeDo from '@/components/home/WhatWeDo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AUTO TAX & TECH | Installation Taximètres & Réparation Vitres | Luxembourg',
  description:
    'Votre alternative pour l\'installation de taximètres et la réparation de vitres automobiles au Luxembourg. Service professionnel, rapide et de qualité à Sandweiler.',
  keywords: [
    'taximètre',
    'installation taximètre',
    'réparation pare-brise',
    'vitres automobiles',
    'Luxembourg',
    'Sandweiler',
    'taxi',
    'pare-brise',
    'vitre latérale',
    'Auto Tax Tech',
  ],
  openGraph: {
    title: 'AUTO TAX & TECH | Installation Taximètres & Réparation Vitres',
    description:
      'Votre alternative pour l\'installation de taximètres et la réparation de vitres automobiles au Luxembourg.',
    type: 'website',
    locale: 'fr_LU',
  },
};

const page = () => {
  return (
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
  );
};

export default page;
