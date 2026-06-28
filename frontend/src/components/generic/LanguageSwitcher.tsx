"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // `pathname` from next-intl is locale-agnostic, so switching locale keeps
      // the user on the same page.
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors">
      <Globe size={16} strokeWidth={1.75} />
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        value={locale}
        onChange={onSelect}
        disabled={isPending}
        className="cursor-pointer bg-transparent text-sm font-medium uppercase tracking-wide focus:outline-none"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="text-foreground">
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
