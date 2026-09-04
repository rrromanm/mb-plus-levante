"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import SaleCarsTable from "./SaleCarsTable";
import RentalCarsTable from "./RentalCarsTable";

export default function Dashboard() {
  const [mode, setMode] = useState<"sale" | "rental">("sale");

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

          {mode === "sale" ? <SaleCarsTable /> : <RentalCarsTable />}
        </div>
      </div>
    </div>
  );
}
