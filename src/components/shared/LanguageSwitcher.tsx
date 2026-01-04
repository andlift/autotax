'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/i18n/client';
import { locales, localeConfig, type Locale } from '@/i18n/config';
import { cn } from '@/utils/cn';

export function LanguageSwitcher() {
  const { locale: currentLocale, setLocale, isPending } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close with Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== currentLocale) {
      setLocale(newLocale);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          'text-tagline-2 flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-medium text-white/70 transition-all hover:text-white',
          isPending && 'opacity-50 cursor-wait'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg z-50"
          role="listbox"
          aria-label="Available languages"
        >
          {locales.map((locale) => {
            const config = localeConfig[locale];
            const isSelected = locale === currentLocale;

            return (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  'text-tagline-2 flex w-full items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-slate-800',
                  isSelected ? 'bg-slate-800 text-lime-400' : 'text-white/70'
                )}
                role="option"
                aria-selected={isSelected}
              >
                <span className="text-base" role="img" aria-label={config.name}>
                  {config.flag}
                </span>
                <span>{config.nativeName}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
