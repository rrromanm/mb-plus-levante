"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetCarBySlug } from "@/controller/useGetCarsBySlug";
import { useParams, useRouter } from "next/navigation";
import { getCloudinaryUrl } from "@/services/cloudinary";
import Header from "@/components/generic/Header";
import { ArrowLeft } from "lucide-react";
import SectionBox from "@/components/generic/SectionBox";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { data, loading, error } = useGetCarBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) return <p className="p-10">Cargando...</p>;
  if (error) return <p className="p-10">Error: {error}</p>;
  if (!data) return null;

  const sortedImages =
    data.images?.sort((a, b) => a.orderIndex - b.orderIndex) || [];

  return (
    <>
      <Header />

      <div className="min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <p
            onClick={() => router.push("/catalogo")}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </p>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {sortedImages.length > 0 && (
                <>
                  <div className="relative w-full h-125 rounded-2xl overflow-hidden shadow">
                    <Image
                      src={getCloudinaryUrl(
                        sortedImages[selectedImage].imageUrl,
                        1200,
                        800,
                        "best",
                      )}
                      fill
                      className="object-cover"
                      alt={`${data.slug}-main`}
                      unoptimized
                    />
                  </div>

                  <div className="flex gap-3 overflow-x-auto">
                    {sortedImages.map(({ imageUrl }, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-28 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                          selectedImage === index
                            ? "border-black"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={getCloudinaryUrl(imageUrl, 300, 200, "best")}
                          fill
                          className="object-cover"
                          alt={`${data.slug}-thumb-${index}`}
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <SectionBox>
              <div>
                <p className="text-xs uppercase tracking-widest">
                  Colección Premium
                </p>

                <h1 className="text-4xl font-bold mt-2">
                  {data.brand} {data.model}
                </h1>

                <p className="text-sm mt-1">{data.year}</p>
              </div>

              <div className="flex gap-4">
                <button className="bg-[#0f172a] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
                  Reservar cita
                </button>

                <button className="border px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition">
                  Solicitar información
                </button>
              </div>
            </SectionBox>
          </div>
        </div>
        <SectionBox classname="max-w-7xl mx-auto py-10">
          <h2 className="font-semibold text-lg mb-2">Descripción</h2>
          <p className="leading-relaxed">
            {data.description || "Este vehículo aún no tiene descripción."}
          </p>
        </SectionBox>
      </div>
    </>
  );
}
