"use client";

import { X } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import CarDetailsForm from "./CarDetailsForm";
import { useState, useEffect } from "react";

type AddVehicleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddVehicleModal({
  open,
  onOpenChange,
}: AddVehicleModalProps) {
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    if (!open) {
      setResetTrigger((prev) => prev + 1);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-6"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative mt-12 w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </button>

        <h3 className="mb-6 text-lg font-semibold">Añadir Vehículo</h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <ImageUploader />
          </div>

          <div>
            <CarDetailsForm resetTrigger={resetTrigger} />
          </div>
        </div>

      </div>
    </div>
  );
}
