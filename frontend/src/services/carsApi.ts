import { FeaturedCarDto } from "@/types/car/featuredCarDto";
import { CarDto } from "@/types/car/carDto";
import { CarDetailsDto } from "@/types/car/carDetailsDto";
import { RentalCarDto } from "@/types/car/rentalCarDto";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/cars";

const CarsApi = {
  getAllCars: async (
    sort: string = "createdAt",
    order: "asc" | "desc" = "desc",
  ): Promise<CarDto[]> => {
    const response = await fetch(
      `${BASE_API_URL}/getAll?sort=${sort}&order=${order}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return response.json();
  },
  getAllRentals: async (
    sort: string = "createdAt",
    order: "asc" | "desc" = "desc",
  ): Promise<RentalCarDto[]> => {
    const response = await fetch(
      `${BASE_API_URL}/rentals?sort=${sort}&order=${order}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rental cars");
    }

    return response.json();
  },
  getCarById: async (id: number): Promise<CarDetailsDto> => {
    const response = await fetch(`${BASE_API_URL}/getCarById/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch car with id: ${id}`);
    }
    return response.json() as Promise<CarDetailsDto>;
  },
  getCarBySlug: async (slug: string): Promise<CarDetailsDto> => {
    const response = await fetch(`${BASE_API_URL}/getCarBySlug/${slug}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch car with slug: ${slug}`);
    }

    return response.json() as Promise<CarDetailsDto>;
  },
  getFeaturedCars: async (): Promise<CarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/getFeaturedCars`);

    if (!response.ok) {
      throw new Error("Failed to fetch featured cars");
    }

    return response.json() as Promise<CarDto[]>;
  },
  getRecommendedCars: async (slug: string): Promise<CarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/slug/${slug}/recommended`);

    if (!response.ok) {
      throw new Error("Failed to fetch recommended cars");
    }

    return response.json() as Promise<CarDto[]>;
  },
  getSitemapCars: async (): Promise<{ slug: string; lastModified: string }[]> => {
    // Admin-editable: a car sold or deleted in the admin panel must drop out of
    // the sitemap without a redeploy. Without this the build bakes the response
    // in permanently.
    const response = await fetch(`${BASE_API_URL}/sitemap`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sitemap cars");
    }

    return response.json();
  },
};

export default CarsApi;
