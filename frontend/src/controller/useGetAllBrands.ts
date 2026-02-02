import BrandsApi, { Brand } from "@/services/brandsApi";
import { useEffect, useState } from "react";

interface Props {
    data: Brand[];
    loading: boolean;
    error: string | null;
}

export const useGetAllBrands = (): Props => {
    const [data, setData] = useState<Brand[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await BrandsApi.getAllBrands();
                setData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    return { data, loading, error };
}