'use client';

import { useTranslation } from '@/i18n/client';
import { cn } from '@/utils/cn';
import { Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const ServicesMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const { t } = useTranslation();
  const handleClose = () => setMenuDropdownId(null);

  const serviceLinks = [
    {
      label: t('services.taximeters.title'),
      href: '/taximetres',
      icon: Settings,
      description: t('services.taximeters.description'),
    },
    {
      label: t('services.techGlass.title'),
      href: '/#services',
      icon: ShieldCheck,
      description: t('services.techGlass.description'),
    },
  ];

  return (
    <div>
      {/* Invisible bridge to prevent menu close on mouse move */}
      <div
        className={cn(
          'absolute top-full left-1/2 z-40 h-3 w-[300px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
          menuDropdownId === 'services-dropdown-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="services-dropdown-menu"
        className={cn(
          'absolute top-full left-1/2 z-50 mt-2 hidden w-[300px] -translate-x-1/2 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 backdrop-blur-xl transition-all duration-300 xl:block',
          menuDropdownId === 'services-dropdown-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <ul className="space-y-1">
          {serviceLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={handleClose}
                className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-slate-800/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-lime-400/30 bg-lime-400/10">
                  <link.icon className="h-5 w-5 text-lime-400" />
                </span>
                <div>
                  <span className="text-tagline-1 block font-medium text-white group-hover:text-lime-400">
                    {link.label}
                  </span>
                  <span className="text-tagline-3 mt-0.5 block text-slate-400">
                    {link.description}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ServicesMenu.displayName = 'ServicesMenu';
export default ServicesMenu;
