import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "ru"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/coches": { es: "/coches", en: "/cars", ru: "/cars" },
    "/coches/[slug]": {
      es: "/coches/[slug]",
      en: "/cars/[slug]",
      ru: "/cars/[slug]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
