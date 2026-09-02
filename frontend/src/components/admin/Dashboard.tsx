"use client";

import useGetAllCars from "@/controller/useGetAllCars";
import useGetAllRentals from "@/controller/useGetAllRentals";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Car, Key, Pencil, Plus, Star, User } from "lucide-react";
import AddVehicleModal from "./modals/AddVehicleModal";
import useDeleteCar from "@/controller/useDeleteCar";
import { CarDto } from "@/types/car/carDto";
import { RentalCarDto } from "@/types/car/rentalCarDto";
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
import { formatPrice, formatMileage } from "@/lib/utils";
import { EditVehicleModal } from "@/components/admin/modals/EditVehicleModal";

export default function Dashboard() {
  const [mode, setMode] = useState<"sale" | "rental">("sale");
  const { data: carsData, loading, error, refetch } = useGetAllCars();
  const {
    data: rentals,
    loading: rentalsLoading,
    error: rentalsError,
    refetch: refetchRentals,
  } = useGetAllRentals();
  const [cars, setCars] = useState<CarDto[]>([]);
  const { toggleFeatured } = useToggleFeatured();
  const [open, setOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
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

  const onEdit = (car: CarDto) => {
    setSelectedCarId(car.id);
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
            <Pencil
              onClick={() => onEdit(car)}
              stroke="black"
              className="w-4 h-4 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>Editar vehículo</TooltipContent>
        </Tooltip>
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
              <p className="font-medium text-gray-900">
                {formatMileage(car.mileageKm)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Precio</p>
              <p className="font-semibold text-[#880808]">
                {formatPrice(car.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ActionButtons car={car} />
      </div>
    </div>
  );

  const onDeleteRental = async (id: number) => {
    try {
      await deleteCar(id);
      refetchRentals();
    } catch (err) {
      toast.error(
        "Error al eliminar el vehículo. Por favor, inténtalo de nuevo.",
      );
    }
  };

  // ponytail: rentals are read-only here — no add/edit until the rental modals exist
  const renderRentals = () => {
    if (rentalsLoading)
      return (
        <div className="p-8 text-center text-gray-500">
          Cargando vehículos...
        </div>
      );
    if (rentalsError)
      return (
        <div className="p-8 text-center text-red-500">
          Error: {rentalsError}
        </div>
      );
    if (rentals.length === 0)
      return (
        <div className="p-8 text-center text-gray-500">
          No hay vehículos en alquiler
        </div>
      );

    return (
      <div className="flex flex-col gap-6">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-gray-900">
                <th className="px-4 py-3 font-medium">Imagen</th>
                <th className="px-4 py-3 font-medium">Marca y modelo</th>
                <th className="px-4 py-3 font-medium">Año</th>
                <th className="px-4 py-3 font-medium">Precio / día</th>
                <th className="px-4 py-3 font-medium">Precio / mes</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((car) => (
                <tr
                  key={car.slug}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <Image
                      src={getCloudinaryUrl(car.mainImageUrl, 78, 48, "eco")}
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
                    {formatPrice(car.pricePerDay)}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {car.pricePerMonth ? formatPrice(car.pricePerMonth) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        car.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {car.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <DeleteCarDialog onDelete={onDeleteRental} car={car} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 lg:hidden">
          {rentals.map((car) => (
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
                  <p className="text-lg font-semibold">
                    {car.brand} {car.model}
                  </p>
                  <span className="text-sm text-gray-500">{car.year}</span>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs uppercase text-gray-500">Día</p>
                      <p className="font-semibold text-[#880808]">
                        {formatPrice(car.pricePerDay)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500">Mes</p>
                      <p className="font-semibold text-[#880808]">
                        {car.pricePerMonth
                          ? formatPrice(car.pricePerMonth)
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <DeleteCarDialog onDelete={onDeleteRental} car={car} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Panel de administrador
            </h1>
            <div className="inline-flex rounded-md border border-gray-300 bg-white p-1">
              {(
                [
                  ["sale", "Venta"],
                  ["rental", "Alquiler"],
                ] as const
              ).map(([value, text]) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={`cursor-pointer rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                    mode === value
                      ? "bg-[#880808] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

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
                {mode === "sale"
                  ? `Vehículos en venta (${cars.length})`
                  : `Vehículos en alquiler (${rentals.length})`}
              </h2>
              <button
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md
                  bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#660606]"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Añadir Vehículo
              </button>
            </div>
            <AddVehicleModal
              key={mode}
              open={open}
              onOpenChange={setOpen}
              variant={mode}
              onSuccess={mode === "rental" ? refetchRentals : refetch}
            />
            <EditVehicleModal
              open={selectedCarId !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedCarId(null);
              }}
              carId={selectedCarId}
              onSuccess={refetch}
            />

            <div className="p-4 sm:p-6">
              {mode === "rental" ? (
                renderRentals()
              ) : loading ? (
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
                <div className="flex flex-col gap-6">
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b bg-gray-50">
                        <tr className="text-left text-gray-900">
                          <th className="px-4 py-3 font-medium">Imagen</th>
                          <th className="px-4 py-3 font-medium">
                            Marca y modelo
                          </th>
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

                            <td className="px-4 py-3 text-gray-900">
                              {car.year}
                            </td>
                            <td className="px-4 py-3 text-gray-900">
                              {formatMileage(car.mileageKm)}
                            </td>
                            <td className="px-4 py-3 text-gray-900">
                              {formatPrice(car.price)}
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
