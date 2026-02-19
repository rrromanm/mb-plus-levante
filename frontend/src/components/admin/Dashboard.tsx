"use client";

import useGetAllCars from "@/controller/useGetAllCars";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Plus, Star } from "lucide-react";
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

  const ActionButtons = ({ car }: { car: CarDto }) => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-3">
        <Tooltip>
          <TooltipTrigger>
            <Star
              stroke="black"
              fill={car.featured ? "gold" : "none"}
              onClick={() => onToggleFeatured(car.id)}
              className="w-4 h-4 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>Marcar como destacado</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <SoldCarDialog onSold={onSold} car={car} />
          </TooltipTrigger>
          <TooltipContent>Marcar como vendido</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <DeleteCarDialog onDelete={onDelete} car={car} />
          </TooltipTrigger>
          <TooltipContent>Eliminar vehículo</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );

  const renderMobileCard = (car: CarDto) => (
    <div
      key={car.slug}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Image
          src={getCloudinaryUrl(car.mainImageUrl, 320, 180, "good")}
          width={320}
          height={180}
          className="aspect-video w-full rounded-lg object-cover sm:w-48"
          unoptimized
          alt={car.slug}
        />
        <div className="flex flex-1 flex-col gap-2 text-gray-900">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">
              {car.brand} {car.model}
            </p>
            <span className="text-sm text-gray-500">{car.year}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <p className="text-xs uppercase text-gray-500">Kilometraje</p>
              <p className="font-medium text-gray-900">{car.mileageKm} km</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Precio</p>
              <p className="font-semibold text-[#880808]">{car.price} €</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ActionButtons car={car} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-full p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>

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

          <div className="rounded-lg bg-white shadow">
            <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-[#1D1D1D] sm:text-xl">
                Vehículos Disponibles
              </h2>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#880808]
                  px-4 py-2 text-sm font-medium text-white hover:bg-[#660606]"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Añadir Vehículo
              </button>
            </div>
            <AddVehicleModal open={open} onOpenChange={setOpen} onSuccess={refetch} />

            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Cargando vehículos...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">Error: {error}</div>
              ) : cars.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No hay vehículos disponibles
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="hidden lg:block overflow-x-auto">
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
                              <ActionButtons car={car} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-4 lg:hidden">
                    {cars.map((car) => renderMobileCard(car))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
