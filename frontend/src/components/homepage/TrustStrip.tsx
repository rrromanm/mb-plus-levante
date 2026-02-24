import { ShieldCheck, Wrench, Clock, BadgeCheck } from "lucide-react";

const SIGNALS = [
  {
    icon: ShieldCheck,
    text: "Garantía hasta 12 meses",
  },
  {
    icon: BadgeCheck,
    text: "ITV pasada antes de la entrega",
  },
  {
    icon: Wrench,
    text: "Taller propio en L'Albir",
  },
  {
    icon: Clock,
    text: "+10 años de experiencia",
  },
];

export default function TrustStrip() {
  return (
    <div className="bg-zinc-900 dark:bg-zinc-800 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {SIGNALS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-sm font-medium opacity-90">
              <Icon className="w-4 h-4 shrink-0 opacity-70" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
