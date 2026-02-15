"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedCarDto } from "@/types/car/featuredCarDto";
import { getCloudinaryUrl } from "@/services/cloudinary";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

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
            <Card className="group overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-video w-full">
                    <Image
                        src={getCloudinaryUrl(car.mainImageUrl, 1200, 800, "good")}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    />
                </div>

                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">
                        {car.brand} {car.model}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="secondary">{car.year}</Badge>
                        <Badge variant="secondary">{car.mileageKm} km</Badge>
                    </div>

                    <p className="pt-4 text-lg font-semibold text-primary">€{car.price}</p>
                </CardContent>
            </Card>
        </Link>
    );
}