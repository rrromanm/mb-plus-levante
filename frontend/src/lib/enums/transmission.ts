export const transmissions = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automática" },
] as const;

export type Transmission = (typeof transmissions)[number]["value"];
