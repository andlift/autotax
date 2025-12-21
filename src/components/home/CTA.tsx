import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const CTA = () => {
  return (
    <section id="contact" className="bg-slate-50 py-16 lg:py-22 xl:py-28">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="relative z-0 mx-auto flex flex-col items-center justify-center space-y-8 overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm md:rounded-4xl md:py-20 lg:py-28">
            {/* Background decorative elements */}
            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-lime-100 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-lime-200 blur-3xl" />

            {/* Content */}
            <div className="relative space-y-4">
              <RevealAnimation delay={0.1}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                  <span className="text-tagline-2 font-medium uppercase tracking-wider text-slate-400">
                    Contact
                  </span>
                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.1}>
                <h2 className="text-3xl font-bold text-slate-950 md:text-4xl lg:text-5xl">
                  Besoin d&apos;un <span className="text-slate-500">devis</span> ?
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={0.1}>
                <p className="mx-auto max-w-xl text-lg text-slate-400">
                  Contactez-nous pour obtenir un devis gratuit et personnalisé.
                  <br className="hidden lg:block" />
                  Notre équipe vous répond sous 24h.
                </p>
              </RevealAnimation>
            </div>

            {/* Contact Info */}
            <RevealAnimation delay={0.1}>
              <div className="grid gap-6 md:grid-cols-3">
                <a
                  href="tel:+35226777503"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all hover:border-lime-400 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100">
                    <svg className="h-5 w-5 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-tagline-2 text-slate-400">Téléphone</p>
                    <p className="font-semibold text-slate-950 group-hover:text-lime-500">+352 26 777 503</p>
                  </div>
                </a>

                <a
                  href="mailto:info@autotaxtech.lu"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all hover:border-lime-400 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100">
                    <svg className="h-5 w-5 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-tagline-2 text-slate-400">Email</p>
                    <p className="font-semibold text-slate-950 group-hover:text-lime-500">info@autotaxtech.lu</p>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=Zone+Industrielle+Rolach+L-5280+Sandweiler+Luxembourg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all hover:border-lime-400 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100">
                    <svg className="h-5 w-5 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div className="text-left">
                    <p className="text-tagline-2 text-slate-400">Adresse</p>
                    <p className="font-semibold text-slate-950 group-hover:text-lime-500">Sandweiler, Luxembourg</p>
                  </div>
                </a>
              </div>
            </RevealAnimation>

            {/* CTA Buttons */}
            <RevealAnimation delay={0.1}>
              <ul className="flex w-full flex-col items-center justify-center gap-4 pt-4 md:w-auto md:flex-row">
                <li className="w-[90%] md:w-auto">
                  <LinkButton
                    href="tel:+35226777503"
                    btnClass="btn-xl-v2 !border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500 font-semibold">
                    Appelez-nous
                  </LinkButton>
                </li>
                <li className="w-[90%] md:w-auto">
                  <LinkButton
                    href="mailto:info@autotaxtech.lu"
                    btnClass="btn-xl-v2 !border-slate-200 !bg-transparent !text-slate-950 hover:!border-lime-400 hover:!text-lime-500">
                    Envoyez un email
                  </LinkButton>
                </li>
              </ul>
            </RevealAnimation>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

CTA.displayName = 'CTA';
export default CTA;
