"use client";

import { useGetCarBySlug } from "@/controller/useGetCarsBySlug";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/generic/Header";
import { ArrowLeft, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CarCarousel from "@/components/cars/CarCarousel";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { bodyTypes } from "@/lib/enums/bodyType";
import { SimilarCars } from "@/components/cars/SimilarCars";
import { CONTACT } from "@/lib/contactInfo";
import { formatPrice, formatMileage } from "@/lib/utils";
import { CompanyInfo } from "@/components/CompanyInfo";

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

  const formattedPrice = formatPrice(data.price);
  const formattedMileage = formatMileage(data.mileageKm);

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-background to-muted/30 px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <p
            onClick={() => router.push("/coches")}
            className="inline-flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </p>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <CarCarousel images={sortedImages} slug={data.slug} />

            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col gap-6 sm:gap-7">

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-semibold leading-tight tracking-tight">
                   {data.brand} {data.model}
                </h1>
                <p className="text-base text-muted-foreground">
                  {data.year} · {formattedMileage}
                </p>
              </div>

              <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                {formattedPrice}
              </p>

              <dl className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-5 border-t border-border/50 pt-6 text-sm">
                <Spec label="Año" value={data.year} />
                <Spec label="Kilometraje" value={formattedMileage} />
                <Spec label="Combustible" value={getLabel(fuelTypes, data.fuelType)} />
                <Spec label="Transmisión" value={getLabel(transmissions, data.transmission)} />
                <Spec label="Motor" value={data.engine} />
                <Spec label="Potencia" value={`${data.powerHp} HP`} />
                <Spec label="Carrocería" value={getLabel(bodyTypes, data.bodyType)} />
              </dl>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hola, estoy interesado en el ${data.brand} ${data.model} (${data.year}) por ${formattedPrice} ¿Está disponible?\n${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-green-600 transition"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Contactar por WhatsApp
                </a>
                <button
                  onClick={async () => {
                    const url = window.location.href;
                    if (navigator.share) {
                      await navigator.share({ title: `${data.brand} ${data.model} (${data.year})`, url });
                    } else {
                      await navigator.clipboard.writeText(url);
                      alert("Enlace copiado al portapapeles");
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-border px-8 py-3 rounded-full font-medium hover:bg-muted transition"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
              </div>
            </div>
          </div>

          {data.description && (
            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-10 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="leading-relaxed text-muted-foreground max-w-4xl">
                {data.description}
              </p>
            </div>
          )}

          {/* <CompanyInfo /> */}
          <SimilarCars currentSlug={data.slug} />
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
