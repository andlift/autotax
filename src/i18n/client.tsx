'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useTransition,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from './config';
import { COOKIE_NAME, COOKIE_MAX_AGE, isValidLocale } from './config';
import type { Dictionary } from './dictionaries';

// ============================================
// Context Types
// ============================================

interface I18nContextType {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  isPending: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

// ============================================
// Provider
// ============================================

interface I18nProviderProps {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}

export function I18nProvider({
  children,
  locale: initialLocale,
  dictionary: initialDictionary,
}: I18nProviderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary);

  /**
   * Change application language
   */
  const setLocale = useCallback(
    async (newLocale: Locale) => {
      if (newLocale === locale || !isValidLocale(newLocale)) return;

      // Set cookie
      document.cookie = `${COOKIE_NAME}=${newLocale};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`;

      // Load new dictionary
      const newDictionary = await import(`./locales/${newLocale}.json`).then(
        (m) => m.default
      );

      setLocaleState(newLocale);
      setDictionary(newDictionary);

      // Refresh to update server components
      startTransition(() => {
        router.refresh();
      });
    },
    [locale, router]
  );

  /**
   * Translation function
   */
  const t = useCallback(
    (key: string, values?: Record<string, string | number>): string => {
      const keys = key.split('.');
      let value: unknown = dictionary;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          console.warn(`[i18n] Translation key not found: "${key}"`);
          return key;
        }
      }

      if (typeof value !== 'string') {
        return key;
      }

      // Value interpolation
      if (values) {
        return Object.entries(values).reduce(
          (result, [k, v]) =>
            result.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(v)),
          value
        );
      }

      return value;
    },
    [dictionary]
  );

  return (
    <I18nContext.Provider
      value={{ locale, dictionary, setLocale, t, isPending }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// ============================================
// Hooks
// ============================================

/**
 * Main hook for i18n context access
 */
export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
}

/**
 * Simplified hook for translations only
 */
export function useTranslation() {
  const { t, locale } = useI18n();
  return { t, locale };
}

/**
 * Hook for language switching
 */
export function useLocale() {
  const { locale, setLocale, isPending } = useI18n();
  return { locale, setLocale, isPending };
}
