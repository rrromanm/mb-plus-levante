export interface Brand {
    id: number;
    name: string;
    slug: string;
}

const BASE_API_URL = "http://localhost:8080/brands";

const BrandsApi = {
    getAllBrands: async (): Promise<Brand[]> => {
        const response = await fetch(`${BASE_API_URL}/getAll`);

        if (!response.ok) {
            throw new Error("Failed to fetch brands. Please try again.");
        }
        return response.json() as Promise<Brand[]>;
    },
};

export default BrandsApi;
