import { CarDto } from "./carDto";

export interface RentalCarDto extends Omit<CarDto, "price"> {
  pricePerDay: number;
  pricePerMonth: number | null;
  active: boolean;
}
