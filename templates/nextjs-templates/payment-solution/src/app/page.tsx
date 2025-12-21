import Blog from '@/components/home/Blog';
import Features from '@/components/home/Features';
import FinanceIntro from '@/components/home/FinanceIntro';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import TrustedByUsers from '@/components/home/TrustedByUsers';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTAV2 from '@/components/shared/cta/CTAV2';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Payment Solution || NextSaaS',
};

const Homepage07 = () => {
  return (
    <main className="bg-background-3 dark:bg-background-5">
      <Hero />
      <TrustedByUsers
        title="Countless users trust us completely."
        description="Boost your insights that help you to grow business"
        className="bg-background-4 dark:bg-background-5 pb-24 lg:pb-[170px]"
      />
      <Features className="pt-24 pb-24 md:pb-32 lg:pt-[120px] lg:pb-[170px]" />
      <WhyChooseUs />
      <Pricing />
      <FinanceIntro />
      <Integration />
      <Blog />
      <CTAV2
        className="bg-background-1 dark:bg-background-6"
        ctaHeading="Experience a free trial today and watch your business grow."
        ctaDescription="Sign up today to enhance your customer support with our tools and solutions."
        ctaBtnText="7- day free trial"
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

export default Homepage07;
