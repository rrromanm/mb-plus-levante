import { CarDto } from "@/types/car/carDto";
import { CarCard } from "../generic/CarCard";

interface SimilarCarsProps {
  cars: CarDto[];
}

export function SimilarCars({ cars }: SimilarCarsProps) {
  if (cars.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Vehículos similares</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
    </section>
  );
}
