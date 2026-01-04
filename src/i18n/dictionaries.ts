import type { Locale } from './config';

// Dynamic import of translation files
const dictionaries = {
  fr: () => import('./locales/fr.json').then((m) => m.default),
  en: () => import('./locales/en.json').then((m) => m.default),
  pt: () => import('./locales/pt.json').then((m) => m.default)
};

// Type inferred from the FR file (source of truth)
export type Dictionary = Awaited<ReturnType<typeof dictionaries.fr>>;

/**
 * Load dictionary for a specific locale
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/**
 * Dictionary cache to avoid re-imports
 */
const dictionaryCache = new Map<Locale, Dictionary>();

export async function getCachedDictionary(locale: Locale): Promise<Dictionary> {
  if (!dictionaryCache.has(locale)) {
    const dictionary = await getDictionary(locale);
    dictionaryCache.set(locale, dictionary);
  }
  return dictionaryCache.get(locale)!;
}
