'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useTranslation } from '@/i18n/client';
import { Cog, Headphones, Settings, Wrench } from 'lucide-react';

const OurServices = () => {
  const { t } = useTranslation();

  const services = [
    { key: 'installation', icon: Settings },
    { key: 'programming', icon: Cog },
    { key: 'maintenance', icon: Wrench },
    { key: 'support', icon: Headphones },
  ];

  return (
    <section className="bg-slate-950 py-20 md:py-28">
      <div className="main-container">
        {/* Header */}
        <RevealAnimation direction="up" delay={0.1}>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-lime-400">
                {t('taximetersPage.ourServices.badge')}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('taximetersPage.ourServices.title')}{' '}
              <span className="text-lime-400">{t('taximetersPage.ourServices.titleAccent')}</span>
            </h2>
          </div>
        </RevealAnimation>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <RevealAnimation key={service.key} direction="up" delay={0.1 + index * 0.1}>
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10">
                    <Icon className="h-7 w-7 text-lime-400" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white lg:text-2xl">
                    {t(`taximetersPage.ourServices.${service.key}.title`)}
                  </h3>

                  <p className="text-tagline-1 text-slate-400">
                    {t(`taximetersPage.ourServices.${service.key}.description`)}
                  </p>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

OurServices.displayName = 'TaximetersOurServices';
export default OurServices;
