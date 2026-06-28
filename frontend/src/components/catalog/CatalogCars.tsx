"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { CarCard } from "@/components/generic/CarCard";
import { SortSelect } from "@/components/generic/SortSelect";
import { SortKey, SORT_OPTIONS } from "@/lib/catalogSortConfig";
import { Car, Sparkle } from "lucide-react";
import { CarDto } from "@/types/car/carDto";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SkeletonCard } from "../generic/SkeletonCard";

interface CatalogCarsProps {
  cars: CarDto[];
  recentCars: CarDto[];
  currentSort: SortKey;
}

export default function CatalogCars({
  cars,
  recentCars,
  currentSort,
}: CatalogCarsProps) {
  const t = useTranslations("Catalog");
  const tSort = useTranslations("Sort");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSortChange = (key: SortKey) => {
    startTransition(() => {
      router.push(`/coches?sort=${key}`);
    });
  };

  const sortOptions = SORT_OPTIONS.map((opt) => ({
    value: opt.value,
    label: tSort(opt.value),
  }));

  const hasRecent = recentCars.length > 0;
  const showRecentArrows = recentCars.length > 4;

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-6 pb-16">
      {hasRecent && (
        <div className="mb-9 rounded-3xl border border-border bg-linear-to-br from-card via-card to-muted/20 p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkle className="h-3.5 w-3.5" />
                {t("news")}
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {t("recentlyAdded")}
              </p>
            </div>
            <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground">
              {t("recentCount", { count: recentCars.length })}
            </span>
          </div>

          <Carousel
            className="w-full"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {recentCars.map((car) => (
                <CarouselItem
                  key={car.slug}
                  className="basis-full md:basis-1/2 lg:basis-1/4"
                >
                  <CarCard car={car} className="h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
            {showRecentArrows && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      )}

      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            {t("fullCatalog")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {isPending
              ? t("loading")
              : t("countAvailable", { count: cars.length })}
          </h2>
        </div>
        <SortSelect
          options={sortOptions}
          value={currentSort}
          onChange={onSortChange}
        />
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card py-20 text-center">
          <Car className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            {t("empty")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
