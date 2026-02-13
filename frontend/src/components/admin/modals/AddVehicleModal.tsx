"use client";

import { X } from "lucide-react";
import { ImageUploader } from "../../ImageUploader";
import { useState, useEffect } from "react";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { bodyTypes } from "@/lib/enums/bodyType";
import { useGetAllBrands } from "@/controller/useGetAllBrands";
import { Brand } from "@/services/brandsApi";
import BrandSelector from "../../BrandSelector";
import { useForm } from "react-hook-form";
import { AddCarDto } from "@/types/car/addCarDto";
import { useAddCar } from "@/controller/useAddCar";
import { toast } from "react-hot-toast";

type AddVehicleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function AddVehicleModal({
  open,
  onOpenChange,
  onSuccess,
}: AddVehicleModalProps) {
  const { data: brands, loading } = useGetAllBrands();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm<AddCarDto>();
  const { addCar, loading: adding, error: addError } = useAddCar();

  const onSubmit = async (data: AddCarDto) => {
    if (files.length === 0) {
      toast.error("Por favor, sube al menos una imagen");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("brandId", data.brandId.toString());
      formData.append("model", data.model);
      formData.append("year", data.year.toString());
      formData.append("mileageKm", data.mileageKm.toString());
      formData.append("price", data.price.toString());
      formData.append("fuelType", data.fuelType);
      formData.append("transmission", data.transmission);
      
      if (data.bodyType) formData.append("bodyType", data.bodyType);
      if (data.engine) formData.append("engine", data.engine);
      if (data.powerHp) formData.append("powerHp", data.powerHp.toString());

      files.forEach((file) => {
        formData.append("images", file);
      });

      await addCar(formData);
      toast.success("Vehículo añadido correctamente");
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      toast.error("Error al añadir el vehículo");
    }
  };

  useEffect(() => {
    if (!open) {
      setSelectedBrand(null);
      setFiles([]);
      reset();
    }
  }, [open, reset]);

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
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </button>

        <h3 className="mb-6 text-lg font-semibold">Añadir Vehículo</h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <ImageUploader files={files} setFiles={setFiles} />
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6 text-sm text-gray-700">
                <div className="rounded-lg border bg-gray-50 p-4">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Información básica
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Marca
                      </label>

                      <BrandSelector
                        brands={brands}
                        value={selectedBrand}
                        onChange={(brand) => {
                          setSelectedBrand(brand);
                          setValue("brandId", brand.id);
                        }}
                        disabled={loading}
                      />
                      <input
                        type="hidden"
                        required
                        {...register("brandId")}
                        value={selectedBrand?.id ?? ""}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Modelo
                      </label>
                      <input
                        type="text"
                        required
                        {...register("model")}
                        className="w-full rounded-md border bg-white px-3 py-2"
                        placeholder="C 220"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Año
                      </label>
                      <input
                        type="number"
                        required
                        {...register("year")}
                        className="w-full rounded-md border bg-white px-3 py-2"
                        placeholder="2020"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Kilometraje (km)
                      </label>
                      <input
                        type="number"
                        required
                        {...register("mileageKm")}
                        className="w-full rounded-md border bg-white px-3 py-2"
                        placeholder="85.000"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Precio (€)
                      </label>
                      <input
                        type="number"
                        required
                        {...register("price")}
                        className="w-full rounded-md border bg-white px-3 py-2 font-medium"
                        placeholder="24.900"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-white p-4">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Detalles técnicos
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Tipo de combustible
                      </label>
                      <select
                        required
                        {...register("fuelType")}
                        className="w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Seleccionar</option>
                        {fuelTypes.map((fuel) => (
                          <option key={fuel.value} value={fuel.value}>
                            {fuel.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Transmisión
                      </label>
                      <select
                        required
                        {...register("transmission")}
                        className="w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Seleccionar</option>
                        {transmissions.map((transmission) => (
                          <option
                            key={transmission.value}
                            value={transmission.value}
                          >
                            {transmission.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Motor
                      </label>
                      <input
                        type="text"
                        {...register("engine")}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="2.0"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Potencia (hp)
                      </label>
                      <input
                        type="number"
                        {...register("powerHp")}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="194"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Carrocería
                      </label>
                      <select
                        {...register("bodyType")}
                        className="w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Seleccionar</option>
                        {bodyTypes.map((bodyType) => (
                          <option key={bodyType.value} value={bodyType.value}>
                            {bodyType.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded-md border px-4 py-2 text-sm"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={adding}
                  className="rounded-md bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#6f0606] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? "Guardando..." : "Guardar Vehículo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
