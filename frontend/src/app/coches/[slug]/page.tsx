"use client";

import { useGetCarBySlug } from "@/controller/useGetCarsBySlug";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/generic/Header";
import { ArrowLeft } from "lucide-react";
import SectionBox from "@/components/generic/SectionBox";
import CarCarousel from "@/components/cars/CarCarousel";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { bodyTypes } from "@/lib/enums/bodyType";

function getLabel(
  list: readonly { value: string; label: string }[],
  value?: string,
): string | undefined {
  return list.find((item) => item.value === value)?.label;
}

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { data, loading, error } = useGetCarBySlug(slug);

  if (loading) return <p className="p-10">Cargando...</p>;
  if (error) return <p className="p-10">Error: {error}</p>;
  if (!data) return null;

  const sortedImages =
    data.images?.sort((a, b) => a.orderIndex - b.orderIndex) || [];

  const formattedPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(data.price);

  const formattedMileage = `${new Intl.NumberFormat("es-ES").format(data.mileageKm)} km`;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-linear-to-b from-background to-muted/30 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <p
            onClick={() => router.push("/catalogo")}
            className="inline-flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </p>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <CarCarousel images={sortedImages} slug={data.slug} />

            {/* PREMIUM INFO CARD */}
            <div className="bg-card border border-border/50 rounded-3xl p-10 shadow-xl flex flex-col gap-7">

              <div className="space-y-2">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight">
                   {data.brand} {data.model}
                </h1>
                <p className="text-base text-muted-foreground">
                  {data.year} · {formattedMileage}
                </p>
              </div>

              {/* Price */}
              <p className="text-4xl font-bold tracking-tight">
                {formattedPrice}
              </p>

              {/* Specs — semantic dl for SEO */}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border/50 pt-6 text-sm">
                <Spec label="Año" value={data.year} />
                <Spec label="Kilometraje" value={formattedMileage} />
                <Spec label="Combustible" value={getLabel(fuelTypes, data.fuelType)} />
                <Spec label="Transmisión" value={getLabel(transmissions, data.transmission)} />
                <Spec label="Motor" value={data.engine} />
                <Spec label="Potencia" value={`${data.powerHp} HP`} />
                <Spec label="Carrocería" value={getLabel(bodyTypes, data.bodyType)} />
              </dl>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="bg-foreground text-background px-8 py-3 rounded-full font-medium shadow-md hover:opacity-90 transition">
                  Reservar cita
                </button>
                <button className="border border-border px-8 py-3 rounded-full font-medium hover:bg-muted transition">
                  Solicitar información
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {data.description && (
            <div className="bg-card border border-border/50 rounded-3xl p-10 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="leading-relaxed text-muted-foreground max-w-4xl">
                {data.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


function Spec({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-base">
        {value || "-"}
      </dd>
    </div>
  );
}
