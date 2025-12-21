import Blog from '@/components/home/Blog';
import Features from '@/components/home/Features';
import FeaturesV2 from '@/components/home/FeaturesV2';
import FeaturesV3 from '@/components/home/FeaturesV3';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import SocialActivity from '@/components/home/SocialActivity';
import Testimonial from '@/components/home/Testimonial';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Social Media Marketing || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-2 dark:bg-background-5 overflow-x-hidden">
      <Hero />
      <Services />
      <Features />
      <FeaturesV2 />
      <FeaturesV3 />
      <SocialActivity />
      <Testimonial />
      <Blog />
      <CTAV1
        className="dark:bg-background-6 bg-white py-[50px] md:py-20 lg:py-28"
        badgeText="Get started"
        ctaHeading="Ready to scale your"
        headingClass="ext-secondary dark:text-accent text-heading-4 lg:text-heading-2 max-w-[449px] lg:text-left mx-auto lg:mx-0"
        spanText="property business"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
