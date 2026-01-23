import LanguageSelector from "./LanguageSelector";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-25 bg-[#1D1D1D] text-white shadow-md">
      <div className="mx-auto flex h-full items-center justify-between px-16">
        <div className="flex items-center gap-2">
          <Image src="/mb-plus-logo.svg" alt="MB Plus Logo" width={160} height={60} />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-md font-medium text-foreground">
          <a href="/" className="hover:text-white transition-colors">
            Catalogo
          </a>
          <a href="/" className="hover:text-white transition-colors">
            Contacto
          </a>
          <a href="/" className="hover:text-white transition-colors">
            Sobre nosotros
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
