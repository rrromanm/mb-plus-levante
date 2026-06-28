"use client";

import { Link } from "@/i18n/navigation";
import { CarCard } from "../generic/CarCard";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { CarDto } from "@/types/car/carDto";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

interface FeaturedCarsProps {
  cars: CarDto[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  const t = useTranslations("Featured");
  const hasCars = cars.length > 0;
  const shouldUseCarousel = cars.length > 3;

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
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/coches"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity shrink-0"
          >
            {t("viewAll")}
            <MoveUpRight className="w-4 h-4" />
          </Link>
        </div>

        {hasCars ? (
          shouldUseCarousel ? (
            <Carousel
              opts={{ align: "start", loop: true, dragFree: true }}
              plugins={[autoplay.current]}
              className="w-full"
              onMouseEnter={() => autoplay.current.stop()}
              onMouseLeave={() => autoplay.current.play()}
            >
              <CarouselContent>
                {cars.map((car) => (
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
              {cars.map((car) => (
                <CarCard key={car.slug} car={car} />
              ))}
            </div>
          )
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            {t("empty")}
          </p>
        )}
      </div>
    </section>
  );
}
