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
  const normalizedValue = value && value.length > 0 ? value : undefined

  return (
    <Select value={normalizedValue} onValueChange={onChange}>
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            textValue={option.label}
            disabled={option.disabled}
          >
            <div className="flex w-full items-center gap-2">
              {showLogo && option.logo && (
                <img
                  src={option.logo}
                  alt={option.label}
                  className="h-5 w-5 object-contain"
                />
              )}
              {showIcon && option.icon && (
                <option.icon className={`h-4 w-4 ${option.iconColor || ""}`} />
              )}
              <span>{option.label}</span>

              {showCount && (
                <span className="text-muted-foreground ml-auto text-sm">
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
