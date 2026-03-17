import Link from "next/link";
import { CONTACT } from "@/lib/contactInfo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="space-y-2">
            <p className="text-sm font-semibold">MB Plus Benidrom</p>
            <p className="text-sm text-muted-foreground">
              Coches de ocasión en L&apos;Albir, Alicante
            </p>
            <p className="text-sm text-muted-foreground">{CONTACT.address}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-x-8">
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Inicio
            </Link>
            <Link href="/coches" className="text-muted-foreground transition-colors hover:text-foreground">
              Catálogo
            </Link>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground">
          © {year} MB Plus Levante. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
