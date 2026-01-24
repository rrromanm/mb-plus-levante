import { useState, useEffect } from "react";
import CarsApi, { FeaturedCarDto } from "@/services/carsApi";

interface UseGetFeaturedCarsReturn {
  data: FeaturedCarDto[];
  loading: boolean;
  error: string | null;
}

export const useGetFeaturedCars = (): UseGetFeaturedCarsReturn => {
  const [data, setData] = useState<FeaturedCarDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await CarsApi.getFeaturedCars();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return { data, loading, error };
};
