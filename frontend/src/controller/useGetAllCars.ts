import { CarDto } from "@/types/car/carDto";
import CarsApi from "@/services/carsApi";
import { useEffect, useState, useCallback } from "react";

interface IProps {
  data: CarDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export default function useGetAllCars(): IProps {
  const [data, setData] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CarsApi.getAllCars();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return { data, loading, error, refetch: fetchCars };
}
