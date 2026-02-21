import { FuelType } from "@/lib/enums/fuelType";
import { CarImageDto } from "./carImageDto";
import { Transmission } from "@/lib/enums/transmission";
import { BodyType } from "@/lib/enums/bodyType";

export interface CarDetailsDto {
    brand: string;
    model: string;
    year: number;
    price: number;
    mileageKm: number;
    slug: string;
    images: CarImageDto[];
    description?: string;
    fuelType: FuelType;
    transmission: Transmission;
    engine?: string;
    powerHp: number;
    bodyType: BodyType;
}