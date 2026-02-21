import { BodyType } from "@/lib/enums/bodyType";
import { FuelType } from "@/lib/enums/fuelType";
import { Transmission } from "@/lib/enums/transmission";

export interface AddCarDto {
    brandId: number;
    bodyType: BodyType;
    model: string;
    year: number;
    mileageKm: number;
    fuelType: FuelType;
    transmission: Transmission;
    engine: string;
    powerHp: number;
    price: number;
    description?: string;
    imageUrls?: string[];
}