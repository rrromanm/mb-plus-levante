"use client";

import { X } from "lucide-react";
import { ImageUploader } from "../ImageUploader";
import { useState, useEffect, useMemo } from "react";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { bodyTypes } from "@/lib/enums/bodyType";
import type { FuelType } from "@/lib/enums/fuelType";
import type { Transmission } from "@/lib/enums/transmission";
import type { BodyType } from "@/lib/enums/bodyType";
import { useGetAllBrands } from "@/controller/useGetAllBrands";
import { Brand } from "@/services/brandsApi";
import { FilterSelect } from "../../generic/FiltersSelect";
import { FilterOption } from "@/types/filter";
import { useForm } from "react-hook-form";
import { AddCarDto } from "@/types/car/addCarDto";
import { useAddCar } from "@/controller/useAddCar";
import { toast } from "react-hot-toast";
import FUEL_CONFIG from "@/lib/FUEL_CONFIG";

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
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddCarDto>();
  const { addCar, loading: adding, error: addError } = useAddCar();

  const brandOptions: FilterOption[] = useMemo(
    () =>
      brands.map((brand) => ({
        value: brand.id.toString(),
        label: brand.name,
        logo: `/brands/${brand.slug}.svg`,
      })),
    [brands],
  );

  const fuelTypeOptions: FilterOption[] = useMemo(
    () =>
      fuelTypes.map((fuel) => ({
        value: fuel.value,
        label: fuel.label,
        icon: FUEL_CONFIG[fuel.value as keyof typeof FUEL_CONFIG]?.icon,
        iconColor: FUEL_CONFIG[fuel.value as keyof typeof FUEL_CONFIG]?.color,
      })),
    [],
  );

  const transmissionOptions: FilterOption[] = useMemo(
    () =>
      transmissions.map((transmission) => ({
        value: transmission.value,
        label: transmission.label,
        logo: `/transmission/${transmission.value.toLowerCase()}.svg`,
      })),
    [],
  );

  const bodyTypeOptions: FilterOption[] = useMemo(
    () =>
      bodyTypes.map((bodyType) => ({
        value: bodyType.value,
        label: bodyType.label,
      })),
    [],
  );

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
      setSelectedFuelType("");
      setSelectedTransmission("");
      setSelectedBodyType("");
      setFiles([]);
      reset();
    }
  }, [open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
      <div
        className="flex min-h-full items-start justify-center p-4 sm:p-6"
        onClick={() => onOpenChange(false)}
      >
        <div
          className="relative mt-10 w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Marca <span className="text-red-500">*</span>
                        </label>

                        <FilterSelect
                          options={brandOptions}
                          placeholder="Seleccionar marca"
                          value={selectedBrand?.id.toString()}
                          onChange={(value) => {
                            const brand = brands.find(
                              (b) => b.id.toString() === value,
                            );
                            if (brand) {
                              setSelectedBrand(brand);
                              setValue("brandId", brand.id, {
                                shouldValidate: true,
                              });
                            }
                          }}
                          showLogo={true}
                        />
                        <input
                          type="hidden"
                          {...register("brandId", {
                            required: "La marca es obligatoria",
                          })}
                          value={selectedBrand?.id ?? ""}
                        />
                        {errors.brandId && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.brandId.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Modelo <span className="text-red-500">*</span>
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

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Año <span className="text-red-500">*</span>
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
                          Kilometraje (km){" "}
                          <span className="text-red-500">*</span>
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
                          Precio (€) <span className="text-red-500">*</span>
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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Tipo de combustible{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <FilterSelect
                          options={fuelTypeOptions}
                          placeholder="Seleccionar"
                          value={selectedFuelType}
                          onChange={(value) => {
                            setSelectedFuelType(value);
                            setValue("fuelType", value as FuelType, {
                              shouldValidate: true,
                            });
                          }}
                          showIcon={true}
                        />
                        <input
                          type="hidden"
                          {...register("fuelType", {
                            required: "El tipo de combustible es obligatorio",
                          })}
                          value={selectedFuelType}
                        />
                        {errors.fuelType && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.fuelType.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Transmisión <span className="text-red-500">*</span>
                        </label>
                        <FilterSelect
                          options={transmissionOptions}
                          placeholder="Seleccionar"
                          value={selectedTransmission}
                          onChange={(value) => {
                            setSelectedTransmission(value);
                            setValue("transmission", value as Transmission, {
                              shouldValidate: true,
                            });
                          }}
                          showLogo={true}
                        />
                        <input
                          type="hidden"
                          {...register("transmission", {
                            required: "La transmisión es obligatoria",
                          })}
                          value={selectedTransmission}
                        />
                        {errors.transmission && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.transmission.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                          Carrocería <span className="text-red-500">*</span>
                        </label>
                        <FilterSelect
                          options={bodyTypeOptions}
                          placeholder="Seleccionar"
                          value={selectedBodyType}
                          onChange={(value) => {
                            setSelectedBodyType(value);
                            setValue("bodyType", value as BodyType, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <input
                          type="hidden"
                          {...register("bodyType", {
                            required: "La carrocería es obligatoria",
                          })}
                          value={selectedBodyType}
                        />
                        {errors.bodyType && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.bodyType.message}
                          </p>
                        )}
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
    </div>
  );
}
