import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();

    // Filter out invalid languages and ensure we have valid locale strings
    const validLanguages = languages.filter(
      (lang) =>
        typeof lang === "string" &&
        lang.length > 0 &&
        /^[a-z]{2}(-[A-Z]{2})?$/.test(lang)
    );

    // If no valid languages found, return default locale
    if (validLanguages.length === 0) {
      console.warn(
        "No valid languages found in request headers, using default locale"
      );
      return i18n.defaultLocale;
    }

    const locale = matchLocale(validLanguages, locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    console.error("Error in getLocale:", error);
    // Return default locale if there's any error
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
