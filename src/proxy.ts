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
 * Extract preferred locale from Accept-Language header
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

  // Find first match with supported locales
  for (const { code } of languages) {
    if (isValidLocale(code)) {
      return code;
    }
  }

  return defaultLocale;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check existing cookie
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;

  let locale: Locale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    // Use cookie locale
    locale = cookieLocale;
  } else {
    // Detect from browser
    const acceptLanguage = request.headers.get('accept-language');
    locale = getPreferredLocale(acceptLanguage);
  }

  // Create response
  const response = NextResponse.next();

  // Add locale to header for server components
  response.headers.set('x-locale', locale);

  // Set/update cookie if necessary
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
