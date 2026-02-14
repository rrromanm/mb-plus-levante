import { LucideIcon } from "lucide-react"

export type FilterOption = {
  value: string
  label: string
  logo?: string
  icon?: LucideIcon
  iconColor?: string
  count?: number
  disabled?: boolean
}
