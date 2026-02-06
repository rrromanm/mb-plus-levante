import { useState } from "react";
import AdminApi from "@/services/adminApi";

export interface IProps {
    deleteCar: (id: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export default function useDeleteCar() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteCar = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            await AdminApi.deleteCar(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteCar, loading, error };
}