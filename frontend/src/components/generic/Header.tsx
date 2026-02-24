"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import { CONTACT } from "@/lib/contactInfo";

export default function Header() {
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
          <Link href="/" className="flex items-center">
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
          <Link href="/" className="transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link href="/coches" className="transition-colors hover:text-primary">
            Catalogo
          </Link>
          <Link href="/#sobre-nosotros" className="transition-colors hover:text-primary">
            Sobre nosotros
          </Link>
          <Link href="/#contacto" className="transition-colors hover:text-primary">
            Contacto
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
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
