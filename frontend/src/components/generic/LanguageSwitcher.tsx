"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const Flags: Record<Locale, React.ReactNode> = {
  es: (
    <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-xs" aria-hidden="true">
      <rect width="60" height="30" fill="#c60b1e" />
      <rect y="7.5" width="60" height="15" fill="#ffc400" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-xs" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  ),
  ru: (
    <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-xs" aria-hidden="true">
      <rect width="60" height="10" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#0039a6" />
      <rect y="20" width="60" height="10" fill="#d52b1e" />
    </svg>
  ),
};

export default function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSelect = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale as Locale },
      );
    });
  };

  return (
    <Select value={locale} onValueChange={onSelect} disabled={isPending}>
      <SelectTrigger
        aria-label={t("label")}
        className="w-auto gap-1.5 border-none bg-transparent px-2 shadow-none focus:ring-0"
      >
        {Flags[locale]}
      </SelectTrigger>
      <SelectContent position="popper" align="end" sideOffset={6}>
        {routing.locales.map((l) => (
          <SelectItem key={l} value={l} textValue={t(l)}>
            {Flags[l]}
            <span>{t(l)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
