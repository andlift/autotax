import Blog from '@/components/home/Blog';
import CTA from '@/components/home/CTA';
import Feature from '@/components/home/Feature';
import FeatureV2 from '@/components/home/FeatureV2';
import FeatureV3 from '@/components/home/FeatureV3';
import Hero from '@/components/home/Hero';
import Highlights from '@/components/home/Highlights';
import NewsLetter from '@/components/home/NewsLetter';
import Process from '@/components/home/Process';
import Services from '@/components/home/Services';
import ReviewsV1 from '@/components/shared/reviews/ReviewsV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Data Visualization Software - NextSaaS',
};

const page = () => {
  return (
    <main className="dark:bg-background-6 bg-white">
      <Hero />
      <Services />
      <Highlights />
      <Feature />
      <FeatureV2 />
      <Process />
      <FeatureV3 />
      <ReviewsV1
        badgeColor="hidden"
        background="lg:py-[150px] sm:py-[100px] py-20 bg-background-2 dark:bg-background-6"
        sliderClassName="bg-white dark:bg-background-5"
      />
      <CTA />
      <Blog />
      <NewsLetter />
    </main>
  );
};

export default page;
