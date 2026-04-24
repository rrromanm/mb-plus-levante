import { useState, useEffect } from "react";
import CarsApi from "@/services/carsApi";
import { CarDto } from "@/types/car/carDto";

interface IProps {
  data: CarDto[];
  loading: boolean;
  error: string | null;
}

export const useGetRecentCars = (): IProps => {
  const [data, setData] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await CarsApi.getRecentCars();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCars();
  }, []);

  return { data, loading, error };
};
