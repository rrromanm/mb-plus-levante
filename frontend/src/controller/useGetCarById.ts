import CarsApi from "@/services/carsApi";
import { CarDetailsDto } from "@/types/car/carDetailsDto";
import { useEffect, useState } from "react";

export function useGetCarById(id: number | null) {
  const [data, setData] = useState<CarDetailsDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await CarsApi.getCarById(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);
  return { data, loading, error };
}
