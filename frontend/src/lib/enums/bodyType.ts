export const bodyTypes = [
  { value: "SEDAN", label: "Berlina (Sedan)" },
  { value: "COUPE", label: "Coupé" },
  { value: "CONVERTIBLE", label: "Cabrio" },
  { value: "SUV", label: "SUV" },
  { value: "HATCHBACK", label: "Compacto (Hatchback)" },
  { value: "WAGON", label: "Familiar (Wagon)" },
  { value: "PICKUP", label: "Pickup" },
  { value: "VAN", label: "Monovolumen/Furgoneta" },
  { value: "OTHER", label: "Otro" },
] as const;

export type BodyType = (typeof bodyTypes)[number]["value"];