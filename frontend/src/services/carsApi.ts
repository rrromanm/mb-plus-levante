import { FeaturedCarDto } from "@/types/car/featuredCarDto";
import { CarDto } from "@/types/car/carDto";
import { CarDetailsDto } from "@/types/car/carDetailsDto";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/cars";

const CarsApi = {
  getAllCars: async (): Promise<CarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/getAll`);

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return response.json() as Promise<CarDto[]>;
  },
  getCarBySlug: async (slug: string): Promise<CarDetailsDto> => {
    const response = await fetch(`${BASE_API_URL}/getCarBySlug/${slug}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch car with slug: ${slug}`);
    }

    return response.json() as Promise<CarDetailsDto>;
  },  
  getFeaturedCars: async (): Promise<FeaturedCarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/getFeaturedCars`);

    if (!response.ok) {
      throw new Error("Failed to fetch featured cars");
    }

    return response.json() as Promise<FeaturedCarDto[]>;
  },
};

export default CarsApi;