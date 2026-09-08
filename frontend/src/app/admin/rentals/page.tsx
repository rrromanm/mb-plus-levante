"use client";

import Sidebar from "@/components/admin/Sidebar";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, Pencil, Plus } from "lucide-react";
import useGetAllRentals from "@/controller/useGetAllRentals";
import useDeleteCar from "@/controller/useDeleteCar";
import DeleteCarDialog from "@/components/admin/modals/DeleteCarDialog";
import AddVehicleModal from "@/components/admin/modals/AddVehicleModal";
import { EditVehicleModal } from "@/components/admin/modals/EditVehicleModal";
import BookingsManagerModal from "@/components/admin/modals/BookingsManagerModal";
import { getCloudinaryUrl } from "@/services/cloudinary";
import { formatPrice, formatMileage } from "@/lib/utils";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import type { RentalCarDto } from "@/types/car/rentalCarDto";

const label = (
  options: readonly { value: string; label: string }[],
  value: string,
) => options.find((o) => o.value === value)?.label ?? value;

export default function AdminRentals() {
  const { data: rentals, loading, error, refetch } = useGetAllRentals();
  const { deleteCar } = useDeleteCar();
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<RentalCarDto | null>(null);
  const [reserving, setReserving] = useState<RentalCarDto | null>(null);

  const onDelete = async (id: number) => {
    try {
      await deleteCar(id);
      refetch();
    } catch {
      toast.error(
        "Error al eliminar el vehículo. Por favor, inténtalo de nuevo.",
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Alquiler de coches
              </h1>
              {!loading && !error && (
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                  {rentals.length} en alquiler
                </span>
              )}
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md
                bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#660606]"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Añadir vehículo en alquiler
            </button>
          </div>

          <AddVehicleModal
            open={addOpen}
            onOpenChange={setAddOpen}
            variant="rental"
            onSuccess={refetch}
          />
          <BookingsManagerModal
            open={reserving !== null}
            onOpenChange={(open) => {
              if (!open) setReserving(null);
            }}
            car={reserving}
          />
          <EditVehicleModal
            open={editing !== null}
            onOpenChange={(open) => {
              if (!open) setEditing(null);
            }}
            carId={editing?.id ?? null}
            rentalCar={editing}
            variant="rental"
            onSuccess={refetch}
          />

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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {rentals.map((car) => (
                <div
                  key={car.slug}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm
                    transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <Image
                      src={getCloudinaryUrl(car.mainImageUrl, 320, 180, "eco")}
                      width={320}
                      height={180}
                      className="aspect-video w-full object-cover"
                      unoptimized
                      alt={car.slug}
                    />
                    <span
                      className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        car.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {car.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <p
                      className="truncate text-sm font-semibold text-gray-900"
                      title={`${car.brand} ${car.model}`}
                    >
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.year} · {formatMileage(car.mileageKm)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {label(fuelTypes, car.fuelType)} ·{" "}
                      {label(transmissions, car.transmission)}
                    </p>
                    <p className="mt-auto pt-2 text-sm font-semibold text-[#880808]">
                      {formatPrice(car.pricePerDay)} / día
                      {car.pricePerMonth != null && (
                        <span className="block text-xs font-medium text-gray-500">
                          {formatPrice(car.pricePerMonth)} / mes
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-gray-100 px-3 py-2">
                    <Pencil
                      onClick={() => setEditing(car)}
                      stroke="black"
                      className="h-4 w-4 cursor-pointer"
                    />
                    <CalendarDays
                      onClick={() => setReserving(car)}
                      stroke="black"
                      className="h-4 w-4 cursor-pointer"
                    />
                    <DeleteCarDialog onDelete={onDelete} car={car} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
