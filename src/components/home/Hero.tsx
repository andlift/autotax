import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const Hero = () => {
  return (
    <section className="relative z-0 overflow-hidden bg-slate-950 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-lime-400/20 opacity-30 blur-3xl" />
        <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-slate-800/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-lime-400/5 blur-3xl" />
      </div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a3e635' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="main-container relative z-30">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <RevealAnimation delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-300">Luxembourg</span>
              </div>
            </RevealAnimation>

            {/* Main Title */}
            <RevealAnimation delay={0.1}>
              <h1 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-lime-400">AUTO TAX</span> & TECH
              </h1>
            </RevealAnimation>

            {/* Subtitle */}
            <RevealAnimation delay={0.1}>
              <p className="mx-auto mb-4 max-w-2xl text-lg text-slate-400 md:text-xl lg:mx-0 lg:text-2xl">
                Votre alternative pour l&apos;installation de taximètres
              </p>
            </RevealAnimation>

            {/* Secondary tagline */}
            <RevealAnimation delay={0.1}>
              <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-6 lg:justify-start">
                <span className="text-tagline-1 flex items-center gap-2 text-slate-400">
                  <svg className="h-5 w-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Taximètres
                </span>
                <span className="text-slate-700">|</span>
                <span className="text-tagline-1 flex items-center gap-2 text-slate-400">
                  <svg className="h-5 w-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pare-brise
                </span>
                <span className="text-slate-700">|</span>
                <span className="text-tagline-1 flex items-center gap-2 text-slate-400">
                  <svg className="h-5 w-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Toutes marques
                </span>
              </div>
            </RevealAnimation>

            {/* CTA Buttons */}
            <RevealAnimation delay={0.1}>
              <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <li>
                  <LinkButton
                    href="#services"
                    btnClass="btn-xl-v2 !border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500 font-semibold">
                    Nos Services
                  </LinkButton>
                </li>
                <li>
                  <LinkButton
                    href="#contact"
                    btnClass="btn-xl-v2 !border-slate-800 !bg-transparent !text-white hover:!border-lime-400 hover:!text-lime-400">
                    Contactez-nous
                  </LinkButton>
                </li>
              </ul>
            </RevealAnimation>
          </div>

          {/* Image */}
          <RevealAnimation delay={0.1}>
            <div className="relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <Image
                  src="/images/auto-tax-2.png"
                  alt="Auto Tax & Tech - Installation Taximètres Luxembourg"
                  width={600}
                  height={500}
                  className="relative z-10 h-auto w-full object-contain"
                  priority
                />
                {/* Glow effect behind image */}
                <div className="absolute inset-0 -z-10 translate-y-4 rounded-full bg-lime-400/20 blur-3xl" />
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
export default Hero;
