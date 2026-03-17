"use client";

import Link from "next/link";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { CarCard } from "../generic/CarCard";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { MoveUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export default function FeaturedCars() {
  const { data, loading, error } = useGetFeaturedCars();
  const hasCars = data.length > 0;
  const shouldUseCarousel = data.length > 3;

  const autoplay = useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: false,
    }),
  );

  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Coches disponibles en nuestro concesionario
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Descubre nuestra selección de vehículos disponibles en Benidorm, Alicante.
            </p>
          </div>
          <Link
            href="/coches"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity shrink-0"
          >
            Ver todo el catálogo
            <MoveUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Cargando vehículos...</p>
          </div>
        )}

        {error && (
          <div className="py-12 text-center">
            <p className="text-destructive">Error: {error}</p>
          </div>
        )}

        {!loading && !error && hasCars && (
          <>
            {shouldUseCarousel ? (
              <Carousel
                opts={{ align: "start", loop: true, dragFree: true }}
                plugins={[autoplay.current]}
                className="w-full"
                onMouseEnter={() => autoplay.current.stop()}
                onMouseLeave={() => autoplay.current.play()}
              >
                <CarouselContent>
                  {data.map((car) => (
                    <CarouselItem
                      key={car.slug}
                      className="basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <CarCard car={car} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
                {data.map((car) => (
                  <CarCard key={car.slug} car={car} />
                ))}
              </div>
            )}
          </>
        )}

        {!loading && !error && !hasCars && (
          <p className="py-12 text-center text-muted-foreground">
            No hay coches destacados por ahora.
          </p>
        )}
      </div>
    </section>
  );
}
