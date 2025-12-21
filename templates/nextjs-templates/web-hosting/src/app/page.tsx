import Blogs from '@/components/home/Blogs';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
import Process from '@/components/home/Process';
import SearchCta from '@/components/home/SearchCta';
import Services from '@/components/home/Services';
import Solutions from '@/components/home/Solutions';
import ReviewsV2 from '@/components/shared/reviews/ReviewsV2';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Web Hosting - NextSaaS',
  description: 'Web Hosting of NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7 overflow-x-hidden">
      <Hero />
      <SearchCta />
      <Solutions />
      <Services />
      <Pricing />
      <ReviewsV2 badgeColor="badge-green" sectionSpacingClass="space-y-[70px] py-14 md:py-20 xl:py-[100px]" />
      <Process />
      <Blogs />
    </main>
  );
};

export default page;
