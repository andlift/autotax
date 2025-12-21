import Features from '@/components/home/Features';
import FeaturesV2 from '@/components/home/FeaturesV2';
import Hero from '@/components/home/Hero';
import SuccessStats from '@/components/home/SuccessStats';
import WhyUs from '@/components/home/WhyUs';
import CTAV1 from '@/components/shared/cta/CTAV1';
import ReviewsV1 from '@/components/shared/reviews/ReviewsV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Time Tracking Software - NextSaaS',
};

const Homepage31 = () => {
  return (
    <main className="bg-background-2 dark:bg-background-6">
      <Hero />
      <Features />
      <SuccessStats />
      <WhyUs />
      <FeaturesV2 />
      <ReviewsV1
        btnClassName="btn btn-secondary btn-lg md:btn-xl dark:btn-transparent hover:btn-green block md:inline-block w-[90%] md:w-auto mx-auto"
        badgeColor="badge-green-v2"
        background="bg-background-4 dark:bg-background-6 pt-16 md:pt-20 lg:pt-[90px] xl:pt-[100px] pb-20 md:pb-28 lg:pb-36 xl:pb-[200px]"
      />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeText="Get started"
        badgeClass="!badge-green"
        ctaHeading="Start tracking smarter today"
        description="Start your free trial today and experience the power of NextSaaS—where efficiency meets innovation."
        descriptionClass="text-secondary/60"
        btnClass="btn-green hover:btn-white-dark"
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default Homepage31;
