import { AddCarDto } from "@/types/car/addCarDto";
import { apiRequest } from "@/lib/apiClient";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/admin";

const AdminApi = {
    addCar: async (data: AddCarDto) => {
        await apiRequest(`${BASE_API_URL}/addCar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    },
    deleteCar: async (id: number) => {
        await apiRequest(`${BASE_API_URL}/deleteCar/${id}`, {
            method: "DELETE",
        });
    }
};

export default AdminApi;