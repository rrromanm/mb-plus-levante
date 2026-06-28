import { MetadataRoute } from "next";
import CarsApi from "@/services/carsApi";
import { routing } from "@/i18n/routing";

export const revalidate = 3600;

const baseUrl = "https://mbplusbenidorm.es";

function safeDate(date?: string | Date) {
  const d = date ? new Date(date) : new Date();
  return isNaN(d.getTime()) ? new Date() : d;
}

// Builds the per-locale URL for a path honoring the `as-needed` prefix strategy
// (Spanish has no prefix, others are prefixed).
function localizedUrl(locale: string, path: string) {
  const suffix = path === "/" ? "" : path;
  return locale === routing.defaultLocale
    ? `${baseUrl}${suffix || "/"}`
    : `${baseUrl}/${locale}${suffix}`;
}

// Returns the `alternates.languages` map (hreflang) for a given path.
function languagesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, path);
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: { path: string; changeFrequency: "daily"; priority: number }[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/coches", changeFrequency: "daily", priority: 0.9 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map(
    ({ path, changeFrequency, priority }) => ({
      url: localizedUrl(routing.defaultLocale, path),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: languagesFor(path) },
    }),
  );

  try {
    const cars = await CarsApi.getSitemapCars();

    const carPages: MetadataRoute.Sitemap = cars.map((car) => {
      const path = `/coches/${car.slug}`;
      return {
        url: localizedUrl(routing.defaultLocale, path),
        lastModified: safeDate(car.lastModified),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: languagesFor(path) },
      };
    });

    return [...staticPages, ...carPages];
  } catch (error) {
    console.error("Sitemap error:", error);
    return staticPages;
  }
}
