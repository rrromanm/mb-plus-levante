import CatalogCars from "@/components/catalog/CatalogCars";
import CarsApi from "@/services/carsApi";
import { SORT_MAP, SortKey } from "@/lib/catalogSortConfig";
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

interface CochesPageProps {
  searchParams: Promise<{ sort?: string }>;
}

function parseSortKey(value: string | undefined): SortKey {
  if (value && value in SORT_MAP) return value as SortKey;
  return "year-desc";
}

export default async function CochesPage({ searchParams }: CochesPageProps) {
  const { sort: sortParam } = await searchParams;
  const sortKey = parseSortKey(sortParam);
  const { sort, order } = SORT_MAP[sortKey];

  const [cars, recentCars] = await Promise.all([
    CarsApi.getAllCars(sort, order).catch(() => []),
    CarsApi.getRecentCars().catch(() => []),
  ]);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 pt-14 pb-2 ">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Alicante · Benidorm · Segunda mano
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
          Catálogo de vehículos
        </h1>
      </div>

      <CatalogCars cars={cars} recentCars={recentCars} currentSort={sortKey} />
    </>
  );
}
