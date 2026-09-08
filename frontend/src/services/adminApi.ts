import { apiRequest } from "@/lib/apiClient";
import { EditRentalCarDto } from "@/types/car/editRentalCarDto";
import { AdminCreateBookingDto, BookingDto, BookingStatus } from "@/types/booking";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/admin";

const CAR_TAGS = ["cars", "featured-cars"];

async function revalidate(tags: string[]) {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags }),
    });
  } catch (err) {
    console.error("Failed to revalidate cache", err);
  }
}

const AdminApi = {
  addCar: async (formData: FormData) => {
    await apiRequest(`${BASE_API_URL}/addCar`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });
    await revalidate(CAR_TAGS);
  },
  addRentalCar: async (formData: FormData) => {
    await apiRequest(`${BASE_API_URL}/addRentalCar`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });
  },
  editCar: async (id: number, data: any) => {
    await apiRequest(`${BASE_API_URL}/editCar/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await revalidate(CAR_TAGS);
  },
  editRentalCar: async (id: number, data: EditRentalCarDto) => {
    await apiRequest(`${BASE_API_URL}/editRentalCar/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  markCarAsSold: async (id: number) => {
    await apiRequest(`${BASE_API_URL}/markCarAsSold/${id}`, {
      credentials: "include",
      method: "PATCH",
    });
    await revalidate(CAR_TAGS);
  },
  toggleFeatured: async (id: number) => {
    await apiRequest(`${BASE_API_URL}/toggleFeatured/${id}`, {
      credentials: "include",
      method: "PUT",
    });
    await revalidate(CAR_TAGS);
  },
  getBookings: async (): Promise<BookingDto[]> =>
    apiRequest(`${BASE_API_URL}/rentalBookings`, {
      credentials: "include",
    }),
  createBooking: async (data: AdminCreateBookingDto) => {
    await apiRequest(`${BASE_API_URL}/rentalBookings`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  updateBookingStatus: async (id: number, status: BookingStatus) => {
    await apiRequest(`${BASE_API_URL}/rentalBookings/${id}/status?status=${status}`, {
      credentials: "include",
      method: "PATCH",
    });
  },
  deleteBooking: async (id: number) => {
    await apiRequest(`${BASE_API_URL}/rentalBookings/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
  },
  deleteCar: async (id: number) => {
    await apiRequest(`${BASE_API_URL}/deleteCar/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    await revalidate(CAR_TAGS);
  },
};

export default AdminApi;
