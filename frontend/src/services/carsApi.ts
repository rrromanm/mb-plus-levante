export interface FeaturedCarDto {
    brand: string;
    model: string;
    year: number;
    price: number;
    mileageKm: number;
    slug: string;
    mainImageUrl: string;
}

const BASE_API_URL = "http://localhost:8080/cars";

const CarsApi = {
  getFeaturedCars: async (): Promise<FeaturedCarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/getFeaturedCars`);

    if (!response.ok) {
      throw new Error("Failed to fetch featured cars");
    }

    return response.json() as Promise<FeaturedCarDto[]>;
  }
};

export default CarsApi;