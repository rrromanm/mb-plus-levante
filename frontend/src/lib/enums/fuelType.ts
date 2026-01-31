export const fuelTypes = [
  { value: "PETROL", label: "Gasolina" },
  { value: "DIESEL", label: "Diésel" },
  { value: "HYBRID", label: "Híbrido" },
  { value: "ELECTRIC", label: "Eléctrico" },
] as const;

export type FuelType = (typeof fuelTypes)[number]["value"];
