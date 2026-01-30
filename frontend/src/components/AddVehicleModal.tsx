"use client";

import { X } from "lucide-react";
import { ImageUploader } from "./ImageUploader";

type AddVehicleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddVehicleModal({
  open,
  onOpenChange,
}: AddVehicleModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-6">
      <div
        className="relative mt-12 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </button>

        <h3 className="mb-6 text-lg font-semibold">Añadir Vehículo</h3>

        <ImageUploader />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            className="rounded-md bg-[#880808] px-4 py-2 text-sm font-medium text-white"
          >
            Guardar Vehículo
          </button>
        </div>
      </div>
    </div>
  );
}
