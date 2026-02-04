export const transmissions = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automático" },
] as const;

export type Transmission = (typeof transmissions)[number]["value"];
