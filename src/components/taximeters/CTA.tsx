'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import { useTranslation } from '@/i18n/client';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-slate-950 py-20 md:py-28">
      <div className="main-container">
        <RevealAnimation direction="up" delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-400/10 via-slate-900 to-slate-900 p-8 text-center md:p-12 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-lime-400/5 blur-3xl" />

            <div className="relative">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {t('taximetersPage.cta.title')}
              </h2>

              <p className="text-tagline-1 mx-auto mb-8 max-w-2xl text-slate-300">
                {t('taximetersPage.cta.description')}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <LinkButton
                  href="tel:+35226777503"
                  btnClass="btn-lg !border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500 font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {t('taximetersPage.cta.button')}
                  </span>
                </LinkButton>

                <LinkButton
                  href="mailto:info@autotaxtech.lu"
                  btnClass="btn-lg !border-slate-700 !bg-slate-900 !text-white hover:!border-lime-400 font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email
                  </span>
                </LinkButton>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

CTA.displayName = 'TaximetersCTA';
export default CTA;
