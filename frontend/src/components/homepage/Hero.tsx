import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { CONTACT } from "@/lib/contactInfo";

export default function Hero() {
  return (
    <section className="relative h-255 overflow-hidden -mt-25">
      <Image
        src="/mercedes-hero.jpg"
        alt="Concesionario MB Plus Levante — coches de segunda mano en Alicante"
        fill
        priority
        className="object-cover -scale-x-100"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-16">
        <div className="max-w-3xl text-white">
          <p className="text-xs uppercase tracking-widest opacity-70 mb-4">
            Concesionario en L'Albir · Alicante
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Coches de ocasión
            <br />
            <span className="opacity-80">en Alicante</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg opacity-80 max-w-xl leading-relaxed">
            Especialistas en Mercedes-Benz de segunda mano. ITV pasada,
            garantía hasta 12 meses y entrega inmediata desde L'Albir.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-semibold">
              <Link href="/coches">Ver catálogo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 text-white bg-transparent hover:bg-white/10 hover:text-white"
            >
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                <Phone className="w-4 h-4" />
                Llamar ahora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
