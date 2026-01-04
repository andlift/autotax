'use client';
import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/utils/cn';
import logoIcon from '@public/images/auto-tax.svg';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';
import MenuCloseButton from './MenuCloseButton';

export interface NavLink {
  label: string;
  href: string;
}

const MobileMenu = ({ menuData }: { menuData: NavLink[] }) => {
  const { isOpen, closeMenu } = useMobileMenuContext();
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'scroll-bar fixed top-0 right-0 z-[9999] h-screen w-full translate-x-full bg-slate-950 transition-all duration-300 sm:w-1/2 sm:rounded-t-2xl sm:rounded-l-3xl xl:hidden',
        isOpen ? 'translate-x-0 opacity-100 md:translate-x-[8%]' : 'translate-x-full opacity-0',
      )}>
      <div className="space-y-4 p-5 sm:p-8 lg:p-9">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={closeMenu}>
            <span className="sr-only">Home</span>
            <Image src={logoIcon} alt="Auto Tax & Tech" width={240} height={58} className="block w-[240px]" />
          </Link>
          {/* close btn  */}
          <MenuCloseButton />
        </div>

        {/* menu items list  */}
        <div className="scroll-bar mt-6 h-[85vh] w-full overflow-x-hidden pb-10">
          <p className="text-tagline-1 relative mb-4 block font-normal text-slate-500">
            Menu
          </p>
          <ul className="space-y-1">
            {menuData.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-lg font-medium text-white/80 transition-all duration-200 hover:bg-slate-900 hover:text-lime-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="mt-6">
            <p className="text-tagline-1 relative mb-4 block font-normal text-slate-500">
              {t('nav.language')}
            </p>
            <LanguageSwitcher />
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="tel:+35226777503"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-4 font-semibold text-slate-900 transition-all hover:bg-lime-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +352 26 777 503
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

MobileMenu.displayName = 'MobileMenu';
export default MobileMenu;
