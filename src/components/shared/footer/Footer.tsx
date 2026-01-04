'use client';

import { useTranslation } from '@/i18n/client';
import Logo from '@public/images/auto-tax.svg';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t('footer.sections.services.title'),
      links: [
        { label: t('footer.sections.services.taximeters'), href: '#services' },
        { label: t('footer.sections.services.windshield'), href: '#services' },
        { label: t('footer.sections.services.sideWindows'), href: '#services' },
        { label: t('footer.sections.services.maintenance'), href: '#services' },
      ],
    },
    {
      title: t('footer.sections.company.title'),
      links: [
        { label: t('footer.sections.company.about'), href: '#about' },
        { label: t('footer.sections.company.contact'), href: '#contact' },
        { label: t('footer.sections.company.legal'), href: '/mentions-legales' },
        { label: t('footer.sections.company.privacy'), href: '/politique-confidentialite' },
      ],
    },
    {
      title: t('footer.sections.contact.title'),
      links: [
        { label: '+352 26 777 503', href: 'tel:+35226777503' },
        { label: 'info@autotaxtech.lu', href: 'mailto:info@autotaxtech.lu' },
        { label: 'Zone Industrielle Rolach', href: '#' },
        { label: 'L-5280 Sandweiler', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950">
      {/* Background gradient */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-lime-400/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="main-container relative">
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-12 py-16 lg:gap-x-8 xl:py-20">
          {/* Logo and Description */}
          <div className="col-span-12 lg:col-span-4">
            <div className="xl:max-w-[306px]">
              <Link href="/" className="mb-6 inline-block">
                <figure className="max-w-[220px]">
                  <Image src={Logo} alt="Auto Tax & Tech" />
                </figure>
              </Link>
              <p className="mb-6 text-white/60">
                {t('footer.description')}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/30 text-white/60 transition-all hover:border-lime-400 hover:text-lime-400">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/30 text-white/60 transition-all hover:border-lime-400 hover:text-lime-400">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/35226777503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/30 text-white/60 transition-all hover:border-lime-400 hover:text-lime-400">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 lg:col-span-8">
            {footerLinks.map(({ title, links }) => (
              <div className="col-span-6 md:col-span-4" key={title}>
                <div className="space-y-6">
                  <p className="text-lg font-semibold text-white">{title}</p>
                  <ul className="space-y-4">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className={`text-tagline-1 transition-colors hover:text-lime-400 ${
                            label === '+352 26 777 503'
                              ? 'font-bold text-lime-400'
                              : 'text-white/60'
                          }`}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-tagline-2 text-white/40">
              &copy; {new Date().getFullYear()} AUTO TAX & TECH. {t('footer.copyright')}
            </p>
            <div className="text-tagline-2 flex items-center gap-1 text-white/40">
              <span>{t('footer.address')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export default Footer;
