import { AddCarDto } from "@/types/car/addCarDto";

const BASE_API_URL = "http://localhost:8080/admin";

const AdminApi = {
    addCar: async (data: AddCarDto) => {
        const response = await fetch(`${BASE_API_URL}/addCar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to add car. Please try again.");
        }
    },
    deleteCar: async (id: number) => {
        const response = await fetch(`${BASE_API_URL}/deleteCar/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to delete car. Please try again.");
        }
    }
};

export default AdminApi;