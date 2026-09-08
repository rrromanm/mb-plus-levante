"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BookingDto } from "@/types/booking";
import { bookingColor } from "@/lib/bookingColors";

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const dayN = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

type Segment = {
  booking: BookingDto;
  startCol: number; // 0..6
  endCol: number;
  continuesLeft: boolean;
  continuesRight: boolean;
  lane: number;
};

type Props = {
  bookings: BookingDto[]; // only PENDING/CONFIRMED expected
  selectedId: number | null;
  onSelect: (b: BookingDto) => void;
};

export default function BookingsCalendar({ bookings, selectedId, onSelect }: Props) {
  const now = new Date();
  const [month, setMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const y = month.getFullYear();
  const m = month.getMonth();

  // Monday-first grid covering the whole month
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const gridStart = new Date(y, m, 1 - offset);
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const weekCount = Math.ceil((offset + daysInMonth) / 7);

  const weeks = Array.from({ length: weekCount }, (_, w) => {
    const weekStart = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7);
    const days = Array.from({ length: 7 }, (_, i) =>
      new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i),
    );
    const weekEnd = days[6];

    const segments: Segment[] = bookings
      .filter((b) => dayN(parse(b.startDate)) <= dayN(weekEnd) && dayN(parse(b.endDate)) >= dayN(weekStart))
      .map((b) => {
        const from = parse(b.startDate);
        const to = parse(b.endDate);
        const startCol = dayN(from) < dayN(weekStart) ? 0 : Math.round((dayN(from) - dayN(weekStart)) / 86400000);
        const endCol = dayN(to) > dayN(weekEnd) ? 6 : Math.round((dayN(to) - dayN(weekStart)) / 86400000);
        return {
          booking: b,
          startCol,
          endCol,
          continuesLeft: dayN(from) < dayN(weekStart),
          continuesRight: dayN(to) > dayN(weekEnd),
          lane: 0,
        };
      })
      .sort((a, b) => a.startCol - b.startCol || b.endCol - a.endCol);

    // greedy lane assignment so overlapping bookings stack instead of hiding each other
    const laneEnds: number[] = [];
    for (const seg of segments) {
      let lane = laneEnds.findIndex((end) => end < seg.startCol);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(seg.endCol);
      } else {
        laneEnds[lane] = seg.endCol;
      }
      seg.lane = lane;
    }
    return { days, segments, laneCount: laneEnds.length };
  });

  const monthLabel = month.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const isToday = (d: Date) => dayN(d) === dayN(now);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => setMonth(new Date(y, m - 1, 1))} className="rounded p-1 hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold capitalize">{monthLabel}</span>
          <button
            onClick={() => setMonth(new Date(now.getFullYear(), now.getMonth(), 1))}
            className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
          >
            Hoy
          </button>
        </div>
        <button onClick={() => setMonth(new Date(y, m + 1, 1))} className="rounded p-1 hover:bg-gray-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-100 text-center text-xs font-medium text-gray-500">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1">{w}</span>
        ))}
      </div>

      {weeks.map(({ days, segments, laneCount }, w) => (
        <div
          key={w}
          className="grid border-b border-gray-100 last:border-b-0"
          style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
        >
          {days.map((d, i) => (
            <div
              key={i}
              className={`px-1 pt-1 text-xs ${d.getMonth() === m ? "text-gray-700" : "text-gray-300"}`}
              style={{ gridColumn: i + 1, gridRow: 1 }}
            >
              <span
                className={
                  isToday(d)
                    ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#880808] text-white"
                    : ""
                }
              >
                {d.getDate()}
              </span>
            </div>
          ))}
          {segments.map((seg) => {
            const finished = parse(seg.booking.endDate).getTime() < dayN(now);
            const color = finished ? "#9ca3af" : bookingColor(seg.booking.id);
            const pending = seg.booking.status === "PENDING";
            const selected = seg.booking.id === selectedId;
            return (
              <button
                key={seg.booking.id}
                onClick={() => onSelect(seg.booking)}
                title={`${seg.booking.customerName} · ${seg.booking.car}`}
                className={`mx-0.5 mb-0.5 truncate px-1.5 py-0.5 text-left text-[11px] leading-4 text-white
                  ${seg.continuesLeft ? "rounded-l-none" : "rounded-l"} ${seg.continuesRight ? "rounded-r-none" : "rounded-r"}
                  ${pending ? "opacity-60 outline-dashed outline-1 -outline-offset-1 outline-white/70" : ""}
                  ${finished ? "opacity-40" : ""}
                  ${selected ? "ring-2 ring-gray-900" : ""}`}
                style={{
                  gridColumn: `${seg.startCol + 1} / ${seg.endCol + 2}`,
                  gridRow: seg.lane + 2,
                  backgroundColor: color,
                }}
              >
                {seg.booking.customerName} · {seg.booking.car}
              </button>
            );
          })}
          {/* keep row height when a week has no bookings */}
          {laneCount === 0 && <div style={{ gridColumn: "1 / 8", gridRow: 2 }} className="h-5" />}
        </div>
      ))}

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded bg-gray-400" /> Confirmada
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded bg-gray-400 opacity-60 outline-dashed outline-1 -outline-offset-1 outline-white" />{" "}
          Pendiente
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded bg-gray-400 opacity-40" /> Finalizada
        </span>
        <span>Cada reserva tiene su propio color · pulsa una barra para ver los detalles</span>
      </div>
    </div>
  );
}
