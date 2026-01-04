'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-lime-400/5 via-transparent to-transparent" />

      <div className="main-container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <RevealAnimation direction="up" delay={0.1}>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                <span className="text-tagline-2 font-medium uppercase tracking-wider text-lime-400">
                  {t('taximetersPage.hero.badge')}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {t('taximetersPage.hero.title')}{' '}
                <span className="text-lime-400">{t('taximetersPage.hero.titleAccent')}</span>
              </h1>

              <p className="text-tagline-1 mb-4 font-medium text-slate-300">
                {t('taximetersPage.hero.subtitle')}
              </p>

              <p className="text-tagline-1 mb-8 text-slate-400">
                {t('taximetersPage.hero.description')}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <LinkButton
                  href="#contact"
                  btnClass="btn-lg !border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500 font-semibold">
                  {t('taximetersPage.hero.cta')}
                </LinkButton>
                <LinkButton
                  href="#products"
                  btnClass="btn-lg !border-slate-700 !bg-slate-900 !text-white hover:!border-lime-400">
                  {t('taximetersPage.hero.ctaSecondary')}
                </LinkButton>
              </div>
            </div>
          </RevealAnimation>

          {/* Image */}
          <RevealAnimation direction="up" delay={0.2}>
            <div className="relative">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
                <Image
                  src="/images/auto-tax-taximeter-service.jpg"
                  alt="AIR W ULTRA Taximeter - Service Professionnel"
                  width={600}
                  height={400}
                  className="w-full rounded-xl object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-lime-400/20 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-lime-400/10 blur-3xl" />
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'TaximetersHero';
export default Hero;
