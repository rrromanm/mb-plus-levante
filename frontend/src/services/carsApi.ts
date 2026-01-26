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

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const CarsApi = {
  getFeaturedCars: async (): Promise<FeaturedCarDto[]> => {
    const response = await fetch(`${BASE_API_URL}/getFeaturedCars`);

    if (!response.ok) {
      throw new Error("Failed to fetch featured cars");
    }

    return response.json() as Promise<FeaturedCarDto[]>;
  },

  // Example of a protected endpoint that requires authentication
  getCarDetails: async (slug: string): Promise<FeaturedCarDto> => {
    const response = await fetch(`${BASE_API_URL}/${slug}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized. Please login.");
      }
      throw new Error("Failed to fetch car details");
    }

    return response.json() as Promise<FeaturedCarDto>;
  }
};

export default CarsApi;