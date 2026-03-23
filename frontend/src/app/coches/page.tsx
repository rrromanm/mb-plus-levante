import CatalogCars from "@/components/catalog/CatalogCars";
import FilterCars from "@/components/catalog/FilterCars";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coches de Segunda Mano en Benidorm | Catálogo",
  description:
    "Descubre nuestro catálogo de coches de segunda mano en Benidorm. Vehículos revisados, listos para entrega inmediata en MB Plus Alicante.",
  keywords: [
    "coches segunda mano Benidorm",
    "coches en venta Alicante",
    "vehículos ocasión Benidorm",
    "Mercedes segunda mano Alicante",
    "comprar coche usado Benidorm",
  ],
  openGraph: {
    title: "Coches de Segunda Mano en Benidorm | MB Plus",
    description:
      "Explora coches de ocasión en Benidorm. Encuentra tu próximo vehículo al mejor precio.",
    url: "https://mbplusbenidorm.es/coches",
    type: "website",
  },
};

export default function CochesPage() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 pt-14 pb-2 ">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Alicante · Mercedes-Benz · Segunda mano
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
          Catálogo de vehículos
        </h1>
      </div>

      {/* <FilterCars /> */}
      <CatalogCars />
    </>
  );
}

