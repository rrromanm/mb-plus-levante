import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Spanish is the primary language and is served without a URL prefix.
  // English and Russian are served under /en and /ru respectively.
  locales: ["es", "en", "ru"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // Always serve Spanish at "/" — do not auto-redirect based on the browser's
  // Accept-Language header. Language is changed explicitly via the switcher.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
