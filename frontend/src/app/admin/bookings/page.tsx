"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Archive, CalendarDays, Plus } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import BookingsCalendar from "@/components/admin/BookingsCalendar";
import BookingList, { isArchived } from "@/components/admin/BookingList";
import AddBookingModal from "@/components/admin/modals/AddBookingModal";
import useBookings from "@/controller/useBookings";

function BookingsContent() {
  const { data: bookings, loading, error, refetch } = useBookings();
  const searchParams = useSearchParams();
  const carIdParam = searchParams?.get("carId") ?? null;

  const [carFilter, setCarFilter] = useState<number | null>(carIdParam ? Number(carIdParam) : null);
  const [showArchive, setShowArchive] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const cars = useMemo(() => {
    const map = new Map<number, string>();
    bookings.forEach((b) => map.set(b.carId, b.car));
    return [...map.entries()];
  }, [bookings]);

  const byCar = carFilter == null ? bookings : bookings.filter((b) => b.carId === carFilter);
  const active = byCar.filter((b) => !isArchived(b));
  const archived = byCar.filter(isArchived);
  const list = showArchive ? archived : active;
  const calendarBookings = byCar.filter((b) => b.status !== "CANCELLED");

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Reservas</h1>
              {!loading && !error && (
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                  {active.length} activas
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={carFilter ?? ""}
                onChange={(e) => setCarFilter(e.target.value ? Number(e.target.value) : null)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Todos los coches</option>
                {cars.map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
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
          </div>

          <AddBookingModal
            open={addOpen}
            onOpenChange={setAddOpen}
            onSuccess={refetch}
            defaultCarId={carFilter ?? undefined}
          />

          {loading ? (
            <div className="p-8 text-center text-gray-500">Cargando reservas...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">Error: {error}</div>
          ) : (
            <>
              <BookingsCalendar
                bookings={calendarBookings}
                selectedId={selectedId}
                onSelect={(b) => {
                  setShowArchive(isArchived(b));
                  setSelectedId(b.id);
                }}
              />
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <CalendarDays className="h-5 w-5" />
                  {showArchive ? "Archivo (canceladas y finalizadas)" : "Reservas activas"}
                </h2>
                <BookingList
                  bookings={list}
                  selectedId={selectedId}
                  emptyText={showArchive ? "No hay reservas archivadas" : "No hay reservas activas"}
                  onRefetch={refetch}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminBookings() {
  return (
    <Suspense>
      <BookingsContent />
    </Suspense>
  );
}
