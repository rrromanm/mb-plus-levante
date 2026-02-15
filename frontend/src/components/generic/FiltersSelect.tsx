import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FilterOption } from "@/types/filter"

type FilterSelectProps = {
  options: FilterOption[]
  placeholder: string
  value?: string
  onChange: (value: string) => void
  showCount?: boolean
  showLogo?: boolean
  showIcon?: boolean
}

export function FilterSelect({
  options,
  placeholder,
  value,
  onChange,
  showCount = false,
  showLogo = false,
  showIcon = false,
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {showLogo && option.logo && (
                  <img
                    src={option.logo}
                    alt={option.label}
                    className="w-5 h-5 object-contain"
                  />
                )}
                {showIcon && option.icon && (
                  <option.icon
                    className={`w-4 h-4 ${option.iconColor || ""}`}
                  />
                )}
                {option.label}
              </div>

              {showCount && (
                <span className="text-muted-foreground text-sm">
                  {option.count ?? 0}
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
