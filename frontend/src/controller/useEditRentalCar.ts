import AdminApi from "@/services/adminApi";
import { EditRentalCarDto } from "@/types/car/editRentalCarDto";
import { useState } from "react";

export default function useEditRentalCar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editRentalCar = async (id: number, data: EditRentalCarDto) => {
    try {
      setLoading(true);
      setError(null);
      await AdminApi.editRentalCar(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editRentalCar, loading, error };
}
