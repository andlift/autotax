'use client';
import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import mainLogo from '@public/images/auto-tax.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import MobileMenuButton from './MobileMenuButton';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'À Propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'pt', label: 'PT' },
];

const mobileMenuData = navLinks;

const Navbar = ({ showTopNav }: { showTopNav: boolean }) => {
  const { isScrolled } = useNavbarScroll(150);
  const [currentLang, setCurrentLang] = useState('fr');
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <MobileMenuProvider>
      <header
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
                  {navLinks.map((link) => (
                    <li key={link.href} className="py-2.5">
                      <Link
                        href={link.href}
                        className="text-tagline-1 flex items-center gap-1 rounded-full px-4 py-2 font-medium text-white/80 transition-all duration-200 hover:text-lime-400">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right Side - Language Selector + CTA */}
              <div className="hidden items-center gap-4 xl:flex">
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="text-tagline-2 flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-medium text-white/70 transition-all hover:text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span>{currentLang.toUpperCase()}</span>
                    <svg
                      className={cn('h-3 w-3 transition-transform', showLangMenu && 'rotate-180')}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Language Dropdown */}
                  {showLangMenu && (
                    <div className="absolute top-full right-0 mt-2 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={cn(
                            'text-tagline-2 block w-full px-4 py-2 text-left transition-colors hover:bg-slate-800',
                            currentLang === lang.code ? 'bg-slate-800 text-lime-400' : 'text-white/70',
                          )}>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

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
                    Appeler
                  </span>
                </LinkButton>
              </div>

              {/* Mobile Menu Button */}
              <MobileMenuButton />
            </div>
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={mobileMenuData} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
