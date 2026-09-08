export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface BookingDto {
  id: number;
  carId: number;
  car: string;
  carImage: string | null;
  startDate: string; // yyyy-MM-dd
  endDate: string;
  status: BookingStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  notes: string | null;
  createdAt: string;
}

export interface AdminCreateBookingDto {
  carId: number;
  startDate: string;
  endDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  notes?: string | null;
  status?: BookingStatus;
}
