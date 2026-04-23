import AdminApi from "@/services/adminApi";
import { useState } from "react";

export default function useEditCar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editCar = async (id: number, data: any) => {
    try {
      setLoading(true);
      setError(null);
      await AdminApi.editCar(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editCar, loading, error };
}
