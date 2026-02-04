import { AddCarDto } from "@/types/car/addCarDto";
import AdminApi from "@/services/adminApi";
import { useState } from "react";

export function useAddCar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCar = async (data: AddCarDto) => {
    try {
      setLoading(true);
      setError(null);
      await AdminApi.addCar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addCar, loading, error };
}
