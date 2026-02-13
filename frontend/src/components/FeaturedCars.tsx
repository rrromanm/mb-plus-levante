"use client";

import Image from "next/image";
import Link from "next/link";
import SectionBox from "./SectionBox";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { getCloudinaryUrl } from "@/services/cloudinary";

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
              className="overflow-hidden rounded-2xl bg-[#111] shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={getCloudinaryUrl(car.mainImageUrl, 1200, 800, "good")}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {car.brand} {car.model}
                </h3>

                <p className="mt-1 text-sm text-white/60">
                  {car.year} • {car.mileageKm} km
                </p>

                <p className="mt-2 text-base font-medium text-white">
                  €{car.price}
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
