import { ShieldCheck, Wrench, Clock, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const SIGNALS = [
  { icon: ShieldCheck, key: "warranty" },
  { icon: BadgeCheck, key: "itv" },
  { icon: Wrench, key: "workshop" },
  { icon: Clock, key: "experience" },
] as const;

export default function TrustStrip() {
  const t = useTranslations("TrustStrip");
  return (
    <div className="bg-zinc-900 dark:bg-zinc-800 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {SIGNALS.map(({ icon: Icon, key }) => (
            <li key={key} className="flex items-center gap-2 text-sm font-medium opacity-90">
              <Icon className="w-4 h-4 shrink-0 opacity-70" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
