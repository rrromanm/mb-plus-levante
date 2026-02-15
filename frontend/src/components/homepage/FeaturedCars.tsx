"use client";

import Link from "next/link";
import SectionBox from "../generic/SectionBox";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { CarCard } from "../generic/CarCard";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
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
    <SectionBox>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Coches destacados
          </h2>
        </div>

        {loading && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading featured cars...</p>
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

        <div className="text-center pt-4">
          <Link
            href="/coches"
            className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/80"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </SectionBox>
  );
}
