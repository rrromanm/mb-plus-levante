import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { useGetAllBrands } from "@/controller/useGetAllBrands";
import { useState, useEffect, FormEvent } from "react";
import { Brand } from "@/services/brandsApi";
import BrandSelector from "./BrandSelector";
import { useForm } from "react-hook-form";
import { AddCarDto } from "@/types/car/addCarDto";
import { useAddCar } from "@/controller/useAddCar";

type Props = {
  resetTrigger?: number;
};

export default function CarDetailsForm({ resetTrigger }: Props) {
  const { data: brands, loading } = useGetAllBrands();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<AddCarDto>();
  const { addCar, loading: adding, error: addError } = useAddCar();

  const onSubmit = async (data: AddCarDto) => {
    await addCar(data);
  };
  useEffect(() => {
    setSelectedBrand(null);
  }, [resetTrigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 text-sm text-gray-700">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Información básica
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Marca</label>

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
                {...register("brandId")}
                value={selectedBrand?.id ?? ""}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">Modelo</label>
              <input
                type="text"
                {...register("model")}
                className="w-full rounded-md border bg-white px-3 py-2"
                placeholder="C 220"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Año</label>
              <input
                type="number"
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
                {...register("transmission")}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Seleccionar</option>
                {transmissions.map((transmission) => (
                  <option key={transmission.value} value={transmission.value}>
                    {transmission.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Motor</label>
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
              <input
                type="text"
                {...register("bodyType")}
                className="w-full rounded-md border px-3 py-2"
                placeholder="Berlina"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-md bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#6f0606]"
        >
          Guardar Vehículo
        </button>
      </div>
    </form>
  );
}
