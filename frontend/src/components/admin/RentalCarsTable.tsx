"use client";

import useGetAllRentals from "@/controller/useGetAllRentals";
import Image from "next/image";
import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import AddVehicleModal from "./modals/AddVehicleModal";
import useDeleteCar from "@/controller/useDeleteCar";
import toast from "react-hot-toast";
import { getCloudinaryUrl } from "@/services/cloudinary";
import DeleteCarDialog from "./modals/DeleteCarDialog";
import { formatPrice } from "@/lib/utils";
import { EditVehicleModal } from "@/components/admin/modals/EditVehicleModal";
import type { RentalCarDto } from "@/types/car/rentalCarDto";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function RentalCarsTable() {
  const { data: rentals, loading, error, refetch } = useGetAllRentals();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<RentalCarDto | null>(null);
  const { deleteCar } = useDeleteCar();

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

  const ActionButtons = ({ car }: { car: RentalCarDto }) => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-3">
        <Tooltip>
          <TooltipTrigger>
            <Pencil
              onClick={() => setEditing(car)}
              stroke="black"
              className="w-4 h-4 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>Editar vehículo</TooltipContent>
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

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-[#1D1D1D] sm:text-xl">
          Vehículos en alquiler ({rentals.length})
        </h2>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md
            bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#660606]"
          onClick={() => setOpen(true)}
        >
          <Plus />
          Añadir vehículo en alquiler
        </button>
      </div>

      <AddVehicleModal
        open={open}
        onOpenChange={setOpen}
        variant="rental"
        onSuccess={refetch}
      />

      <EditVehicleModal
        open={editing !== null}
        onOpenChange={(next) => !next && setEditing(null)}
        carId={editing?.id ?? null}
        rentalCar={editing}
        variant="rental"
        onSuccess={refetch}
      />

      {/* ponytail: no featured/sold for rentals — those endpoints do not exist */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Cargando vehículos...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Error: {error}</div>
        ) : rentals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay vehículos en alquiler
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
                        <ActionButtons car={car} />
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
                    <ActionButtons car={car} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
