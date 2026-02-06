import { FeaturedCarDto } from "@/types/car/featuredCarDto";
import { CarDto } from "@/types/car/carDto";

const BASE_API_URL = "http://localhost:8080/cars";

const CarsApi = {
  getAllCars: async (): Promise<CarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/getAll`);

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return response.json() as Promise<CarDto[]>;
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