import { apiRequest } from "@/lib/apiClient";

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
  deleteCar: async (id: number) => {
    await apiRequest(`${BASE_API_URL}/deleteCar/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    await revalidate(CAR_TAGS);
  },
};

export default AdminApi;
