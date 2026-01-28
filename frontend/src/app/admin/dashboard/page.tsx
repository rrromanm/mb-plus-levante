"use client";

import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Car, Key, User, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { Button } from "@/components/ui/button";
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
              <Button onClick={() => setOpen(true)} size="lg" variant="brand">
                <Plus />
                Añadir Vehículo
              </Button>
              <AddVehicleModal open={open} onOpenChange={setOpen} />
            </div>

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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#1D1D1D]">Imagen</TableHead>
                      <TableHead className="text-[#1D1D1D]">Marca</TableHead>
                      <TableHead className="text-[#1D1D1D]">Año</TableHead>
                      <TableHead className="text-[#1D1D1D]">Precio</TableHead>
                      <TableHead className="text-[#1D1D1D]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.slug}>
                        <TableCell>
                          <Image
                            src={car.mainImageUrl}
                            alt={`${car.brand} ${car.model}`}
                            width={80}
                            height={48}
                            className="rounded-lg object-cover"
                            unoptimized
                          />
                        </TableCell>
                        <TableCell className="text-[#1D1D1D]">
                          {car.brand} {car.model}
                        </TableCell>
                        <TableCell className="text-[#1D1D1D]">
                          {car.year}
                        </TableCell>
                        <TableCell className="text-[#1D1D1D]">
                          €{car.price}
                        </TableCell>
                        <TableCell className="text-[#1D1D1D]">...</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
