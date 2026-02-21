import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { CarCard } from "../generic/CarCard";

export function SimilarCars({ currentSlug }: { currentSlug: string }) {
  const { data } = useGetFeaturedCars();
  const cars = data.filter((c) => c.slug !== currentSlug).slice(0, 3);

  if (cars.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Vehículos destacados</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
    </section>
  );
}
