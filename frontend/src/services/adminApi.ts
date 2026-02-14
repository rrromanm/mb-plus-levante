import { apiRequest } from "@/lib/apiClient";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/admin";

const AdminApi = {
    addCar: async (formData: FormData) => {
        await apiRequest(`${BASE_API_URL}/addCar`, {
            credentials: "include",
            method: "POST",
            body: formData,
        });
    },
    markCarAsSold: async (id: number) => {
        await apiRequest(`${BASE_API_URL}/markCarAsSold/${id}`, {
            credentials: "include",
            method: "PATCH",
        });
    },
    toggleFeatured: async (id: number) => {
        await apiRequest(`${BASE_API_URL}/toggleFeatured/${id}`, {
            credentials: "include",
            method: "PUT",
        });
    },
    deleteCar: async (id: number) => {
        await apiRequest(`${BASE_API_URL}/deleteCar/${id}`, {
            credentials: "include",
            method: "DELETE",
        });
    }
};

export default AdminApi;