'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useI18n } from '@/i18n/client';
import { Award, Globe, Shield } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries';

interface TaximetersPageDict {
  certifications?: {
    european?: { items?: string[] };
    international?: { items?: string[] };
  };
}

const Certifications = () => {
  const { t, dictionary } = useI18n();
  const taximetersPage = (dictionary as Dictionary & { taximetersPage?: TaximetersPageDict }).taximetersPage;

  const certifications = [
    {
      key: 'european',
      icon: Shield,
      items: taximetersPage?.certifications?.european?.items || [],
    },
    {
      key: 'international',
      icon: Globe,
      items: taximetersPage?.certifications?.international?.items || [],
    },
    {
      key: 'luxembourg',
      icon: Award,
      isDescription: true,
      items: [] as string[],
    },
  ];

  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="main-container">
        {/* Header */}
        <RevealAnimation direction="up" delay={0.1}>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-lime-400">
                {t('taximetersPage.certifications.badge')}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('taximetersPage.certifications.title')}{' '}
              <span className="text-lime-400">{t('taximetersPage.certifications.titleAccent')}</span>
            </h2>
          </div>
        </RevealAnimation>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;

            return (
              <RevealAnimation key={cert.key} direction="up" delay={0.1 + index * 0.1}>
                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-center lg:p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10">
                    <Icon className="h-8 w-8 text-lime-400" />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-white">
                    {t(`taximetersPage.certifications.${cert.key}.title`)}
                  </h3>

                  {cert.isDescription ? (
                    <p className="text-tagline-1 text-slate-400">
                      {t(`taximetersPage.certifications.${cert.key}.description`)}
                    </p>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-2">
                      {cert.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-tagline-2 font-medium text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Certifications.displayName = 'TaximetersCertifications';
export default Certifications;
