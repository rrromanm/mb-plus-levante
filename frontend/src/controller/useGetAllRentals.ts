import { RentalCarDto } from "@/types/car/rentalCarDto";
import CarsApi from "@/services/carsApi";
import { useEffect, useState, useCallback } from "react";

interface IProps {
  data: RentalCarDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseGetAllRentalsParams {
  sort?: string;
  order?: "asc" | "desc";
}

export default function useGetAllRentals({ sort = "createdAt", order = "desc" }: UseGetAllRentalsParams = {}): IProps {
  const [data, setData] = useState<RentalCarDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRentals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CarsApi.getAllRentals(sort, order);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [sort, order]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  return { data, loading, error, refetch: fetchRentals };
}
