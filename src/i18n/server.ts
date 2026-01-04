import { cookies, headers } from 'next/headers';
import {
  defaultLocale,
  isValidLocale,
  COOKIE_NAME,
  type Locale
} from './config';
import { getDictionary, type Dictionary } from './dictionaries';

/**
 * Get current locale on the server
 * Priority: header x-locale > cookie > default
 */
export async function getLocale(): Promise<Locale> {
  // 1. Try header set by middleware
  const headersList = await headers();
  const headerLocale = headersList.get('x-locale');

  if (headerLocale && isValidLocale(headerLocale)) {
    return headerLocale;
  }

  // 2. Try cookie
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 3. Fallback to default
  return defaultLocale;
}

/**
 * Get translations dictionary for current locale
 */
export async function getTranslations(): Promise<Dictionary> {
  const locale = await getLocale();
  return getDictionary(locale);
}

/**
 * Create a type-safe translation function
 */
export async function createTranslator() {
  const dictionary = await getTranslations();

  /**
   * Translation function with nested key support
   * @example t('nav.home') → "Accueil"
   * @example t('hero.services.taximeters') → "Taximètres"
   */
  return function t(key: string): string {
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
      console.warn(`[i18n] Translation key "${key}" is not a string`);
      return key;
    }

    return value;
  };
}

/**
 * Helper for value interpolation
 * @example interpolate("Hello {{name}}", { name: "John" }) → "Hello John"
 */
export function interpolate(
  text: string,
  values: Record<string, string | number>
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) =>
      result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value)),
    text
  );
}
