import { AddCarDto } from "@/types/car/addCarDto";
import AdminApi from "@/services/adminApi";
import { useState } from "react";

export function useAddCar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCar = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      await AdminApi.addCar(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addCar, loading, error };
}
