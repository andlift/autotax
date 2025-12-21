import CRMFeatures from '@/components/home/CRMFeatures';
import Faq from '@/components/home/Faq';
import Hero from '@/components/home/Hero';
import HowItWork from '@/components/home/HowItWork';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import SelectUs from '@/components/home/SelectUs';
import Testimonial from '@/components/home/Testimonial';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Nuvexa CRM - NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Hero />
      <SelectUs />
      <CRMFeatures />
      <Pricing />
      <Integration />
      <HowItWork />
      <Testimonial
        badgeText="Reviews"
        badgeColor="!badge-primary"
        title="Hear from our customers about their experiences with us"
        classname="pt-14 md:pt-16 lg:pt-[88px] bg-background-3 dark:bg-background-7 xl:pt-[100px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]"
      />
      <Faq />
      <CTAV1
        className="bg-background-2 dark:bg-background-5"
        badgeText="Finance"
        badgeClass="!badge-primary"
        ctaHeading="Ready to transform your business with NexSaas CRM"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        descriptionClass="text-secondary/60"
        btnClass="btn-primary hover:btn-secondary dark:hover:btn-accent"
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
