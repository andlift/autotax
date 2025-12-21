import ChangelogContent from '@/components/changelog/ChangelogContent';
import CTAV1 from '@/components/shared/cta/CTAV1';
import PageHero from '@/components/shared/PageHero';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Changelog - NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <PageHero
        title="Changelog"
        heading="Changelog"
        link="/changelog"
        className="pt-24 md:pt-36 lg:pt-40 xl:pt-[200px]"
      />
      <ChangelogContent />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="!badge-yellow-v2"
        badgeText="Get Started"
        ctaHeading="Ready to start earning with NextSaaS?"
        description="If you have any questions, feel free to reach out to our team."
        btnClass="hover:btn-secondary dark:hover:btn-accent"
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
