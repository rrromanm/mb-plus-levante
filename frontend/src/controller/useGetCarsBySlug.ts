import CarsApi from "@/services/carsApi";
import { CarDetailsDto } from "@/types/car/carDetailsDto";
import { useEffect, useState } from "react";

export function useGetCarBySlug(slug: string) {
  const [data, setData] = useState<CarDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await CarsApi.getCarBySlug(slug);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [slug]);
  return { data, loading, error };
}
