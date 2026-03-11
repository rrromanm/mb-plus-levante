import { FuelType } from "@/lib/enums/fuelType";
import { Transmission } from "@/lib/enums/transmission";

export interface CarDto {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileageKm: number;
    slug: string;
    mainImageUrl: string;
    fuelType: FuelType;
    transmission: Transmission;
    powerHp: number;
    featured: boolean;
}