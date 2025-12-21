import CTA from '@/components/home/CTA';
import Feature from '@/components/home/Feature';
import FeatureV2 from '@/components/home/FeatureV2';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Publish from '@/components/home/Publish';
import Steps from '@/components/home/Steps';
import ReviewsV3 from '@/components/shared/reviews/ReviewsV3';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'App Builder - NextSaaS',
};
const page = () => {
  return (
   
      <main className="dark:bg-background-6">
        <Hero />
        <Integration />
        <Feature />
        <Steps />
        <FeatureV2 />
        <ReviewsV3
          className="bg-background-3 dark:bg-background-5"
          badgeText="Customer Success"
          badgeColor="badge-green"
          title="Real apps. Real results"
          description="Real apps. Real results Nextsaas delivered our entire platform ahead of schedule—flawless execution and real partnership."
          buttonText="View all reviews"
        />
        <Pricing />
        <Publish />
        <CTA />
      </main>
      
  );
};

export default page;
