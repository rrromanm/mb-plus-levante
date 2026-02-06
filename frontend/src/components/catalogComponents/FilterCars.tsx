"use client"

import useGetAllCars from "@/controller/useGetAllCars";
import SectionBox from "../SectionBox";
import Image from "next/image";

export default function FilterCars() {
  const { data, loading, error } = useGetAllCars();

  return (
    <>
      <div className="mt-8">
        <SectionBox>
          <h2 className="text-2xl font-bold mb-4">Catalogo</h2>
          <p>Coches disponibles: 24</p>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Marca</label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">Modelo</label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">
                Tipo de combustible
              </label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">
                Chassis
              </label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Precio</label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">Año</label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">
                Tipo de combustible
              </label>
              <input
                type="text"
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
            <div>
              <button>Filtrar</button>
            </div>
          </div>
        </SectionBox>
      </div>
      <div className="mt-8">
        <SectionBox>
          <div className="grid grid-cols-3 gap-3">
            {data.map((car) => (
              <div
                key={car.slug}
                className="overflow-hidden rounded-xl bg-black/40"
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={car.mainImageUrl}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    priority={false}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-xs text-white/60">
                    {car.year} • {car.mileageKm} km • €
                    {car.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionBox>
      </div>
    </>
  );
}
