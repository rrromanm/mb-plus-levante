import { MetadataRoute } from "next";
import CarsApi from "@/services/carsApi";

function safeDate(date?: string | Date) {
  const d = date ? new Date(date) : new Date();
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mbplusbenidorm.es";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/coches`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const cars = await CarsApi.getAllCars();

    const carPages: MetadataRoute.Sitemap = cars.map((car: any) => ({
      url: `${baseUrl}/coches/${car.slug}`,
      lastModified: safeDate(car.updatedAt || car.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticPages, ...carPages];
  } catch (error) {
    console.error("Sitemap error:", error);
    return staticPages;
  }
}