import About from '@/components/home/About';
import Feature from '@/components/home/Feature';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Work from '@/components/home/Work';
import ReviewsV1 from '@/components/shared/reviews/ReviewsV1';
import VideoModal from '@/components/shared/VideoModal';
import { ModalProvider } from '@/context/ModalContext';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'AI Software || NextSaaS',
};

const page = () => {
  return (
    <ModalProvider>
      <main>
        <Hero />
        <About />
        <Work />
        <Feature />
        <Pricing />
        <Integration />
        <ReviewsV1 badgeColor="badge-yellow" background="dark:bg-background-6 pb-24 md:pb-36 lg:pb-44 xl:pb-[200px]" />
        <VideoModal />
      </main>
    </ModalProvider>
  );
};
export default page;
