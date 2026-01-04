# Guia Completo: Internacionalização Cookie-Based em Next.js

## Projeto: AutoTax Tech
**Domínio:** https://autotaxtech.lu  
**Estratégia:** Cookie/State-based (sem prefixos de URL)

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura da Solução](#2-arquitetura-da-solução)
3. [Implementação Passo a Passo](#3-implementação-passo-a-passo)
4. [Ficheiros de Tradução](#4-ficheiros-de-tradução)
5. [Componentes de UI](#5-componentes-de-ui)
6. [SEO e Metadados](#6-seo-e-metadados)
7. [Exemplos de Páginas](#7-exemplos-de-páginas)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Visão Geral

### Estratégia Cookie-Based

Com um único domínio e sem alteração de URLs, a internacionalização é gerida através de:

- **Cookie** `NEXT_LOCALE` para persistência do idioma escolhido
- **Context React** para disponibilizar traduções em toda a aplicação
- **Middleware** para deteção automática do idioma preferido do browser

### URLs Resultantes

```
https://autotaxtech.lu/           → Página inicial (idioma do cookie/browser)
https://autotaxtech.lu/calculator → Calculadora (mesmo idioma)
https://autotaxtech.lu/about      → Sobre (mesmo idioma)
```

**Nota:** A URL não muda com o idioma. Apenas o conteúdo é traduzido.

### Idiomas Suportados

| Código | Idioma | Bandeira |
|--------|--------|----------|
| `en` | English | 🇬🇧 |
| `fr` | Français | 🇫🇷 |
| `pt` | Português | 🇵🇹 |

---

## 2. Arquitetura da Solução

### Estrutura de Ficheiros

```
src/
├── app/
│   ├── layout.tsx              # Layout com I18nProvider
│   ├── page.tsx                # Página inicial
│   ├── calculator/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx
├── i18n/
│   ├── config.ts               # Configurações e tipos
│   ├── server.ts               # Utilitários server-side
│   ├── client.tsx              # Provider e hooks client-side
│   ├── dictionaries.ts         # Loader de dicionários
│   └── locales/
│       ├── en.json
│       ├── fr.json
│       ├── pt.json
├── components/
│   ├── LanguageSwitcher.tsx    # Seletor de idioma
│   └── Header.tsx
├── middleware.ts               # Deteção de idioma
└── next.config.ts
```

### Fluxo de Funcionamento

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRIMEIRA VISITA                          │
├─────────────────────────────────────────────────────────────────┤
│  1. Utilizador acede a autotaxtech.lu                           │
│  2. Middleware verifica cookie NEXT_LOCALE                       │
│  3. Se não existe → usa Accept-Language header do browser       │
│  4. Define cookie com locale detetado                           │
│  5. Página carrega com traduções do locale                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      MUDANÇA DE IDIOMA                          │
├─────────────────────────────────────────────────────────────────┤
│  1. Utilizador clica no Language Switcher                       │
│  2. Novo locale é guardado no cookie                            │
│  3. Página faz refresh ou re-render                             │
│  4. Conteúdo aparece no novo idioma                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Implementação Passo a Passo

### 3.1 Configuração Base

```typescript
// src/i18n/config.ts

export const locales = ['en', 'fr', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeConfig: Record<Locale, {
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}> = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  pt: {
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    direction: 'ltr',
  }
};

export const COOKIE_NAME = 'NEXT_LOCALE';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 ano

/**
 * Verifica se um valor é um locale válido
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}
```

### 3.2 Loader de Dicionários

```typescript
// src/i18n/dictionaries.ts

import type { Locale } from './config';

// Importação dinâmica dos ficheiros de tradução
const dictionaries = {
  en: () => import('./locales/en.json').then((m) => m.default),
  fr: () => import('./locales/fr.json').then((m) => m.default),
  pt: () => import('./locales/pt.json').then((m) => m.default)
};

// Tipo inferido do ficheiro EN (fonte de verdade)
export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

/**
 * Carrega o dicionário para um locale específico
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/**
 * Cache de dicionários para evitar re-imports
 */
const dictionaryCache = new Map<Locale, Dictionary>();

export async function getCachedDictionary(locale: Locale): Promise<Dictionary> {
  if (!dictionaryCache.has(locale)) {
    const dictionary = await getDictionary(locale);
    dictionaryCache.set(locale, dictionary);
  }
  return dictionaryCache.get(locale)!;
}
```

### 3.3 Middleware

```typescript
// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { 
  locales, 
  defaultLocale, 
  isValidLocale, 
  COOKIE_NAME, 
  COOKIE_MAX_AGE,
  type Locale 
} from '@/i18n/config';

/**
 * Extrai o locale preferido do header Accept-Language
 */
function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language: "fr-FR,fr;q=0.9,en;q=0.8"
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, priority] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(), // "fr-FR" → "fr"
        priority: priority ? parseFloat(priority) : 1,
      };
    })
    .sort((a, b) => b.priority - a.priority);

  // Encontrar primeiro match com locales suportados
  for (const { code } of languages) {
    if (isValidLocale(code)) {
      return code;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar assets estáticos e API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // ficheiros estáticos
  ) {
    return NextResponse.next();
  }

  // Verificar cookie existente
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  
  let locale: Locale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    // Usar locale do cookie
    locale = cookieLocale;
  } else {
    // Detetar do browser
    const acceptLanguage = request.headers.get('accept-language');
    locale = getPreferredLocale(acceptLanguage);
  }

  // Criar resposta
  const response = NextResponse.next();

  // Adicionar locale ao header para server components
  response.headers.set('x-locale', locale);

  // Definir/atualizar cookie se necessário
  if (cookieLocale !== locale) {
    response.cookies.set(COOKIE_NAME, locale, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
```

### 3.4 Utilitários Server-Side

```typescript
// src/i18n/server.ts

import { cookies, headers } from 'next/headers';
import { 
  defaultLocale, 
  isValidLocale, 
  COOKIE_NAME,
  type Locale 
} from './config';
import { getDictionary, type Dictionary } from './dictionaries';

/**
 * Obtém o locale atual no servidor
 * Prioridade: header x-locale > cookie > default
 */
export async function getLocale(): Promise<Locale> {
  // 1. Tentar header definido pelo middleware
  const headersList = await headers();
  const headerLocale = headersList.get('x-locale');
  
  if (headerLocale && isValidLocale(headerLocale)) {
    return headerLocale;
  }

  // 2. Tentar cookie
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;
  
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 3. Fallback para default
  return defaultLocale;
}

/**
 * Obtém o dicionário de traduções para o locale atual
 */
export async function getTranslations(): Promise<Dictionary> {
  const locale = await getLocale();
  return getDictionary(locale);
}

/**
 * Cria uma função de tradução type-safe
 */
export async function createTranslator() {
  const dictionary = await getTranslations();

  /**
   * Função de tradução com suporte a nested keys
   * @example t('nav.home') → "Home"
   * @example t('calculator.form.vehicleType') → "Vehicle Type"
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
 * Helper para interpolação de valores
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
```

### 3.5 Provider e Hooks Client-Side

```typescript
// src/i18n/client.tsx
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
   * Muda o idioma da aplicação
   */
  const setLocale = useCallback(
    async (newLocale: Locale) => {
      if (newLocale === locale || !isValidLocale(newLocale)) return;

      // Definir cookie
      document.cookie = `${COOKIE_NAME}=${newLocale};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`;

      // Carregar novo dicionário
      const newDictionary = await import(`./locales/${newLocale}.json`).then(
        (m) => m.default
      );

      setLocaleState(newLocale);
      setDictionary(newDictionary);

      // Refresh para atualizar server components
      startTransition(() => {
        router.refresh();
      });
    },
    [locale, router]
  );

  /**
   * Função de tradução
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

      // Interpolação de valores
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
 * Hook principal para acesso ao contexto i18n
 */
export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
}

/**
 * Hook simplificado apenas para traduções
 */
export function useTranslation() {
  const { t, locale } = useI18n();
  return { t, locale };
}

/**
 * Hook para mudança de idioma
 */
export function useLocale() {
  const { locale, setLocale, isPending } = useI18n();
  return { locale, setLocale, isPending };
}
```

### 3.6 Layout Principal

```typescript
// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/i18n/client';
import { getLocale, getTranslations } from '@/i18n/server';
import { localeConfig } from '@/i18n/config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getTranslations();

  return {
    title: {
      default: dictionary.metadata.title,
      template: `%s | ${dictionary.metadata.siteName}`,
    },
    description: dictionary.metadata.description,
    metadataBase: new URL('https://autotaxtech.lu'),
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: 'https://autotaxtech.lu',
      siteName: dictionary.metadata.siteName,
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dictionary = await getTranslations();
  const { direction } = localeConfig[locale];

  return (
    <html lang={locale} dir={direction}>
      <body className={inter.className}>
        <I18nProvider locale={locale} dictionary={dictionary}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

---

## 4. Ficheiros de Tradução

### 4.1 Inglês (en.json) - Ficheiro Base

```json
{
  "metadata": {
    "title": "AutoTax Tech - Vehicle Tax Calculator",
    "description": "Calculate your vehicle taxes in Luxembourg quickly and accurately",
    "siteName": "AutoTax Tech"
  },
  "common": {
    "calculate": "Calculate",
    "result": "Result",
    "results": "Results",
    "back": "Back",
    "next": "Next",
    "submit": "Submit",
    "reset": "Reset",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "required": "Required",
    "optional": "Optional",
    "yes": "Yes",
    "no": "No",
    "or": "or",
    "and": "and"
  },
  "nav": {
    "home": "Home",
    "calculator": "Calculator",
    "about": "About",
    "contact": "Contact",
    "faq": "FAQ",
    "language": "Language"
  },
  "home": {
    "hero": {
      "title": "Calculate Your Vehicle Taxes",
      "subtitle": "Quick and accurate tax simulation for vehicle imports in Luxembourg",
      "cta": "Start Calculation",
      "secondaryCta": "Learn More"
    },
    "features": {
      "title": "Why Choose AutoTax Tech?",
      "fast": {
        "title": "Fast",
        "description": "Get results in seconds"
      },
      "accurate": {
        "title": "Accurate",
        "description": "Calculations based on current legislation"
      },
      "free": {
        "title": "Free",
        "description": "No costs or mandatory registration"
      },
      "secure": {
        "title": "Secure",
        "description": "Your data is never stored"
      }
    },
    "howItWorks": {
      "title": "How It Works",
      "step1": {
        "title": "Enter Vehicle Details",
        "description": "Provide information about your vehicle"
      },
      "step2": {
        "title": "Get Instant Results",
        "description": "See your tax calculation immediately"
      },
      "step3": {
        "title": "Plan Your Budget",
        "description": "Know exactly what to expect"
      }
    }
  },
  "calculator": {
    "title": "Tax Calculator",
    "subtitle": "Enter your vehicle details to calculate applicable taxes",
    "form": {
      "vehicleType": "Vehicle Type",
      "fuelType": "Fuel Type",
      "engineCapacity": "Engine Capacity (cc)",
      "co2Emissions": "CO2 Emissions (g/km)",
      "registrationDate": "First Registration Date",
      "purchasePrice": "Purchase Price (€)",
      "mileage": "Mileage (km)",
      "power": "Power (kW)"
    },
    "vehicleTypes": {
      "car": "Car",
      "motorcycle": "Motorcycle",
      "commercial": "Commercial Vehicle",
      "camper": "Camper Van"
    },
    "fuelTypes": {
      "petrol": "Petrol",
      "diesel": "Diesel",
      "hybrid": "Hybrid",
      "pluginHybrid": "Plug-in Hybrid",
      "electric": "Electric",
      "lpg": "LPG",
      "cng": "CNG"
    },
    "results": {
      "title": "Calculation Results",
      "registrationTax": "Registration Tax",
      "annualTax": "Annual Road Tax",
      "vat": "VAT (17%)",
      "total": "Estimated Total",
      "breakdown": "Cost Breakdown",
      "disclaimer": "These values are indicative and subject to official confirmation. Actual taxes may vary based on specific vehicle characteristics and current regulations.",
      "saveResults": "Save Results",
      "printResults": "Print Results",
      "newCalculation": "New Calculation"
    },
    "validation": {
      "required": "This field is required",
      "invalidNumber": "Please enter a valid number",
      "minValue": "Minimum value is {{min}}",
      "maxValue": "Maximum value is {{max}}"
    }
  },
  "about": {
    "title": "About AutoTax Tech",
    "description": "AutoTax Tech is a free online tool designed to help you estimate vehicle taxes in Luxembourg.",
    "mission": {
      "title": "Our Mission",
      "text": "To provide transparent and accessible information about vehicle taxation, helping individuals and businesses make informed decisions."
    },
    "disclaimer": {
      "title": "Disclaimer",
      "text": "The calculations provided by this tool are for informational purposes only. For official tax assessments, please consult the relevant Luxembourg authorities."
    }
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "Have questions? We're here to help.",
    "form": {
      "name": "Your Name",
      "email": "Email Address",
      "subject": "Subject",
      "message": "Your Message",
      "submit": "Send Message"
    },
    "info": {
      "email": "Email",
      "phone": "Phone",
      "address": "Address"
    },
    "success": "Thank you! Your message has been sent.",
    "error": "Something went wrong. Please try again."
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "questions": {
      "q1": {
        "question": "How accurate are the calculations?",
        "answer": "Our calculations are based on current Luxembourg legislation and are regularly updated. However, they should be considered estimates only."
      },
      "q2": {
        "question": "Is this service free?",
        "answer": "Yes, AutoTax Tech is completely free to use. No registration required."
      },
      "q3": {
        "question": "What vehicles are supported?",
        "answer": "We support cars, motorcycles, commercial vehicles, and camper vans."
      }
    }
  },
  "footer": {
    "rights": "All rights reserved",
    "privacy": "Privacy Policy",
    "terms": "Terms of Use",
    "cookies": "Cookie Policy",
    "tagline": "Simplifying vehicle tax calculations in Luxembourg"
  },
  "errors": {
    "notFound": {
      "title": "Page Not Found",
      "description": "The page you're looking for doesn't exist.",
      "backHome": "Go to Homepage"
    },
    "serverError": {
      "title": "Server Error",
      "description": "Something went wrong. Please try again later."
    }
  }
}
```

### 4.2 Francês (fr.json)

```json
{
  "metadata": {
    "title": "AutoTax Tech - Calculateur de Taxes Véhicules",
    "description": "Calculez vos taxes automobiles au Luxembourg rapidement et avec précision",
    "siteName": "AutoTax Tech"
  },
  "common": {
    "calculate": "Calculer",
    "result": "Résultat",
    "results": "Résultats",
    "back": "Retour",
    "next": "Suivant",
    "submit": "Soumettre",
    "reset": "Réinitialiser",
    "loading": "Chargement...",
    "error": "Erreur",
    "success": "Succès",
    "required": "Obligatoire",
    "optional": "Optionnel",
    "yes": "Oui",
    "no": "Non",
    "or": "ou",
    "and": "et"
  },
  "nav": {
    "home": "Accueil",
    "calculator": "Calculateur",
    "about": "À propos",
    "contact": "Contact",
    "faq": "FAQ",
    "language": "Langue"
  },
  "home": {
    "hero": {
      "title": "Calculez vos Taxes Véhicules",
      "subtitle": "Simulation rapide et précise des taxes pour l'importation de véhicules au Luxembourg",
      "cta": "Commencer le Calcul",
      "secondaryCta": "En savoir plus"
    },
    "features": {
      "title": "Pourquoi choisir AutoTax Tech ?",
      "fast": {
        "title": "Rapide",
        "description": "Résultats en quelques secondes"
      },
      "accurate": {
        "title": "Précis",
        "description": "Calculs basés sur la législation en vigueur"
      },
      "free": {
        "title": "Gratuit",
        "description": "Sans frais ni inscription obligatoire"
      },
      "secure": {
        "title": "Sécurisé",
        "description": "Vos données ne sont jamais stockées"
      }
    },
    "howItWorks": {
      "title": "Comment ça marche",
      "step1": {
        "title": "Entrez les détails du véhicule",
        "description": "Fournissez les informations sur votre véhicule"
      },
      "step2": {
        "title": "Obtenez les résultats instantanément",
        "description": "Voyez votre calcul de taxes immédiatement"
      },
      "step3": {
        "title": "Planifiez votre budget",
        "description": "Sachez exactement à quoi vous attendre"
      }
    }
  },
  "calculator": {
    "title": "Calculateur de Taxes",
    "subtitle": "Entrez les détails de votre véhicule pour calculer les taxes applicables",
    "form": {
      "vehicleType": "Type de véhicule",
      "fuelType": "Type de carburant",
      "engineCapacity": "Cylindrée (cc)",
      "co2Emissions": "Émissions CO2 (g/km)",
      "registrationDate": "Date de première immatriculation",
      "purchasePrice": "Prix d'achat (€)",
      "mileage": "Kilométrage (km)",
      "power": "Puissance (kW)"
    },
    "vehicleTypes": {
      "car": "Voiture",
      "motorcycle": "Moto",
      "commercial": "Véhicule commercial",
      "camper": "Camping-car"
    },
    "fuelTypes": {
      "petrol": "Essence",
      "diesel": "Diesel",
      "hybrid": "Hybride",
      "pluginHybrid": "Hybride rechargeable",
      "electric": "Électrique",
      "lpg": "GPL",
      "cng": "GNC"
    },
    "results": {
      "title": "Résultats du calcul",
      "registrationTax": "Taxe d'immatriculation",
      "annualTax": "Taxe annuelle de circulation",
      "vat": "TVA (17%)",
      "total": "Total estimé",
      "breakdown": "Détail des coûts",
      "disclaimer": "Ces valeurs sont indicatives et sujettes à confirmation officielle. Les taxes réelles peuvent varier en fonction des caractéristiques spécifiques du véhicule et de la réglementation en vigueur.",
      "saveResults": "Sauvegarder",
      "printResults": "Imprimer",
      "newCalculation": "Nouveau calcul"
    },
    "validation": {
      "required": "Ce champ est obligatoire",
      "invalidNumber": "Veuillez entrer un nombre valide",
      "minValue": "La valeur minimale est {{min}}",
      "maxValue": "La valeur maximale est {{max}}"
    }
  },
  "about": {
    "title": "À propos d'AutoTax Tech",
    "description": "AutoTax Tech est un outil en ligne gratuit conçu pour vous aider à estimer les taxes véhicules au Luxembourg.",
    "mission": {
      "title": "Notre Mission",
      "text": "Fournir des informations transparentes et accessibles sur la fiscalité automobile, aidant les particuliers et les entreprises à prendre des décisions éclairées."
    },
    "disclaimer": {
      "title": "Avertissement",
      "text": "Les calculs fournis par cet outil sont uniquement à titre informatif. Pour les évaluations fiscales officielles, veuillez consulter les autorités luxembourgeoises compétentes."
    }
  },
  "contact": {
    "title": "Contactez-nous",
    "subtitle": "Des questions ? Nous sommes là pour vous aider.",
    "form": {
      "name": "Votre nom",
      "email": "Adresse e-mail",
      "subject": "Sujet",
      "message": "Votre message",
      "submit": "Envoyer le message"
    },
    "info": {
      "email": "E-mail",
      "phone": "Téléphone",
      "address": "Adresse"
    },
    "success": "Merci ! Votre message a été envoyé.",
    "error": "Une erreur s'est produite. Veuillez réessayer."
  },
  "faq": {
    "title": "Questions Fréquentes",
    "questions": {
      "q1": {
        "question": "Quelle est la précision des calculs ?",
        "answer": "Nos calculs sont basés sur la législation luxembourgeoise en vigueur et sont régulièrement mis à jour. Cependant, ils doivent être considérés comme des estimations uniquement."
      },
      "q2": {
        "question": "Ce service est-il gratuit ?",
        "answer": "Oui, AutoTax Tech est entièrement gratuit. Aucune inscription requise."
      },
      "q3": {
        "question": "Quels véhicules sont pris en charge ?",
        "answer": "Nous prenons en charge les voitures, motos, véhicules commerciaux et camping-cars."
      }
    }
  },
  "footer": {
    "rights": "Tous droits réservés",
    "privacy": "Politique de confidentialité",
    "terms": "Conditions d'utilisation",
    "cookies": "Politique des cookies",
    "tagline": "Simplifier le calcul des taxes véhicules au Luxembourg"
  },
  "errors": {
    "notFound": {
      "title": "Page non trouvée",
      "description": "La page que vous recherchez n'existe pas.",
      "backHome": "Retour à l'accueil"
    },
    "serverError": {
      "title": "Erreur serveur",
      "description": "Une erreur s'est produite. Veuillez réessayer plus tard."
    }
  }
}
```


### 4.4 Português (pt.json)

```json
{
  "metadata": {
    "title": "AutoTax Tech - Calculadora de Impostos Automóvel",
    "description": "Calcule os impostos do seu veículo no Luxemburgo de forma rápida e precisa",
    "siteName": "AutoTax Tech"
  },
  "common": {
    "calculate": "Calcular",
    "result": "Resultado",
    "results": "Resultados",
    "back": "Voltar",
    "next": "Seguinte",
    "submit": "Submeter",
    "reset": "Reiniciar",
    "loading": "A carregar...",
    "error": "Erro",
    "success": "Sucesso",
    "required": "Obrigatório",
    "optional": "Opcional",
    "yes": "Sim",
    "no": "Não",
    "or": "ou",
    "and": "e"
  },
  "nav": {
    "home": "Início",
    "calculator": "Calculadora",
    "about": "Sobre",
    "contact": "Contacto",
    "faq": "FAQ",
    "language": "Idioma"
  },
  "home": {
    "hero": {
      "title": "Calcule os Impostos do seu Veículo",
      "subtitle": "Simulação rápida e precisa de impostos para importação de veículos no Luxemburgo",
      "cta": "Iniciar Cálculo",
      "secondaryCta": "Saber Mais"
    },
    "features": {
      "title": "Porquê escolher o AutoTax Tech?",
      "fast": {
        "title": "Rápido",
        "description": "Resultados em segundos"
      },
      "accurate": {
        "title": "Preciso",
        "description": "Cálculos baseados na legislação atual"
      },
      "free": {
        "title": "Gratuito",
        "description": "Sem custos ou registo obrigatório"
      },
      "secure": {
        "title": "Seguro",
        "description": "Os seus dados nunca são armazenados"
      }
    },
    "howItWorks": {
      "title": "Como Funciona",
      "step1": {
        "title": "Introduza os Dados do Veículo",
        "description": "Forneça informações sobre o seu veículo"
      },
      "step2": {
        "title": "Obtenha Resultados Instantâneos",
        "description": "Veja o cálculo dos impostos imediatamente"
      },
      "step3": {
        "title": "Planeie o seu Orçamento",
        "description": "Saiba exatamente o que esperar"
      }
    }
  },
  "calculator": {
    "title": "Calculadora de Impostos",
    "subtitle": "Introduza os dados do seu veículo para calcular os impostos aplicáveis",
    "form": {
      "vehicleType": "Tipo de Veículo",
      "fuelType": "Tipo de Combustível",
      "engineCapacity": "Cilindrada (cc)",
      "co2Emissions": "Emissões CO2 (g/km)",
      "registrationDate": "Data da Primeira Matrícula",
      "purchasePrice": "Preço de Compra (€)",
      "mileage": "Quilometragem (km)",
      "power": "Potência (kW)"
    },
    "vehicleTypes": {
      "car": "Automóvel",
      "motorcycle": "Motociclo",
      "commercial": "Veículo Comercial",
      "camper": "Autocaravana"
    },
    "fuelTypes": {
      "petrol": "Gasolina",
      "diesel": "Diesel",
      "hybrid": "Híbrido",
      "pluginHybrid": "Híbrido Plug-in",
      "electric": "Elétrico",
      "lpg": "GPL",
      "cng": "GNC"
    },
    "results": {
      "title": "Resultados do Cálculo",
      "registrationTax": "Imposto de Registo",
      "annualTax": "Imposto Anual de Circulação",
      "vat": "IVA (17%)",
      "total": "Total Estimado",
      "breakdown": "Discriminação de Custos",
      "disclaimer": "Estes valores são indicativos e estão sujeitos a confirmação oficial. Os impostos reais podem variar com base nas características específicas do veículo e na regulamentação atual.",
      "saveResults": "Guardar Resultados",
      "printResults": "Imprimir Resultados",
      "newCalculation": "Novo Cálculo"
    },
    "validation": {
      "required": "Este campo é obrigatório",
      "invalidNumber": "Por favor introduza um número válido",
      "minValue": "O valor mínimo é {{min}}",
      "maxValue": "O valor máximo é {{max}}"
    }
  },
  "about": {
    "title": "Sobre o AutoTax Tech",
    "description": "O AutoTax Tech é uma ferramenta online gratuita concebida para ajudá-lo a estimar os impostos de veículos no Luxemburgo.",
    "mission": {
      "title": "A Nossa Missão",
      "text": "Fornecer informações transparentes e acessíveis sobre tributação de veículos, ajudando particulares e empresas a tomar decisões informadas."
    },
    "disclaimer": {
      "title": "Aviso Legal",
      "text": "Os cálculos fornecidos por esta ferramenta são apenas para fins informativos. Para avaliações fiscais oficiais, consulte as autoridades luxemburguesas competentes."
    }
  },
  "contact": {
    "title": "Contacte-nos",
    "subtitle": "Tem perguntas? Estamos aqui para ajudar.",
    "form": {
      "name": "O seu Nome",
      "email": "Endereço de Email",
      "subject": "Assunto",
      "message": "A sua Mensagem",
      "submit": "Enviar Mensagem"
    },
    "info": {
      "email": "Email",
      "phone": "Telefone",
      "address": "Morada"
    },
    "success": "Obrigado! A sua mensagem foi enviada.",
    "error": "Algo correu mal. Por favor tente novamente."
  },
  "faq": {
    "title": "Perguntas Frequentes",
    "questions": {
      "q1": {
        "question": "Qual é a precisão dos cálculos?",
        "answer": "Os nossos cálculos baseiam-se na legislação luxemburguesa atual e são atualizados regularmente. No entanto, devem ser considerados apenas como estimativas."
      },
      "q2": {
        "question": "Este serviço é gratuito?",
        "answer": "Sim, o AutoTax Tech é totalmente gratuito. Não é necessário registo."
      },
      "q3": {
        "question": "Que veículos são suportados?",
        "answer": "Suportamos automóveis, motociclos, veículos comerciais e autocaravanas."
      }
    }
  },
  "footer": {
    "rights": "Todos os direitos reservados",
    "privacy": "Política de Privacidade",
    "terms": "Termos de Utilização",
    "cookies": "Política de Cookies",
    "tagline": "Simplificar o cálculo de impostos de veículos no Luxemburgo"
  },
  "errors": {
    "notFound": {
      "title": "Página Não Encontrada",
      "description": "A página que procura não existe.",
      "backHome": "Ir para a Página Inicial"
    },
    "serverError": {
      "title": "Erro de Servidor",
      "description": "Algo correu mal. Por favor tente novamente mais tarde."
    }
  }
}
```

---

## 5. Componentes de UI

### 5.1 Language Switcher

```typescript
// src/components/LanguageSwitcher.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/i18n/client';
import { locales, localeConfig, type Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const { locale: currentLocale, setLocale, isPending } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
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

  // Fechar com Escape
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

  const currentConfig = localeConfig[currentLocale];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg 
          border border-gray-200 hover:border-gray-300 
          hover:bg-gray-50 transition-all duration-200
          ${isPending ? 'opacity-50 cursor-wait' : ''}
        `}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-xl" role="img" aria-label={currentConfig.name}>
          {currentConfig.flag}
        </span>
        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          {currentConfig.nativeName}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 mt-2 w-56 
            bg-white rounded-xl shadow-lg 
            border border-gray-100 
            py-2 z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          "
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
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-left transition-colors duration-150
                  ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }
                `}
                role="option"
                aria-selected={isSelected}
              >
                <span className="text-xl" role="img" aria-label={config.name}>
                  {config.flag}
                </span>
                <span className="flex-1 font-medium">{config.nativeName}</span>
                <span className="text-sm text-gray-400">{config.name}</span>
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

### 5.2 Header com Navegação

```typescript
// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n/client';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';

export function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/calculator', label: t('nav.calculator') },
    { href: '/about', label: t('nav.about') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">AutoTax</span>
            <span className="text-sm text-gray-500 hidden sm:inline">Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
```

### 5.3 Footer

```typescript
// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n/client';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AutoTax Tech
            </Link>
            <p className="mt-2 text-gray-600 max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculator"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('nav.calculator')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {currentYear} AutoTax Tech. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
```

---

## 6. SEO e Metadados

### 6.1 Considerações de SEO para Cookie-Based i18n

⚠️ **Importante:** A abordagem cookie-based tem limitações de SEO porque:

- Os motores de busca não podem ver diferentes versões de idioma
- O conteúdo indexado será sempre no idioma default
- Não há URLs distintas para cada idioma

**Mitigações possíveis:**

1. Garantir que o idioma default (`en`) está bem otimizado
2. Usar `<html lang="">` corretamente
3. Considerar adicionar sub-paths no futuro se SEO multilíngue for crítico

### 6.2 Metadata Dinâmica

```typescript
// src/app/calculator/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getTranslations();

  return {
    title: dictionary.calculator.title,
    description: dictionary.calculator.subtitle,
    openGraph: {
      title: `${dictionary.calculator.title} | AutoTax Tech`,
      description: dictionary.calculator.subtitle,
      url: 'https://autotaxtech.lu/calculator',
      type: 'website',
    },
  };
}

export default async function CalculatorPage() {
  // ... página
}
```

### 6.3 Sitemap

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://autotaxtech.lu';

  const routes = [
    '',
    '/calculator',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
```

---

## 7. Exemplos de Páginas

### 7.1 Página Inicial

```typescript
// src/app/page.tsx
import Link from 'next/link';
import { getTranslations } from '@/i18n/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function HomePage() {
  const dictionary = await getTranslations();
  const { home, common } = dictionary;

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {home.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {home.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                {home.hero.cta}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {home.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {home.features.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(['fast', 'accurate', 'free', 'secure'] as const).map((key) => (
                <div
                  key={key}
                  className="text-center p-6 rounded-2xl bg-white shadow-lg shadow-gray-100 border border-gray-100"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FeatureIcon type={key} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {home.features[key].title}
                  </h3>
                  <p className="text-gray-600">
                    {home.features[key].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {home.howItWorks.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {(['step1', 'step2', 'step3'] as const).map((step, index) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {home.howItWorks[step].title}
                  </h3>
                  <p className="text-gray-600">
                    {home.howItWorks[step].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FeatureIcon({ type }: { type: 'fast' | 'accurate' | 'free' | 'secure' }) {
  const icons = {
    fast: (
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accurate: (
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    free: (
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    secure: (
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  };

  return icons[type];
}
```

---

## 8. Troubleshooting

### Problema: Idioma não muda após selecionar

**Causa:** Cookie não está a ser definido ou `router.refresh()` não está a funcionar.

**Solução:**
```typescript
// Verificar se o cookie está a ser definido
console.log(document.cookie);

// Garantir que o provider está no layout raiz
// e que router.refresh() está a ser chamado
```

### Problema: Traduções não aparecem em Server Components

**Causa:** O locale não está a ser passado corretamente.

**Solução:**
```typescript
// Verificar se o middleware está a definir o header
export function middleware(request: NextRequest) {
  console.log('Locale detected:', locale);
  response.headers.set('x-locale', locale);
  // ...
}
```

### Problema: Flash de conteúdo não traduzido

**Causa:** O dicionário client-side carrega depois do server.

**Solução:** Garantir que o dicionário inicial vem do servidor:
```typescript
// No layout.tsx
const dictionary = await getTranslations();
<I18nProvider locale={locale} dictionary={dictionary}>
```

### Problema: Erro "useI18n must be used within I18nProvider"

**Causa:** Componente está fora do provider.

**Solução:** Verificar que o `I18nProvider` está no `layout.tsx` raiz e envolve todos os children.

---

## Checklist de Implementação

- [ ] Criar estrutura de pastas `src/i18n/`
- [ ] Configurar `src/i18n/config.ts`
- [ ] Criar ficheiros de tradução para cada idioma
- [ ] Implementar `src/i18n/dictionaries.ts`
- [ ] Criar `src/middleware.ts`
- [ ] Implementar `src/i18n/server.ts`
- [ ] Implementar `src/i18n/client.tsx`
- [ ] Atualizar `src/app/layout.tsx` com I18nProvider
- [ ] Implementar páginas com traduções
- [ ] Testar mudança de idioma
- [ ] Verificar persistência do cookie
- [ ] Testar deteção automática do browser
- [ ] Adicionar metadados dinâmicos

---

## Próximos Passos Opcionais

1. **Adicionar mais idiomas** - Criar novos ficheiros em `locales/`
2. **Migrar para sub-paths** - Se SEO multilíngue for necessário
3. **Adicionar RTL support** - Se adicionar idiomas como árabe
4. **Cache de traduções** - Implementar cache mais agressivo
5. **Tradução automática** - Integrar com APIs de tradução

---

*Documento criado para o projeto AutoTax Tech (autotaxtech.lu) - Janeiro 2026*
