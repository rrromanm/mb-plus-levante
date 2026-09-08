"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Check, Phone, Trash2, X } from "lucide-react";
import { getCloudinaryUrl } from "@/services/cloudinary";
import AdminApi from "@/services/adminApi";
import { ApiError } from "@/lib/apiClient";
import { bookingColor } from "@/lib/bookingColors";
import type { BookingDto, BookingStatus } from "@/types/booking";

export const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// CANCELLED, or CONFIRMED already in the past = "finished"
export const isArchived = (b: BookingDto) =>
  b.status === "CANCELLED" || (b.status === "CONFIRMED" && b.endDate < todayStr());

const fmt = (s: string) =>
  new Date(s).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

const statusBadge = (b: BookingDto) => {
  if (b.status === "CANCELLED")
    return <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">Cancelada</span>;
  if (b.status === "CONFIRMED" && b.endDate < todayStr())
    return <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">Finalizada</span>;
  if (b.status === "CONFIRMED")
    return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Confirmada</span>;
  return <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">Pendiente</span>;
};

type Props = {
  bookings: BookingDto[];
  selectedId?: number | null;
  emptyText: string;
  showCar?: boolean;
  onRefetch: () => void;
};

export default function BookingList({ bookings, selectedId = null, emptyText, showCar = true, onRefetch }: Props) {
  const rowRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (selectedId != null)
      rowRefs.current[selectedId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  const changeStatus = async (b: BookingDto, status: BookingStatus) => {
    try {
      await AdminApi.updateBookingStatus(b.id, status);
      toast.success(status === "CONFIRMED" ? "Reserva confirmada" : "Reserva cancelada");
      onRefetch();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        toast.error("Las fechas se solapan con otra reserva confirmada");
      } else {
        toast.error("Error al actualizar la reserva");
      }
    }
  };

  const onDelete = async (b: BookingDto) => {
    if (!confirm(`¿Eliminar la reserva de ${b.customerName}? Esta acción no se puede deshacer.`)) return;
    try {
      await AdminApi.deleteBooking(b.id);
      toast.success("Reserva eliminada");
      onRefetch();
    } catch {
      toast.error("Error al eliminar la reserva");
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {bookings.map((b) => (
        <div
          key={b.id}
          ref={(el) => { rowRefs.current[b.id] = el; }}
          className={`flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between ${
            selectedId === b.id ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className="h-14 w-1.5 shrink-0 self-center rounded-full"
              style={{ backgroundColor: bookingColor(b.id) }}
            />
            {showCar && b.carImage && (
              <Image
                src={getCloudinaryUrl(b.carImage, 160, 90, "eco")}
                width={160}
                height={90}
                unoptimized
                alt={b.car}
                className="hidden aspect-video w-24 shrink-0 self-center rounded-md object-cover sm:block"
              />
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-gray-900">{b.customerName}</p>
                {statusBadge(b)}
              </div>
              <p className="text-sm text-gray-700">
                {showCar && <>{b.car} · </>}
                {fmt(b.startDate)} — {fmt(b.endDate)}
              </p>
              <p className="text-sm text-gray-500">
                <a href={`tel:${b.customerPhone}`} className="inline-flex items-center gap-1 hover:text-[#880808]">
                  <Phone className="h-3.5 w-3.5" /> {b.customerPhone}
                </a>
                {b.customerEmail && (
                  <>
                    {" · "}
                    <a href={`mailto:${b.customerEmail}`} className="hover:text-[#880808]">
                      {b.customerEmail}
                    </a>
                  </>
                )}
              </p>
              {b.notes && <p className="mt-1 text-sm italic text-gray-500">“{b.notes}”</p>}
              <p className="mt-1 text-xs text-gray-400">
                Solicitada el {new Date(b.createdAt).toLocaleDateString("es-ES")}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {b.status === "PENDING" && (
              <button
                onClick={() => changeStatus(b, "CONFIRMED")}
                className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
              >
                <Check className="h-4 w-4" /> Confirmar
              </button>
            )}
            {!isArchived(b) && (
              <button
                onClick={() => changeStatus(b, "CANCELLED")}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <X className="h-4 w-4" /> Cancelar
              </button>
            )}
            <button
              onClick={() => onDelete(b)}
              title="Eliminar reserva"
              className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" /> Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
