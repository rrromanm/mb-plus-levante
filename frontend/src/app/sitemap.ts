import { MetadataRoute } from "next";
import CarsApi from "@/services/carsApi";
import { routing } from "@/i18n/routing";
import { absoluteUrl, type Href } from "@/i18n/seo";

export const revalidate = 3600;

function safeDate(date?: string | Date) {
  const d = date ? new Date(date) : new Date();
  return isNaN(d.getTime()) ? new Date() : d;
}

function languagesFor(href: Href) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, href);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, href);
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: { href: Href; changeFrequency: "daily"; priority: number }[] = [
    { href: "/", changeFrequency: "daily", priority: 1 },
    { href: "/coches", changeFrequency: "daily", priority: 0.9 },
  ];

  const entriesFor = (
    href: Href,
    rest: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">,
  ): MetadataRoute.Sitemap =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      alternates: { languages: languagesFor(href) },
      ...rest,
    }));

  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap(
    ({ href, changeFrequency, priority }) =>
      entriesFor(href, { lastModified: new Date(), changeFrequency, priority }),
  );

  try {
    const cars = await CarsApi.getSitemapCars();

    const carPages: MetadataRoute.Sitemap = cars.flatMap((car) =>
      entriesFor(
        { pathname: "/coches/[slug]", params: { slug: car.slug } },
        { lastModified: safeDate(car.lastModified), changeFrequency: "weekly", priority: 0.8 },
      ),
    );

    return [...staticPages, ...carPages];
  } catch (error) {
    console.error("Sitemap error:", error);
    return staticPages;
  }
}
