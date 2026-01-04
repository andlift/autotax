'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useI18n } from '@/i18n/client';
import { Award, Clock, MapPin, Package, Zap } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries';

interface WhyChooseUsItem {
  title: string;
  description: string;
}

interface TaximetersPageDict {
  whyChooseUs?: {
    items?: WhyChooseUsItem[];
  };
}

const WhyChooseUs = () => {
  const { t, dictionary } = useI18n();
  const taximetersPage = (dictionary as Dictionary & { taximetersPage?: TaximetersPageDict }).taximetersPage;

  const icons = [Award, Clock, Zap, MapPin, Package];
  const items = taximetersPage?.whyChooseUs?.items || [];

  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="main-container">
        {/* Header */}
        <RevealAnimation direction="up" delay={0.1}>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-lime-400">
                {t('taximetersPage.whyChooseUs.badge')}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('taximetersPage.whyChooseUs.title')}{' '}
              <span className="text-lime-400">{t('taximetersPage.whyChooseUs.titleAccent')}</span>
            </h2>
          </div>
        </RevealAnimation>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index] || Award;

            return (
              <RevealAnimation key={index} direction="up" delay={0.1 + index * 0.05}>
                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 lg:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10">
                    <Icon className="h-6 w-6 text-lime-400" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white lg:text-xl">{item.title}</h3>

                  <p className="text-tagline-2 text-slate-400">{item.description}</p>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

WhyChooseUs.displayName = 'TaximetersWhyChooseUs';
export default WhyChooseUs;
