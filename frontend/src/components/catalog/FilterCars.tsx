"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition";

const selectCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition appearance-none cursor-pointer";

export default function FilterCars() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 lg:px-12 pt-10 pb-4">
      <div className="rounded-2xl border border-border bg-card shadow-md p-6">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Filtrar vehículos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Marca / Modelo
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Ej. Mercedes, BMW, C220..."
                className={`${inputCls} pl-9`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Combustible
            </label>
            <select className={selectCls} defaultValue="">
              <option value="" disabled>
                Todos
              </option>
              {fuelTypes.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Transmisión
            </label>
            <select className={selectCls} defaultValue="">
              <option value="" disabled>
                Todas
              </option>
              {transmissions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Precio mínimo (€)
            </label>
            <input
              type="number"
              placeholder="0"
              min={0}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Precio máximo (€)
            </label>
            <input
              type="number"
              placeholder="Sin límite"
              min={0}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Año desde
            </label>
            <input
              type="number"
              placeholder="2000"
              min={1990}
              max={new Date().getFullYear()}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Año hasta
            </label>
            <input
              type="number"
              placeholder={String(new Date().getFullYear())}
              min={1990}
              max={new Date().getFullYear()}
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-5 pt-5 border-t border-border">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
}

