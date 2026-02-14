import { Fuel, Zap, Leaf } from "lucide-react"

export const FUEL_CONFIG = {
  DIESEL: {
    icon: Fuel,
    color: "text-slate-700"},
  PETROL: {
    icon: Fuel,
    color: "text-slate-700"
  },
  ELECTRIC: {
    icon: Zap,
    color: "text-yellow-500"
  },
  HYBRID: {
    icon: Leaf,
    color: "text-emerald-500"
  }
} as const

export default FUEL_CONFIG
