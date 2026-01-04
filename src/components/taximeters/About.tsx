'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useTranslation } from '@/i18n/client';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-950 py-20 md:py-28">
      <div className="main-container">
        <RevealAnimation direction="up" delay={0.1}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-lime-400">
                {t('taximetersPage.about.badge')}
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('taximetersPage.about.title')}{' '}
              <span className="text-lime-400">{t('taximetersPage.about.titleAccent')}</span>
            </h2>

            <p className="text-tagline-1 text-slate-400">
              {t('taximetersPage.about.description')}
            </p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

About.displayName = 'TaximetersAbout';
export default About;
