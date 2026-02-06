"use client";

import Image from "next/image";
import Link from "next/link";
import SectionBox from "./SectionBox";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";

export default function FeaturedCars() {
  const { data, loading, error } = useGetFeaturedCars();

  return (
    <SectionBox>
      {loading && (
        <div className="text-center py-12">
          <p className="text-white/60">Loading featured cars...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-400">Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.map((car) => (
            <div
              key={car.slug}
              className="overflow-hidden rounded-xl bg-black/40"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={car.mainImageUrl}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority={false}
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">
                  {car.brand} {car.model}
                </h3>
                <p className="text-xs text-white/60">
                  {car.year} • {car.mileageKm} km • €
                  {car.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center pt-8">
        <a
          className="inline-block rounded-md bg-[#C0C0C0] px-4 py-2 text-sm font-semibold text-black
          transition hover:bg-white"
        >
          <Link href="/coches" className="w-full">
            View All Cars <span aria-hidden>↗</span>
          </Link>
        </a>
      </div>
    </SectionBox>
  );
}
