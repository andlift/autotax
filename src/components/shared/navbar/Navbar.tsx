'use client';
import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/utils/cn';
import mainLogo from '@public/images/auto-tax.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import MobileMenu from '../mobile-menu/MobileMenu';
import MobileMenuButton from './MobileMenuButton';
import ServicesMenu from './ServicesMenu';

const Navbar = ({ showTopNav }: { showTopNav: boolean }) => {
  const { isScrolled } = useNavbarScroll(150);
  const { t } = useTranslation();
  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 rounded-full backdrop-blur-[25px] transition-all duration-500 ease-in-out min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          showTopNav ? 'top-14 max-md:top-14' : 'top-5',
          isScrolled && 'top-2! bg-slate-950/95',
        )}>
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div>
            <div
              className={cn(
                'flex items-center justify-between rounded-full border border-slate-800/50 bg-slate-900/30 px-4 py-3 backdrop-blur-[25px] xl:py-2',
              )}>
              {/* Logo */}
              <div>
                <Link href="/">
                  <span className="sr-only">Auto Tax & Tech</span>
                  <Image src={mainLogo} alt="Auto Tax & Tech" width={240} height={58} className="w-[240px] md:w-[200px] lg:w-[220px]" priority />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden items-center xl:flex">
                <ul className="flex items-center gap-1">
                  {/* Home */}
                  <li className="py-2.5">
                    <Link
                      href="/"
                      className="text-tagline-1 flex items-center gap-1 rounded-full px-4 py-2 font-medium text-white/80 transition-all duration-200 hover:text-lime-400">
                      {t('nav.home')}
                    </Link>
                  </li>

                  {/* Services with Dropdown */}
                  <li
                    className="nav-item relative cursor-pointer py-2.5"
                    data-menu="services-dropdown-menu"
                    onMouseEnter={() => handleMenuHover('services-dropdown-menu')}>
                    <Link
                      href="#services"
                      className="text-tagline-1 flex items-center gap-1 rounded-full px-4 py-2 font-medium text-white/80 transition-all duration-200 hover:text-lime-400">
                      <span>{t('nav.services')}</span>
                      <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </Link>
                    <ServicesMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                  </li>

                  {/* About */}
                  <li className="py-2.5">
                    <Link
                      href="#about"
                      className="text-tagline-1 flex items-center gap-1 rounded-full px-4 py-2 font-medium text-white/80 transition-all duration-200 hover:text-lime-400">
                      {t('nav.about')}
                    </Link>
                  </li>

                  {/* Contact */}
                  <li className="py-2.5">
                    <Link
                      href="#contact"
                      className="text-tagline-1 flex items-center gap-1 rounded-full px-4 py-2 font-medium text-white/80 transition-all duration-200 hover:text-lime-400">
                      {t('nav.contact')}
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Right Side - Language Selector + CTA */}
              <div className="hidden items-center gap-4 xl:flex">
                {/* Language Selector */}
                <LanguageSwitcher />

                {/* CTA Button */}
                <LinkButton
                  href="tel:+35226777503"
                  btnClass="btn-md-v2 !border-lime-400 !bg-lime-400 !text-slate-950 hover:!bg-lime-500 font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {t('common.callUs')}
                  </span>
                </LinkButton>
              </div>

              {/* Mobile Menu Button */}
              <MobileMenuButton />
            </div>
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={navLinks} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
