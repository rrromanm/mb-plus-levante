import type { Metadata } from "next";
import { routing, type Locale } from "./routing";

// Open Graph locale codes per supported language.
export const OG_LOCALES: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
  ru: "ru_RU",
};

/**
 * Builds the localized pathname for a given locale, honoring the `as-needed`
 * prefix strategy (Spanish has no prefix, others are prefixed).
 */
function localizedPath(locale: Locale, pathname: string): string {
  const normalized = pathname === "/" ? "" : pathname;
  if (locale === routing.defaultLocale) {
    return normalized || "/";
  }
  return `/${locale}${normalized}`;
}

/**
 * Returns the `alternates` block (canonical + hreflang languages, incl.
 * x-default) for a page, given the current locale and the locale-agnostic
 * pathname (e.g. "/", "/coches", "/coches/some-slug").
 */
export function getAlternates(
  locale: Locale,
  pathname: string,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedPath(l, pathname);
  }
  languages["x-default"] = localizedPath(routing.defaultLocale, pathname);

  return {
    canonical: localizedPath(locale, pathname),
    languages,
  };
}
