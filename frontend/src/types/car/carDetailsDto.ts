import { CarImageDto } from "./carImageDto";

export interface CarDetailsDto {
    brand: string;
    model: string;
    year: number;
    price: number;
    mileageKm: number;
    slug: string;
    images: CarImageDto[];
    description?: string;
}