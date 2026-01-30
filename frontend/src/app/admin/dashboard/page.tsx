"use client";

import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Car, Key, User, Plus } from "lucide-react";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { useState } from "react";
import AddVehicleModal from "@/components/AddVehicleModal";
import Image from "next/image";

export default function AdminDashboard() {
  const { data: cars, loading, error } = useGetFeaturedCars();
  const [open, setOpen] = useState(false);

  return (
    <div className="force-light flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <DashboardCard
              title={"Vehiculos en venta"}
              value={cars.length}
              icon={Car}
            />
            <DashboardCard
              title={"Visitantes"}
              subtitle="Ultimo mes"
              value={"486"}
              icon={User}
            />
            <DashboardCard title={""} value={""} icon={Car} />
            <DashboardCard
              title={"Coches en alquiler"}
              value={"0"}
              icon={Key}
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1D1D1D]">
                Vehículos Disponibles
              </h2>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-[#880808]
                  px-4 py-2 text-sm font-medium text-white hover:bg-[#660606] cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Añadir Vehículo
              </button>
            </div>
            <AddVehicleModal open={open} onOpenChange={setOpen} />

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Cargando vehículos...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  Error: {error}
                </div>
              ) : cars.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No hay vehículos disponibles
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr className="text-left text-gray-900">
                      <th className="px-4 py-3 font-medium">Imagen</th>
                      <th className="px-4 py-3 font-medium">Marca</th>
                      <th className="px-4 py-3 font-medium">Año</th>
                      <th className="px-4 py-3 font-medium">Precio</th>
                      <th className="px-4 py-3 font-medium">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cars.map((car) => (
                      <tr
                        key={car.slug}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <Image
                            src={car.mainImageUrl}
                            width={72}
                            height={48}
                            className="rounded-md object-cover"
                            unoptimized
                            alt=""
                          />
                        </td>

                        <td className="px-4 py-3 text-gray-900">
                          {car.brand} {car.model}
                        </td>

                        <td className="px-4 py-3 text-gray-900">{car.year}</td>
                        <td className="px-4 py-3 text-gray-900">
                          €{car.price}
                        </td>
                        <td className="px-4 py-3 text-gray-500">…</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
