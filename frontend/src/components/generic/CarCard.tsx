"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedCarDto } from "@/types/car/featuredCarDto";
import { getCloudinaryUrl } from "@/services/cloudinary";
import { cn } from "@/lib/utils";
import { Calendar, Gauge } from "lucide-react";

type CarCardProps = {
    car: FeaturedCarDto;
    className?: string;
};

export function CarCard({ car, className }: CarCardProps) {
    return (
        <Link
            href={`/coches/${car.slug}`}
            className={cn("block", className)}
            aria-label={`${car.brand} ${car.model}`}
        >
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={getCloudinaryUrl(car.mainImageUrl, 1200, 800, "good")}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-black/40 pb-6 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                        <span className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
                            Ver detalles →
                        </span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-xl font-bold text-foreground">
                        {car.brand} {car.model}
                    </h3>

                    <div className="flex items-center gap-5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {car.year}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Gauge className="h-4 w-4" />
                            {car.mileageKm.toLocaleString()} km
                        </span>
                    </div>

                    <div className="mt-auto border-t border-border pt-3">
                        <p className="text-2xl font-extrabold tracking-tight text-foreground">
                            €{car.price.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}