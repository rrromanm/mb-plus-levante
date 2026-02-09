export interface Brand {
    id: number;
    name: string;
    slug: string;
}

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/brands";

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
