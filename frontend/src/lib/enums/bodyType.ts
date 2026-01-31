export const bodyTypes = [
  { value: "SEDAN", label: "Berlina" },
  { value: "HATCHBACK", label: "Compacto" },
  { value: "SUV", label: "SUV" },
  { value: "COUPE", label: "Coupé" },
  { value: "CONVERTIBLE", label: "Cabrio" },
] as const;

export type BodyType = (typeof bodyTypes)[number]["value"];
