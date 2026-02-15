import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="
      bg-white
      border border-gray-200
      rounded-lg
      p-4
      flex
      flex-col
      gap-2
    ">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>

      <div className="text-2xl font-semibold text-gray-900">
        {value}
      </div>

      {subtitle && (
        <div className="text-xs text-gray-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}
