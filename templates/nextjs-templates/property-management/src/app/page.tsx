import AchievementWrapper from '@/components/home/AchievementWrapper';
import Faq from '@/components/home/Faq';
import Feature from '@/components/home/Feature';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import FeatureV2 from '@/components/home/FeatureV2';
import Hero from '@/components/home/Hero';
import IndustryCategories from '@/components/home/IndustryCategories';
import Integration from '@/components/home/Integration';
import Testimonial from '@/components/home/Testimonial';
import CTAV3 from '@/components/shared/cta/CTAV3';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Property Management software - NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-2 dark:bg-background-5 overflow-hidden">
      <Hero />
      <AchievementWrapper />
      <FeatureHighlights />
      <Feature />
      <FeatureV2 />
      <Integration />
      <IndustryCategories />
      <Testimonial />
      <Faq />
      <CTAV3
        className='"pb-16 dark:bg-background-8 bg-white pt-16 md:pt-20 md:pb-20 lg:pt-[90px] lg:pb-[90px] xl:pt-[100px] xl:pb-[100px]'
        badgeText="Journal"
        badgeClass="!badge-green"
        ctaHeading="Start selling smarter today"
        ctaHeadingClass="text-secondary dark:text-accent"
        description="Pellentesque lectus cum neque cursus sapien massa laoreet varius. Ultricies faucibus donec tellus cras ornare."
        descriptionClass="max-w-[534px] mx-auto"
        inputFieldClass="px-[18px] h-12 outline-none py-3 shadow-1 placeholder:text-secondary/50 rounded-full border border-stroke-1 dark:border-stroke-7 dark:bg-background-6 dark:placeholder:text-accent/50 w-[85%] md:w-[340px] placeholder:font-normal font-normal"
        btnClass=" hover:btn-secondary dark:hover:btn-accent btn-primary"
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
