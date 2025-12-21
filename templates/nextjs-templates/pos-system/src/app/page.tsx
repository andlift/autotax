import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WhyChooseUsV2 from '@/components/home/WhyChooseUsV2';
import CTAV1 from '@/components/shared/cta/CTAV1';
import ReviewsV1 from '@/components/shared/reviews/ReviewsV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Pos System - NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-4 dark:bg-background-9">
      <Hero />
      <WhyChooseUs />
      <Features />
      <Services />
      <WhyChooseUsV2 />
      <ReviewsV1
        badgeColor="badge-green"
        background="bg-background-3 dark:bg-background-8 pb-24 md:pb-36 lg:pb-44 xl:pb-[200px]"
      />
      <CTAV1
        badgeText="Get started"
        className="dark:bg-background-6 bg-white"
        ctaHeading="Start messaging smarter today"
        description="Start your free trial today and experience the power of NextSaaS—where efficiency meets innovation."
        descriptionClass="text-secondary/60 dark:text-accent/60 max-w-[530px]"
        btnClass="btn-primary hover:btn-secondary dark:btn-accent dark:hover:btn-primary"
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
