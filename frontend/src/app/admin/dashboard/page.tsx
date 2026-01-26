"use client";

import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Car, Key, User, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetFeaturedCars } from "@/controller/useGetFeaturedCars";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddVehicleModal from "@/components/AddVehicleModal";

export default function AdminDashboard() {
  const { data: cars, loading, error } = useGetFeaturedCars();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
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
              <h2 className="text-xl font-semibold text-gray-900">
                Vehículos Disponibles
              </h2>
              <Button onClick={() => setOpen(true)} size="lg" variant="brand">
                <Plus/>
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
                      <TableHead>Imagen</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Año</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.slug}>
                        <TableCell>
                          <img
                            src={car.mainImageUrl}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </TableCell>
                        <TableCell>
                          {car.brand} {car.model}
                        </TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>€{car.price}</TableCell>
                        <TableCell>...</TableCell>
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
