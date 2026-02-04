export const bodyTypes = [
  { value: "SEDAN", label: "Berlina" },
  { value: "COUPE", label: "Coupé" },
  { value: "SUV", label: "SUV" },
  { value: "HATCHBACK", label: "Compacto" },
] as const;

export type BodyType = (typeof bodyTypes)[number]["value"];