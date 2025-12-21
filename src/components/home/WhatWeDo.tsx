'use client';

import { useWordAnimation } from '@/hooks/useWordAnimation';
import RevealAnimation from '../animation/RevealAnimation';

const WhatWeDo = () => {
  const { titleRef } = useWordAnimation();
  return (
    <section className="py-10 max-[1920px]:px-5">
      <RevealAnimation delay={0.1}>
        <div className="mx-auto max-w-470 rounded-3xl border border-slate-800 bg-slate-900 md:rounded-4xl md:px-5 lg:py-16 xl:py-18">
          <div className="main-container mx-auto max-w-350 py-8 md:py-30">
            <h2
              ref={titleRef}
              className="split-text-team-title font-inter-tight text-heading-5 text-center font-light text-white wrap-break-word sm:text-heading-4 md:text-heading-3 lg:text-heading-2 xl:text-heading-1 2xl:text-[68px] 2xl:leading-[110%]">
              Votre partenaire de confiance pour{' '}
              <span className="text-lime-400">l&apos;installation de taximètres</span> et la{' '}
              <span className="text-lime-400">réparation de vitres automobiles</span> au Luxembourg.
            </h2>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

WhatWeDo.displayName = 'WhatWeDo';
export default WhatWeDo;
