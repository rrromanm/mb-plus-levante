"use client";

// ponytail: UI only — reservations live in local state until a backend endpoint exists
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { RentalCarDto } from "@/types/car/rentalCarDto";

type Range = { from: Date; to: Date };

type ReservationCalendarModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: RentalCarDto | null;
};

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

const day = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const fmt = (d: Date) =>
  d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

export default function ReservationCalendarModal({
  open,
  onOpenChange,
  car,
}: ReservationCalendarModalProps) {
  const today = new Date();
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [ranges, setRanges] = useState<Range[]>([]);
  const [pending, setPending] = useState<Date | null>(null);

  useEffect(() => {
    if (!open) {
      setPending(null);
      setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [open, car?.id]);

  if (!open || !car) return null;

  const isReserved = (d: Date) =>
    ranges.some((r) => day(d) >= day(r.from) && day(d) <= day(r.to));

  const onDayClick = (d: Date) => {
    if (!pending) {
      setPending(d);
      return;
    }
    const [from, to] = day(d) < day(pending) ? [d, pending] : [pending, d];
    setRanges([...ranges, { from, to }]);
    setPending(null);
  };

  const y = month.getFullYear();
  const m = month.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const monthLabel = month.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
      <div
        className="flex min-h-full items-start justify-center p-4 sm:p-6"
        onClick={() => onOpenChange(false)}
      >
        <div
          className="relative mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>

          <h3 className="mb-1 text-lg font-semibold">Reservas</h3>
          <p className="mb-4 text-sm text-gray-500">
            {car.brand} {car.model} · {car.year}
          </p>

          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={() => setMonth(new Date(y, m - 1, 1))}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium capitalize">{monthLabel}</span>
            <button
              onClick={() => setMonth(new Date(y, m + 1, 1))}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
            {WEEKDAYS.map((w) => (
              <span key={w} className="py-1 font-medium">
                {w}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: offset }).map((_, i) => (
              <span key={`blank-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = new Date(y, m, i + 1);
              const reserved = isReserved(d);
              const isPending = pending !== null && day(d) === day(pending);
              return (
                <button
                  key={i}
                  onClick={() => onDayClick(d)}
                  className={`rounded-md py-1.5 text-sm transition-colors ${
                    reserved
                      ? "bg-[#880808] text-white"
                      : isPending
                        ? "ring-2 ring-[#880808]"
                        : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            {pending
              ? `Inicio: ${fmt(pending)} — selecciona el día final`
              : "Selecciona el día de inicio de la reserva"}
          </p>

          {ranges.length > 0 && (
            <ul className="mt-4 space-y-2">
              {ranges.map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm"
                >
                  <span>
                    {fmt(r.from)} — {fmt(r.to)}
                  </span>
                  <X
                    className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-700"
                    onClick={() =>
                      setRanges(ranges.filter((_, idx) => idx !== i))
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
