"use client";

import useGetAllCars from "@/controller/useGetAllCars";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Plus, Star, CircleCheck } from "lucide-react";
import AddVehicleModal from "./modals/AddVehicleModal";
import useDeleteCar from "@/controller/useDeleteCar";
import { CarDto } from "@/types/car/carDto";
import toast from "react-hot-toast";
import { getCloudinaryUrl } from "@/services/cloudinary";
import DeleteCarDialog from "./modals/DeleteCarDialog";
import { useToggleFeatured } from "@/controller/useToggleFeatured";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SoldCarDialog from "./modals/SoldCarDialog";
import useMarkCarAsSold from "@/controller/useMarkCarAsSold";

export default function Dashboard() {
  const { data: carsData, loading, error, refetch } = useGetAllCars();
  const [cars, setCars] = useState<CarDto[]>([]);
  const { toggleFeatured } = useToggleFeatured();
  const [open, setOpen] = useState(false);
  const { deleteCar } = useDeleteCar();
  const { markCarAsSold } = useMarkCarAsSold();

  useEffect(() => {
    setCars(carsData);
  }, [carsData]);

  const onDelete = async (id: number) => {
    try {
      await deleteCar(id);
      refetch();
    } catch (err) {
      toast.error(
        "Error al eliminar el vehículo. Por favor, inténtalo de nuevo.",
      );
    }
  };

  const onSold = async (id: number) => {
    try {
      await markCarAsSold(id);
      refetch();
      toast.success("Vehículo marcado como vendido correctamente");
    } catch (err) {
      toast.error(
        "Error al marcar el vehículo como vendido. Por favor, inténtalo de nuevo.",
      );
    }
  };

  const onToggleFeatured = async (id: number) => {

    try {
      await toggleFeatured(id);
      setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === id ? { ...car, featured: !car.featured } : car,
      ),
      );
      toast.success("Vehículo actualizado correctamente");
    } catch (err) {
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id ? { ...car, featured: !car.featured } : car,
        ),
      );

      toast.error("Error al actualizar...");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* <div className="grid grid-cols-4 gap-4 mb-8">
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
          </div> */}

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
            <AddVehicleModal open={open} onOpenChange={setOpen} onSuccess={refetch} />

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Cargando vehículos...
                </div>
              ) : cars.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No hay vehículos disponibles
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  Error: {error}
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr className="text-left text-gray-900">
                      <th className="px-4 py-3 font-medium">Imagen</th>
                      <th className="px-4 py-3 font-medium">Marca y modelo</th>
                      <th className="px-4 py-3 font-medium">Año</th>
                      <th className="px-4 py-3 font-medium">Kilometraje</th>
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
                            src={getCloudinaryUrl(
                              car.mainImageUrl,
                              78,
                              48,
                              "eco",
                            )}
                            width={78}
                            height={48}
                            className="rounded-md object-cover"
                            unoptimized
                            alt={car.slug}
                          />
                        </td>

                        <td className="px-4 py-3 text-gray-900">
                          {car.brand} {car.model}
                        </td>

                        <td className="px-4 py-3 text-gray-900">{car.year}</td>
                        <td className="px-4 py-3 text-gray-900">
                          {car.mileageKm} km
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          {car.price} €
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Star
                                    stroke="black"
                                    fill={car.featured ? "gold" : "none"}
                                    onClick={() => onToggleFeatured(car.id)}
                                    className="w-4 h-4 cursor-pointer "
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Marcar como destacado
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger>
                                  <SoldCarDialog onSold={onSold} car={car} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Marcar como vendido
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger>
                                  <DeleteCarDialog
                                    onDelete={onDelete}
                                    car={car}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Eliminar vehículo
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </td>
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
