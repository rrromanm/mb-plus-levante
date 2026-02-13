import AdminApi from "@/services/adminApi";
import { useState } from "react";

export interface IProps {
    toggleFeatured: (id: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const useToggleFeatured = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleFeatured = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            await AdminApi.toggleFeatured(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { toggleFeatured, loading, error };
}