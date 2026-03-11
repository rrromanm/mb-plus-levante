import { ArrowUpDown } from "lucide-react";

export interface SortOption<T extends string> {
  label: string;
  value: T;
}

interface SortSelectProps<T extends string> {
  options: SortOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SortSelect<T extends string>({
  options,
  value,
  onChange,
  className,
}: SortSelectProps<T>) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <ArrowUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
