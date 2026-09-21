import type { Metadata } from "next";
import { routing, type Locale } from "./routing";
import { getPathname } from "./navigation";
import { SITE_URL } from "@/lib/site";

// Open Graph locale codes per supported language.
export const OG_LOCALES: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
  ru: "ru_RU",
};

export type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(locale: Locale, href: Href) {
  const path = getPathname({ locale, href });
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function getAlternates(
  locale: Locale,
  href: Href,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ locale: l, href });
  }
  languages["x-default"] = getPathname({ locale: routing.defaultLocale, href });

  return {
    canonical: getPathname({ locale, href }),
    languages,
  };
}
