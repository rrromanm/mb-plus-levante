import type { Metadata } from "next";
import { routing, type Locale } from "./routing";
import { getPathname } from "./navigation";

// Open Graph locale codes per supported language.
export const OG_LOCALES: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
  ru: "ru_RU",
};

type Href = Parameters<typeof getPathname>[0]["href"];

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
