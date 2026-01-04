'use client';

import { useTranslation } from '@/i18n/client';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const FEATURES_DATA = [
  {
    id: 1,
    image: '/images/auto-tax-taximeter-taxi-air-w-start.png',
    titleKey: 'features.products.airW.title',
    priceKey: 'features.products.airW.price',
    pointsKey: 'features.products.airW.points',
  },
  {
    id: 2,
    image: '/images/auto-tax-taximeter-taxi-air-start.png',
    titleKey: 'features.products.airS.title',
    priceKey: 'features.products.airS.price',
    pointsKey: 'features.products.airS.points',
  },
  {
    id: 3,
    image: '/images/auto-tax-taximeter-taxi-primus-start.png',
    titleKey: 'features.products.primus.title',
    priceKey: 'features.products.primus.price',
    pointsKey: 'features.products.primus.points',
  },
] as const;

export default function Features() {
  const { t, locale } = useTranslation();

  // Get product data with translations
  const getProductPoints = (productKey: string): string[] => {
    const pointsData = {
      'features.products.airW.points': {
        fr: [
          "Compatible avec l'application 1001TAXIS : Propositions de courses envoyées directement sur votre taximètre*",
          'Sélection automatique du tarif jour/nuit',
          'Changement automatique heure été/hiver',
          'Affichage automatique du minimum de perception',
        ],
        en: [
          'Compatible with 1001TAXIS app: Ride proposals sent directly to your taximeter*',
          'Automatic day/night rate selection',
          'Automatic summer/winter time change',
          'Automatic minimum fare display',
        ],
        pt: [
          'Compatível com a aplicação 1001TAXIS: Propostas de corridas enviadas diretamente para o seu taxímetro*',
          'Seleção automática de tarifa dia/noite',
          'Mudança automática de hora verão/inverno',
          'Exibição automática do valor mínimo',
        ],
      },
      'features.products.airS.points': {
        fr: [
          "Compatible avec l'application 1001TAXIS*",
          'Sélection automatique du tarif jour/nuit',
          'Changement automatique heure été/hiver',
          'Affichage automatique du minimum de perception',
        ],
        en: [
          'Compatible with 1001TAXIS app*',
          'Automatic day/night rate selection',
          'Automatic summer/winter time change',
          'Automatic minimum fare display',
        ],
        pt: [
          'Compatível com a aplicação 1001TAXIS*',
          'Seleção automática de tarifa dia/noite',
          'Mudança automática de hora verão/inverno',
          'Exibição automática do valor mínimo',
        ],
      },
      'features.products.primus.points': {
        fr: [
          "Compatible avec l'application 1001TAXIS*",
          'Sélection automatique du tarif jour/nuit',
          'Changement automatique heure été/hiver',
          'Affichage automatique du minimum de perception',
          'Gestion et sélection manuelle des suppléments',
        ],
        en: [
          'Compatible with 1001TAXIS app*',
          'Automatic day/night rate selection',
          'Automatic summer/winter time change',
          'Automatic minimum fare display',
          'Manual supplement management and selection',
        ],
        pt: [
          'Compatível com a aplicação 1001TAXIS*',
          'Seleção automática de tarifa dia/noite',
          'Mudança automática de hora verão/inverno',
          'Exibição automática do valor mínimo',
          'Gestão e seleção manual de suplementos',
        ],
      },
    };

    return pointsData[productKey as keyof typeof pointsData]?.[locale as 'fr' | 'en' | 'pt'] || [];
  };

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="main-container">
        <div className="space-y-16">
          {/* Heading */}
          <div className="mx-auto max-w-181 space-y-5 text-center md:w-full">
            <RevealAnimation delay={0.05}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-400">{t('features.badge')}</span>
              </div>
            </RevealAnimation>

            <div className="space-y-3">
              <RevealAnimation delay={0.1}>
                <h2 className="text-3xl font-bold text-slate-950 md:text-4xl lg:text-5xl">
                  {t('features.title')} <span className="text-slate-500">{t('features.titleAccent')}</span>
                </h2>
              </RevealAnimation>

              <RevealAnimation delay={0.15}>
                <p className="text-lg text-slate-400">
                  {t('features.subtitle')}
                </p>
              </RevealAnimation>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES_DATA.map((f, idx) => {
              const points = getProductPoints(f.pointsKey);
              return (
                <RevealAnimation key={f.id} delay={0.2 + idx * 0.05}>
                  <div
                    className={cn(
                      'h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-lime-400 hover:shadow-md',
                    )}>
                    {/* Image */}
                    <div className="mb-6 flex items-center justify-center">
                      <Image
                        src={f.image}
                        alt={t(f.titleKey)}
                        width={300}
                        height={200}
                        className="h-auto w-full object-contain"
                      />
                    </div>

                    {/* Text + bullets */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-950">
                        {t(f.titleKey)}
                      </h3>

                      <ul className="space-y-3" aria-label={`${t(f.titleKey)} features`}>
                        {points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="mt-2 flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-full bg-lime-400"
                              aria-hidden="true"
                            />
                            <span className="text-md leading-relaxed text-gray-600">
                              {pt}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 text-2xl font-bold text-slate-600">
                        {t(f.priceKey)}
                      </p>
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
