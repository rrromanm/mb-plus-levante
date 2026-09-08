import { FuelType } from "@/lib/enums/fuelType";
import { Transmission } from "@/lib/enums/transmission";

export interface EditRentalCarDto {
  brandId: number;
  model: string;
  year: number;
  mileageKm: number;
  fuelType: FuelType;
  transmission: Transmission;
  pricePerDay: number;
  pricePerMonth?: number | null;
  active: boolean;
}
