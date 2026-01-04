'use client';

import { useTranslation } from '@/i18n/client';
import { Check, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="bg-slate-950 py-20 md:py-28 lg:py-32">
      <div className="main-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1 - Taximètres */}
          <RevealAnimation delay={0.1}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 lg:p-10">
              {/* Icon + Title */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10">
                  <Settings className="h-6 w-6 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">{t('services.taximeters.title')}</h3>
              </div>

              {/* Description */}
              <p className="mb-8 text-lg text-slate-400">
                {t('services.taximeters.description')}
              </p>

              {/* Features List */}
              <ul className="mb-8 space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.taximeters.features.certified')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.taximeters.features.config')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.taximeters.features.compliance')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.taximeters.features.support')}</span>
                </li>
              </ul>

              {/* CTA Button */}
              <Link
                href="#contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-lime-400 bg-slate-900 px-6 py-4 font-semibold uppercase tracking-wider text-slate-300 transition-all hover:bg-lime-400 hover:text-slate-950">
                {t('services.taximeters.cta')}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealAnimation>

          {/* Card 2 - Tech Glass */}
          <RevealAnimation delay={0.1}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 lg:p-10">
              {/* Icon + Title */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10">
                  <ShieldCheck className="h-6 w-6 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">{t('services.techGlass.title')}</h3>
              </div>

              {/* Description */}
              <p className="mb-8 text-lg text-slate-400">
                {t('services.techGlass.description')}
              </p>

              {/* Features List */}
              <ul className="mb-8 space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.techGlass.features.windshield')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.techGlass.features.allBrands')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.techGlass.features.specialGlass')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-lime-400" />
                  <span className="text-tagline-1 text-slate-300">{t('services.techGlass.features.fastService')}</span>
                </li>
              </ul>

              {/* CTA Button */}
              <Link
                href="#contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-lime-400 bg-slate-900 px-6 py-4 font-semibold uppercase tracking-wider text-slate-300 transition-all hover:bg-lime-400 hover:text-slate-950">
                {t('services.techGlass.cta')}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

Services.displayName = 'Services';
export default Services;
