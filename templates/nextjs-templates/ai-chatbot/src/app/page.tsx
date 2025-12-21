import Features from '@/components/home/Features';
import FeaturesV2 from '@/components/home/FeaturesV2';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Testimonial from '@/components/home/Testimonial';
import Understanding from '@/components/home/Understanding';
import CTAV2 from '@/components/shared/cta/CTAV2';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'AI Chatbot || NextSaaS',
  description: 'Homepage of NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-2 dark:bg-background-5 shadow-7">
      <Hero />
      <Features />
      <FeaturesV2 />
      <Pricing />
      <Integration />
      <Understanding />
      <Testimonial badgeText="Reviews" />
      <CTAV2
        className="bg-background-2 dark:bg-background-5"
        ctaHeading=" Experience a free trial today and watch your"
        spanText="business grow."
        ctaDescription="Sign up today to enhance your customer support with our tools and solutions."
        ctaBtnText="Get started"
        ctaCheckListData={[
          {
            id: '1',
            text: 'No credit card required',
          },
          {
            id: '2',
            text: 'free for 30 day trial.',
          },
          {
            id: '3',
            text: 'Money back guarantee.',
          },
        ]}
      />
    </main>
  );
};

export default page;
