import CatalogCars from "@/components/catalog/CatalogCars";
import FilterCars from "@/components/catalog/FilterCars";

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

