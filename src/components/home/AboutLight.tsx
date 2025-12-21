'use client';

import Link from 'next/link';
import { Compare } from '@/components/ui/compare';

const AboutLight = () => {
  return (
    <section className="overflow-x-hidden bg-gray-50 py-18 md:py-28">
      <div className="main-container">
        <div className="grid grid-cols-1 items-center gap-y-20 md:grid-cols-2 lg:gap-x-10 xl:gap-x-20">
          <div className="order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-400">Pare-brise & Vitres</span>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Tech Glass – Vitrage <br className="hidden lg:block" />
              automobile de confiance
            </h2>
            <ul className="mb-8 space-y-3 text-slate-600 md:mb-12 lg:mb-8">
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 shrink-0 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pare-brise, vitres latérales et vitrage spécial pour tous types de véhicules.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 shrink-0 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Intervention rapide avec prise en charge par les <strong className="font-bold">assurances luxembourgeoises</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 shrink-0 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Qualité professionnelle, sécurité garantie.</span>
              </li>
            </ul>
            <div className="inline-block w-full list-none md:w-auto">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-lime-500">
                Nous contacter
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="order-2 flex items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
            <div
              style={{
                transform: 'rotateX(15deg) translateZ(80px)',
              }}
              className="w-full rounded-3xl border border-neutral-200 bg-neutral-100 p-1 md:p-4">
              <Compare
                firstImage="/images/auto-tax-parabrise-1.webp"
                secondImage="/images/auto-tax-parabrise-2.webp"
                firstImageClassName="object-cover object-left-top w-full"
                secondImageClassname="object-cover object-left-top w-full"
                className="h-[300px] w-full rounded-[22px] md:h-[400px] md:rounded-lg"
                slideMode="hover"
                autoplay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutLight.displayName = 'AboutLight';
export default AboutLight;
