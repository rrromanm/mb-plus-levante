"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeSwitch } from "./ThemeSwitch";
import LanguageSwitcher from "./LanguageSwitcher";
import { CONTACT } from "@/lib/contactInfo";

export default function Header() {
  const t = useTranslations("Header");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/mb-plus-white.svg"
      : "/mb-plus-black.svg";
  const logoAlt =
    mounted && resolvedTheme === "dark"
      ? "MB Plus Logo (white)"
      : "MB Plus Logo (black)";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 text-foreground shadow-sm backdrop-blur supports-backdrop-filter:bg-card/70">
      <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={160}
              height={60}
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-lg font-medium text-foreground">
          <Link href="/" className="relative transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#e23b3b] after:transition-[width] after:duration-300 hover:after:w-full" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {t("home")}
          </Link>
          <Link href="/coches" className="relative transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#e23b3b] after:transition-[width] after:duration-300 hover:after:w-full">
            {t("catalog")}
          </Link>
          <Link href="/#sobre-nosotros" className="relative transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#e23b3b] after:transition-[width] after:duration-300 hover:after:w-full">
            {t("about")}
          </Link>
          <Link href="/#contacto" className="relative transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#e23b3b] after:transition-[width] after:duration-300 hover:after:w-full">
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
          >
            <span className="flex items-center justify-center size-8 rounded-full border border-border group-hover:border-foreground/40 transition-colors">
              <Phone size={14} strokeWidth={1.75} />
            </span>
            <span className="hidden sm:inline tracking-wide">{CONTACT.phone}</span>
          </a>
          <div className="w-px h-5 bg-border" />
          <LanguageSwitcher />
          <div className="w-px h-5 bg-border" />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
