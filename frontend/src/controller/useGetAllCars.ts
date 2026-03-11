import { CarDto } from "@/types/car/carDto";
import CarsApi from "@/services/carsApi";
import { useEffect, useState, useCallback } from "react";

interface IProps {
  data: CarDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseGetAllCarsParams {
  sort?: string;
  order?: "asc" | "desc";
}

export default function useGetAllCars({ sort = "createdAt", order = "desc" }: UseGetAllCarsParams = {}): IProps {
  const [data, setData] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CarsApi.getAllCars(sort, order);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [sort, order]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return { data, loading, error, refetch: fetchCars };
}
