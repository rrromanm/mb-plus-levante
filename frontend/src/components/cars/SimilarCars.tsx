"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CarDto } from "@/types/car/carDto";
import { Link } from "@/i18n/navigation";
import { CarCard } from "../generic/CarCard";

interface SimilarCarsProps {
  cars: CarDto[];
  slug: string;
}

export function SimilarCars({ cars, slug }: SimilarCarsProps) {
  const t = useTranslations("Similar");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);
  if (cars.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/coches"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border text-sm font-medium hover:bg-muted transition"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
