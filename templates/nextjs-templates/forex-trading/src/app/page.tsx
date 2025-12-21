import About from '@/components/home/About';
import Blog from '@/components/home/Blog';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';
import CTA from '@/components/home/CTA';
import Feature from '@/components/home/Feature';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
import Services from '@/components/home/Services';
import Steps from '@/components/home/Steps';
import ReviewsV1 from '@/components/shared/reviews/ReviewsV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Forex Trading - NextSaaS',
};

const page = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <Steps />
      <Feature />
      <About />
      <Services />
      <Pricing />
      <ReviewsV1
        badgeColor="badge-green-v2"
        background="lg:pt-[100px] pt-16 lg:pb-[200px] md:pb-[100px] pb-16 bg-background-3 dark:bg-background-9"
        sliderClassName="bg-white dark:bg-background-5"
      />
      <Blog />
      <Contact />
      <CTA />
    </main>
  );
};

export default page;
