import AdminApi from "@/services/adminApi";
import { useState } from "react";

export interface IProps {
  markCarAsSold: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function useMarkCarAsSold() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markCarAsSold = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await AdminApi.markCarAsSold(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { markCarAsSold, loading, error };
}
