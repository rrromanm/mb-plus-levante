import Image from "next/image";
import Link from "next/link";
import SectionBox from "./SectionBox";

const cars = [
  {
    id: 1,
    title: "BMW 3 Series",
    subtitle: "Sporty and elegant",
    image: "/cars/bmw.jpg",
  },
  {
    id: 2,
    title: "Audi A6",
    subtitle: "Comfort meets power",
    image: "/cars/audi.jpg",
  },
  {
    id: 3,
    title: "Mercedes A-Class",
    subtitle: "Luxury compact",
    image: "/cars/mercedes.jpg",
  },
];

export default function FeaturedCars() {
  return (
    <SectionBox
      title="FEATURED CARS"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="overflow-hidden rounded-xl bg-black/40"
          >
            <Image
              src={car.image}
              alt={car.title}
              width={600}
              height={400}
              className="h-60 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-sm font-semibold text-white">
                {car.title}
              </h3>
              <p className="text-xs text-white/60">{car.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pt-8">
            <a
              className="inline-block rounded-md bg-[#C0C0C0] px-4 py-2 text-sm font-semibold text-black
              transition hover:bg-white"
            >
              <Link href="/catalog" className="w-full">
                View All Cars <span aria-hidden>↗</span>
              </Link>
            </a>
        </div>
    </SectionBox>
  );
}
