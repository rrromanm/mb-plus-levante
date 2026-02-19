"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeSwitch } from "./ThemeSwitch";

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

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Catalogo
          </Link>
          <Link href="/" className="transition-colors hover:text-primary">
            Contacto
          </Link>
          <Link href="/" className="transition-colors hover:text-primary">
            Sobre nosotros
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
