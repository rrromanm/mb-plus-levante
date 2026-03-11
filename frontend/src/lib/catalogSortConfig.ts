import { SortOption } from "@/components/generic/SortSelect";

export type SortKey =
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "mileage-asc"
  | "mileage-desc"
  | "name-asc";

export const SORT_OPTIONS: SortOption<SortKey>[] = [
  { label: "Precio: menor a mayor", value: "price-asc" },
  { label: "Precio: mayor a menor", value: "price-desc" },
  { label: "Año: más reciente", value: "year-desc" },
  { label: "Año: más antiguo", value: "year-asc" },
  { label: "Kilómetros: menor a mayor", value: "mileage-asc" },
  { label: "Kilómetros: mayor a menor", value: "mileage-desc" },
  { label: "Nombre: A → Z", value: "name-asc" },
];

export const SORT_MAP: Record<SortKey, { sort: string; order: "asc" | "desc" }> = {
  "price-asc":    { sort: "carSale.price", order: "asc" },
  "price-desc":   { sort: "carSale.price", order: "desc" },
  "year-desc":    { sort: "year",          order: "desc" },
  "year-asc":     { sort: "year",          order: "asc" },
  "mileage-asc":  { sort: "mileageKm",     order: "asc" },
  "mileage-desc": { sort: "mileageKm",     order: "desc" },
  "name-asc":     { sort: "brand",         order: "asc" },
};
