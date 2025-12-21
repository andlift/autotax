import About from '@/components/home/About';
import Blog from '@/components/home/Blog';
import Faq from '@/components/home/Faq';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Services from '@/components/home/Services';
import Testimonial from '@/components/home/Testimonial';
import CTAV2 from '@/components/shared/cta/CTAV2';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Financial Application - NextSaaS',
  description:
    'Discover NextSaaS, a comprehensive financial application designed to streamline your business finances, enhance productivity, and drive growth.',
};

const page = () => {
  return (
    <main className="dark:bg-background-7 overflow-x-hidden bg-white">
      <Hero />
      <Services />
      <About />
      <Integration />
      <Faq />
      <Testimonial
        badgeText="Review"
        badgeColor="badge-yellow-v2"
        title="Hear from our customers about their
experiences with us"
        classname="py-[112px] bg-background-2 dark:bg-background-5"
      />
      <Blog />
      <CTAV2
        className="bg-background-2 dark:bg-background-5"
        ctaHeading="Experience a free trial today and watch your business grow."
        ctaDescription="Sign up today to enhance your customer support with our tools and solutions."
        ctaBtnText="7- day free trial"
        btnClass="btn-xl"
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
