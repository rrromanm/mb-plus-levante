"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCloudinaryUrl } from "@/services/cloudinary";
import type { CarImageDto } from "@/types/car/carImageDto";

type Props = {
  images: CarImageDto[];
  slug: string;
  autoPlayInterval?: number;
};

export default function CarCarousel({ images, slug, autoPlayInterval = 5000 }: Props) {
  const sorted = [...images].sort((a, b) => a.orderIndex - b.orderIndex);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? sorted.length - 1 : c - 1));
  }, [sorted.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === sorted.length - 1 ? 0 : c + 1));
  }, [sorted.length]);

  useEffect(() => {
    if (paused || sorted.length <= 1) return;
    const id = setInterval(next, autoPlayInterval);
    return () => clearInterval(id);
  }, [paused, next, sorted.length, autoPlayInterval]);

  useEffect(() => {
    thumbRefs.current[current]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [current]);

  if (sorted.length === 0) return null;

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main image */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-md group">
        <Image
          key={current}
          src={getCloudinaryUrl(sorted[current].imageUrl, 1200, 800, "best")}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-opacity duration-700"
          alt={`${slug} imagen ${current + 1}`}
          unoptimized
        />

        {sorted.length > 1 && (
          <>
            {/* Prev arrow */}
            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition hover:bg-background"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {sorted.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Ir a imagen ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {sorted.map(({ imageUrl }, index) => (
            <div
              key={index}
              ref={(el) => { thumbRefs.current[index] = el; }}
              onClick={() => setCurrent(index)}
              className={`relative w-28 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                index === current ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={getCloudinaryUrl(imageUrl, 300, 200, "eco")}
                fill
                sizes="112px"
                className="object-cover"
                alt={`${slug} miniatura ${index + 1}`}
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
