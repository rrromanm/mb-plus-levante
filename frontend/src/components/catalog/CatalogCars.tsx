"use client";

import { useEffect, useState } from "react";
import useGetAllCars from "@/controller/useGetAllCars";
import { CarCard } from "@/components/generic/CarCard";
import { SortSelect } from "@/components/generic/SortSelect";
import { SortKey, SORT_OPTIONS, SORT_MAP } from "@/lib/catalogSortConfig";
import { Car, Sparkle } from "lucide-react";
import { useGetRecentCars } from "@/controller/useGetRecentCars";
import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md animate-pulse">
      <div className="aspect-video w-full bg-muted" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-5 w-2/3 rounded bg-muted" />
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>
        <div className="mt-auto border-t border-border pt-3">
          <div className="h-7 w-24 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function CatalogCars() {
  const [sortKey, setSortKey] = useState<SortKey>("year-desc");
  const [recentCarouselApi, setRecentCarouselApi] = useState<CarouselApi>();
  const [showRecentArrows, setShowRecentArrows] = useState(false);
  const { sort, order } = SORT_MAP[sortKey];
  const {
    data: recentCarsData,
    loading: recentCarsLoading,
    error: recentCarsError,
  } = useGetRecentCars();
  const { data, loading, error } = useGetAllCars({ sort, order });
  const shouldShowRecentSection =
    recentCarsLoading || !!recentCarsError || recentCarsData.length > 0;

  useEffect(() => {
    if (!recentCarouselApi) return;

    const updateArrowVisibility = () => {
      setShowRecentArrows(
        recentCarouselApi.canScrollPrev() || recentCarouselApi.canScrollNext(),
      );
    };

    updateArrowVisibility();
    recentCarouselApi.on("reInit", updateArrowVisibility);
    recentCarouselApi.on("select", updateArrowVisibility);

    return () => {
      recentCarouselApi.off("reInit", updateArrowVisibility);
      recentCarouselApi.off("select", updateArrowVisibility);
    };
  }, [recentCarouselApi, recentCarsData.length]);

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-6 pb-16">
      {shouldShowRecentSection && (
        <div className="mb-9 rounded-3xl border border-border bg-linear-to-br from-card via-card to-muted/20 p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkle className="h-3.5 w-3.5" />
              Novedades
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Recién añadidos al catálogo
            </p>
          </div>
          {!recentCarsLoading && !recentCarsError && recentCarsData.length > 0 && (
            <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground">
              {recentCarsData.length} disponibles
            </span>
          )}
        </div>

        {recentCarsLoading && (
          <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-5 overflow-x-auto pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`recent-skeleton-${i}`} className="min-w-70">
                <SkeletonCard />
              </div>
            ))}
          </div>
        )}

        {!recentCarsLoading && recentCarsError && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
            No se han podido cargar las novedades ahora mismo.
          </div>
        )}

        {!recentCarsLoading && !recentCarsError && recentCarsData.length > 0 && (
          <div className="relative">
            <Carousel
              opts={{ align: "start", containScroll: "trimSnaps" }}
              setApi={setRecentCarouselApi}
              className="w-full"
            >
              <CarouselContent>
              {recentCarsData.map((car) => (
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
                  <CarouselPrevious className="left-2 top-[40%] border-border bg-background/90 backdrop-blur-sm" />
                  <CarouselNext className="right-2 top-[40%] border-border bg-background/90 backdrop-blur-sm" />
                </>
              )}
            </Carousel>
          </div>
        )}
        </div>
      )}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Catálogo completo
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {loading
              ? "Cargando vehículos…"
              : `${data.length} vehículo${data.length !== 1 ? "s" : ""} disponible${data.length !== 1 ? "s" : ""}`}
          </h2>
        </div>
        <SortSelect
          options={SORT_OPTIONS}
          value={sortKey}
          onChange={setSortKey}
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="text-destructive font-medium">
            No se han podido cargar los vehículos. Inténtalo de nuevo.
          </p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card py-20 text-center">
          <Car className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            No hay vehículos disponibles en este momento.
          </p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
