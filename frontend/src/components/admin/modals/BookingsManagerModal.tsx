"use client";

import { useState } from "react";
import Image from "next/image";
import { Archive, Plus, X } from "lucide-react";
import { getCloudinaryUrl } from "@/services/cloudinary";
import BookingsCalendar from "@/components/admin/BookingsCalendar";
import BookingList, { isArchived } from "@/components/admin/BookingList";
import AddBookingModal from "@/components/admin/modals/AddBookingModal";
import useBookings from "@/controller/useBookings";
import type { RentalCarDto } from "@/types/car/rentalCarDto";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: RentalCarDto | null;
};

export default function BookingsManagerModal({ open, onOpenChange, car }: Props) {
  const { data: bookings, loading, refetch } = useBookings();
  const [showArchive, setShowArchive] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!open || !car) return null;

  const carBookings = bookings.filter((b) => b.carId === car.id);
  const active = carBookings.filter((b) => !isArchived(b));
  const archived = carBookings.filter(isArchived);
  const list = showArchive ? archived : active;
  const calendarBookings = carBookings.filter((b) => b.status !== "CANCELLED");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
      <div
        className="flex min-h-full items-start justify-center p-4 sm:p-6"
        onClick={() => onOpenChange(false)}
      >
        <div
          className="relative mt-6 w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>

          <div className="mb-4 flex items-center gap-3">
            {car.mainImageUrl && (
              <Image
                src={getCloudinaryUrl(car.mainImageUrl, 160, 90, "eco")}
                width={160}
                height={90}
                unoptimized
                alt={`${car.brand} ${car.model}`}
                className="aspect-video w-24 rounded-md object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold">Reservas</h3>
              <p className="text-sm text-gray-500">
                {car.brand} {car.model} · {car.year}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowArchive(!showArchive)}
              className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium ${
                showArchive
                  ? "border-[#880808] bg-[#880808]/10 text-[#880808]"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Archive className="h-4 w-4" />
              {showArchive ? "Ver activas" : "Archivo"}
            </button>
            <button
              onClick={() => setAddOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#660606]"
            >
              <Plus className="h-4 w-4" />
              Añadir reserva
            </button>
          </div>

          <AddBookingModal
            open={addOpen}
            onOpenChange={setAddOpen}
            onSuccess={refetch}
            defaultCarId={car.id}
          />

          {loading ? (
            <div className="p-8 text-center text-gray-500">Cargando reservas...</div>
          ) : (
            <div className="flex flex-col gap-4">
              <BookingsCalendar
                bookings={calendarBookings}
                selectedId={selectedId}
                onSelect={(b) => {
                  setShowArchive(isArchived(b));
                  setSelectedId(b.id);
                }}
              />
              <BookingList
                bookings={list}
                selectedId={selectedId}
                showCar={false}
                emptyText={showArchive ? "No hay reservas archivadas" : "No hay reservas activas"}
                onRefetch={refetch}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
