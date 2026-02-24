"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lbLoaded, setLbLoaded] = useState(false);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? sorted.length - 1 : c - 1));
  }, [sorted.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === sorted.length - 1 ? 0 : c + 1));
  }, [sorted.length]);

  const lbPrev = useCallback(() => {
    setLightboxIndex((c) => (c === 0 ? sorted.length - 1 : c - 1));
  }, [sorted.length]);

  const lbNext = useCallback(() => {
    setLightboxIndex((c) => (c === sorted.length - 1 ? 0 : c + 1));
  }, [sorted.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLbLoaded(false);
    setLightboxOpen(true);
  };

  // Preload all images into browser cache on mount
  useEffect(() => {
    sorted.forEach(({ imageUrl }) => {
      const img = new window.Image();
      img.src = getCloudinaryUrl(imageUrl, 1200, 900, "best");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, lbPrev, lbNext]);

  if (sorted.length === 0) return null;

  return (
    <>
      <div
        className="hidden sm:block space-y-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
          onClick={() => openLightbox(current)}
        >
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
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition hover:bg-background"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition hover:bg-background"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {sorted.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setCurrent(index); }}
                    aria-label={`Ir a imagen ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === current ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {sorted.length > 1 && (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
            {sorted.map(({ imageUrl }, index) => (
              <div
                key={index}
                ref={(el) => { thumbRefs.current[index] = el; }}
                onClick={() => setCurrent(index)}
                className={`relative w-20 h-14 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
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

      <div
        className="sm:hidden relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-md cursor-pointer"
        onClick={() => openLightbox(0)}
      >
        <Image
          src={getCloudinaryUrl(sorted[0].imageUrl, 800, 600, "good")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          alt={`${slug} imagen principal`}
          unoptimized
        />
        {sorted.length > 1 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            <Images className="w-3.5 h-3.5" />
            1 / {sorted.length}
          </span>
        )}
      </div>

      {lightboxOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white/80 text-sm font-medium">
              {lightboxIndex + 1} / {sorted.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="text-white/80 hover:text-white transition"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="relative flex-1 mx-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (diff < -40) { setLbLoaded(false); lbNext(); }
              else if (diff > 40) { setLbLoaded(false); lbPrev(); }
            }}
          >
            <Image
              key={lightboxIndex}
              src={getCloudinaryUrl(sorted[lightboxIndex].imageUrl, 1200, 900, "best")}
              fill
              sizes="100vw"
              className={`object-contain transition-opacity duration-300 ${lbLoaded ? "opacity-100" : "opacity-0"}`}
              alt={`${slug} imagen ${lightboxIndex + 1}`}
              onLoad={() => setLbLoaded(true)}
              unoptimized
            />
            {!lbLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {sorted.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => { setLbLoaded(false); lbPrev(); }}
                  aria-label="Imagen anterior"
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => { setLbLoaded(false); lbNext(); }}
                  aria-label="Imagen siguiente"
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {sorted.length > 1 && (
            <div
              className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {sorted.map(({ imageUrl }, index) => (
                <div
                  key={index}
                  onClick={() => { setLbLoaded(false); setLightboxIndex(index); }}
                  className={`relative w-16 h-12 shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition ${
                    index === lightboxIndex ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={getCloudinaryUrl(imageUrl, 200, 150, "eco")}
                    fill
                    sizes="64px"
                    className="object-cover"
                    alt={`${slug} miniatura ${index + 1}`}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
