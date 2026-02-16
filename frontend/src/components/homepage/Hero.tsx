import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative h-255 overflow-hidden -mt-25">
      <Image
        src="/mercedes-hero.jpg"
        alt="Premium Mercedes vehicle"
        fill
        priority
        className="object-cover -scale-x-100"
      />

      <div className="absolute inset-0 dark:bg-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-center px-16">
        <div className="max-w-6xl text-white">
          <h1 className="text-7xl font-bold leading-tight md:text-8x">
            EL COCHE QUE NECESITAS.
            <br />
            AL PRECIO QUE BUSCAS.
          </h1>

          <p className="text-xl">
            Concesionario de coches de segunda mano en Albir, Alicante. 
          </p>

          <Button size="lg" className="mt-12 transition">
            Ver catálogo
          </Button>
        </div>
      </div>
    </section>
  );
}
