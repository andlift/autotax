'use client';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const FEATURES = [
  {
    id: 1,
    image: '/images/auto-tax-taximeter-taxi-air-w-start.png',
    title: 'AIR W Taximeter',
    price: '2100€ TTC',
    points: [
      'Compatible avec l\'application 1001TAXIS : Propositions de courses envoyées directement sur votre taximètre*',
      'Sélection automatique du tarif jour/nuit',
      'Changement automatique heure été/hiver',
      'Affichage automatique du minimum de perception',
    ],
  },
  {
    id: 2,
    image: '/images/auto-tax-taximeter-taxi-air-start.png',
    title: 'AIR S Taximeter',
    price: '2300€ TTC',
    points: [
      'Compatible avec l\'application 1001TAXIS*',
      'Sélection automatique du tarif jour/nuit',
      'Changement automatique heure été/hiver',
      'Affichage automatique du minimum de perception',
    ],
  },
  {
    id: 3,
    image: '/images/auto-tax-taximeter-taxi-primus-start.png',
    title: 'PRIMUS RS-01 Taximeter',
    price: '2550€ TTC',
    points: [
      'Compatible avec l\'application 1001TAXIS*',
      'Sélection automatique du tarif jour/nuit',
      'Changement automatique heure été/hiver',
      'Affichage automatique du minimum de perception',
      'Gestion et sélection manuelle des suppléments',
    ],
  },
] as const;

export default function Features() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="main-container">
        <div className="space-y-16">
          {/* Heading */}
          <div className="mx-auto max-w-[724px] space-y-5 text-center md:w-full">
            <RevealAnimation delay={0.1}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-400">Taximètres</span>
              </div>
            </RevealAnimation>

            <div className="space-y-3">
              <RevealAnimation delay={0.2}>
                <h2 className="text-3xl font-bold text-slate-950 md:text-4xl lg:text-5xl">
                  Taximètres de la gamme <span className="text-slate-500">REVOLUTION</span>
                </h2>
              </RevealAnimation>

              <RevealAnimation delay={0.3}>
                <p className="text-lg text-slate-400">
                  La gamme de taximètres la plus complète du marché.
                </p>
              </RevealAnimation>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, idx) => (
              <RevealAnimation key={f.id} delay={0.4 + idx * 0.1}>
                <div
                  className={cn(
                    'h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-lime-400 hover:shadow-md',
                  )}>
                  {/* Icon or Image */}
                  {'image' in f ? (
                    <div className="mb-6 flex items-center justify-center">
                      <Image
                        src={f.image}
                        alt={f.title}
                        width={300}
                        height={200}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-lime-100">
                      <f.icon className="h-7 w-7 text-lime-500" />
                    </div>
                  )}

                  {/* Text + bullets */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-950">
                      {f.title}
                    </h3>

                    <ul className="space-y-3" aria-label={`${f.title} features`}>
                      {f.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-2 flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-full bg-lime-400"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-gray-600">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {'price' in f && (
                      <p className="mt-4 text-2xl font-bold text-slate-600">
                        {f.price}
                      </p>
                    )}
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
