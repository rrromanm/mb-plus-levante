import { BookingDto } from "@/types/booking";
import AdminApi from "@/services/adminApi";
import { useCallback, useEffect, useState } from "react";

export default function useBookings() {
  const [data, setData] = useState<BookingDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await AdminApi.getBookings());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { data, loading, error, refetch: fetchBookings };
}
