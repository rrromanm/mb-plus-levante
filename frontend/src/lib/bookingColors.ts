// ponytail: fixed palette keyed by booking id — deterministic, no state to store
const PALETTE = [
  "#2563eb", // blue
  "#059669", // emerald
  "#d97706", // amber
  "#7c3aed", // violet
  "#db2777", // pink
  "#0891b2", // cyan
  "#dc2626", // red
  "#65a30d", // lime
  "#9333ea", // purple
  "#ea580c", // orange
];

export const bookingColor = (id: number) => PALETTE[id % PALETTE.length];
