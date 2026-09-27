import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const esES = new Intl.NumberFormat("es-ES");

export function formatPrice(value: number): string {
  return `${esES.format(value)} €`;
}

export function formatMileage(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
  }).format(value);
}
