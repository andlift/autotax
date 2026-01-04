'use client';

import { useTranslation } from '@/i18n/client';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="overflow-x-hidden bg-slate-950 py-18 md:py-28">
      <div className="main-container">
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
          {/* Content */}
          <div className="order-2 md:order-1">
            <RevealAnimation delay={0.1} direction="left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-300">
                  {t('about.badge')}
                </span>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.1} direction="left">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {t('about.title')} <span className="text-lime-400">{t('about.titleAccent')}</span> {t('about.titleEnd')}{' '}
                <span className="text-lime-400">{t('about.titleAccent2')}</span>
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={0.1} direction="left">
              <div className="mb-8 space-y-4 text-slate-400">
                <p dangerouslySetInnerHTML={{ __html: t('about.description1') }} />
                <p>{t('about.description2')}</p>
                <p>{t('about.description3')}</p>
              </div>
            </RevealAnimation>

            {/* Features */}
            <RevealAnimation delay={0.1} direction="left">
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                  <p className="mb-1 text-2xl font-bold text-lime-400">15+</p>
                  <p className="text-tagline-2 text-slate-400">{t('about.stats.years')}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                  <p className="mb-1 text-2xl font-bold text-lime-400">500+</p>
                  <p className="text-tagline-2 text-slate-400">{t('about.stats.clients')}</p>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1} direction="left">
              <div className="inline-block w-full list-none md:w-auto">
                <LinkButton
                  href="#contact"
                  btnClass="btn-xl-v2 !border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500 font-semibold">
                  {t('common.contactUs')}
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>

          {/* Visual Element */}
          <RevealAnimation delay={0.1} direction="right" useSpring={true} duration={2.4}>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/30 p-8 lg:p-12">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-lime-400/10 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-slate-800/50 blur-2xl" />

                {/* Location Card */}
                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lime-400/30 bg-lime-400/10">
                      <svg className="h-6 w-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t('about.location.title')}</p>
                      <p className="text-tagline-2 text-slate-400">{t('about.location.subtitle')}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-lime-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">{t('about.location.addressLabel')}</p>
                        <p
                          className="text-tagline-2 text-slate-400"
                          dangerouslySetInnerHTML={{ __html: t('about.location.address') }}
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-lime-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">{t('about.location.phoneLabel')}</p>
                        <p className="text-tagline-2 text-slate-400">+352 26 777 503</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-lime-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">{t('about.location.emailLabel')}</p>
                        <p className="text-tagline-2 text-slate-400">info@autotaxtech.lu</p>
                      </div>
                    </div>
                  </div>

                  {/* Horaires */}
                  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="mb-2 text-sm font-medium text-white">{t('about.location.hoursTitle')}</p>
                    <div className="text-tagline-2 space-y-1 text-slate-400">
                      <div className="flex justify-between">
                        <span>{t('about.location.weekdays')}</span>
                        <span className="text-white">08:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('about.location.saturday')}</span>
                        <span className="text-white">{t('about.location.byAppointment')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

About.displayName = 'About';
export default About;
