import Benefits from '@/components/pricing/Benefits';
import Contact from '@/components/pricing/Contact';
import Features from '@/components/pricing/Features';
import Pricing from '@/components/pricing/Pricing';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Pricing - Property Management || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <Pricing />
      <Benefits />
      <Features />
      <Contact />
      <CTAV1
        className="dark:bg-background-7 bg-background-3"
        badgeText="Get started"
        badgeClass="!badge-cyan"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
        btnClass="hover:btn-secondary dark:hover:btn-accent"
      />
    </main>
  );
};

export default page;
