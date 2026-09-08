"use client";

import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import AdminApi from "@/services/adminApi";
import { ApiError } from "@/lib/apiClient";
import useGetAllRentals from "@/controller/useGetAllRentals";
import type { BookingStatus } from "@/types/booking";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  defaultCarId?: number;
};

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#880808] focus:outline-none";

export default function AddBookingModal({ open, onOpenChange, onSuccess, defaultCarId }: Props) {
  const { data: rentals } = useGetAllRentals();
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const startDate = f.get("startDate") as string;
    const endDate = f.get("endDate") as string;
    if (endDate < startDate) {
      toast.error("La fecha final no puede ser anterior a la inicial");
      return;
    }
    try {
      setSaving(true);
      await AdminApi.createBooking({
        carId: Number(f.get("carId")),
        startDate,
        endDate,
        customerName: f.get("customerName") as string,
        customerPhone: f.get("customerPhone") as string,
        customerEmail: (f.get("customerEmail") as string) || null,
        notes: (f.get("notes") as string) || null,
        status: f.get("status") as BookingStatus,
      });
      toast.success("Reserva creada");
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        toast.error("Las fechas se solapan con una reserva confirmada");
      } else {
        toast.error("Error al crear la reserva");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/40">
      <div
        className="flex min-h-full items-start justify-center p-4 sm:p-6"
        onClick={() => onOpenChange(false)}
      >
        <form
          onSubmit={onSubmit}
          className="relative mt-10 w-full max-w-md space-y-3 rounded-lg bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
          <h3 className="text-lg font-semibold">Añadir reserva</h3>
          <p className="text-sm text-gray-500">
            Para reservas hechas por teléfono o en persona.
          </p>

          <select name="carId" required className={inputCls} defaultValue={defaultCarId ?? ""}>
            <option value="" disabled>
              Selecciona el coche
            </option>
            {rentals.map((r) => (
              <option key={r.id} value={r.id}>
                {r.brand} {r.model} ({r.year})
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-gray-600">
              Inicio
              <input type="date" name="startDate" required className={inputCls} />
            </label>
            <label className="text-xs text-gray-600">
              Fin
              <input type="date" name="endDate" required className={inputCls} />
            </label>
          </div>

          <input name="customerName" required maxLength={100} placeholder="Nombre del cliente" className={inputCls} />
          <input name="customerPhone" required maxLength={30} placeholder="Teléfono" className={inputCls} />
          <input name="customerEmail" type="email" maxLength={255} placeholder="Email (opcional)" className={inputCls} />
          <textarea name="notes" maxLength={1000} placeholder="Notas (opcional)" rows={2} className={inputCls} />

          <select name="status" defaultValue="CONFIRMED" className={inputCls}>
            <option value="CONFIRMED">Confirmada</option>
            <option value="PENDING">Pendiente</option>
          </select>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-md bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#660606] disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar reserva"}
          </button>
        </form>
      </div>
    </div>
  );
}
