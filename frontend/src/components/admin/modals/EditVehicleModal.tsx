"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { FilterSelect } from "@/components/generic/FiltersSelect";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { bodyTypes } from "@/lib/enums/bodyType";
import { useGetAllBrands } from "@/controller/useGetAllBrands";
import { useGetCarById } from "@/controller/useGetCarById";
import useEditCar from "@/controller/useEditCar";
import toast from "react-hot-toast";

type EditVehicleModalProps = {
  carId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditVehicleModal = ({
  open,
  onOpenChange,
  carId,
}: EditVehicleModalProps) => {
  if (!open || !carId) return null;

  const { data: carDetails, loading: loadingCar } = useGetCarById(carId);
  const { data: brands, loading: loadingBrands } = useGetAllBrands();
  const { editCar, loading: saving } = useEditCar();

  const [form, setForm] = useState({
    brandId: "",
    model: "",
    year: "",
    mileageKm: "",
    price: "",
    engine: "",
    powerHp: "",
    description: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
  });

  // ✅ Populate form when data arrives
  useEffect(() => {
    if (!carDetails || !brands) return;

    const matchedBrand = brands.find(
      (b) => b.name.toUpperCase() === carDetails.brand?.toUpperCase(),
    );

    setForm({
      brandId: matchedBrand?.id?.toString() || "",
      model: carDetails.model || "",
      year: carDetails.year?.toString() || "",
      mileageKm: carDetails.mileageKm?.toString() || "",
      price: carDetails.price?.toString() || "",
      engine: carDetails.engine || "",
      powerHp: carDetails.powerHp?.toString() || "",
      description: carDetails.description || "",
      fuelType: carDetails.fuelType || "",
      transmission: carDetails.transmission || "",
      bodyType: carDetails.bodyType || "",
    });
  }, [carDetails, brands]);

  // ✅ Reset form when closing
  useEffect(() => {
    if (!open) {
      setForm({
        brandId: "",
        model: "",
        year: "",
        mileageKm: "",
        price: "",
        engine: "",
        powerHp: "",
        description: "",
        fuelType: "",
        transmission: "",
        bodyType: "",
      });
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!carId) return;

    try {
      await editCar(carId, {
        brandId: Number(form.brandId),
        model: form.model,
        year: Number(form.year),
        mileageKm: Number(form.mileageKm),
        price: Number(form.price),
        fuelType: form.fuelType,
        transmission: form.transmission,
        bodyType: form.bodyType || null,
        engine: form.engine || null,
        powerHp: form.powerHp ? Number(form.powerHp) : null,
        description: form.description || null,
      });

      toast.success("Vehículo actualizado correctamente");
      onOpenChange(false);
    } catch (err) {
      toast.error("Error al actualizar el vehículo");
    }
  };

  const brandOptions = useMemo(
    () =>
      brands?.map((b) => ({
        value: b.id.toString(),
        label: b.name,
        logo: `/brands/${b.slug}.svg`,
      })) || [],
    [brands],
  );

  const fuelOptions = fuelTypes.map((f) => ({
    value: f.value,
    label: f.label,
  }));

  const transmissionOptions = transmissions.map((t) => ({
    value: t.value,
    label: t.label,
  }));

  const bodyOptions = bodyTypes.map((b) => ({
    value: b.value,
    label: b.label,
  }));

  if (!open) return null;

  if (loadingCar || loadingBrands) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">Cargando vehículo...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div
        className="flex min-h-full items-start justify-center p-4"
        onClick={() => onOpenChange(false)}
      >
        <div
          className="bg-white p-6 rounded-lg w-full max-w-3xl mt-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4"
          >
            <X />
          </button>

          <h3 className="mb-6 text-lg font-semibold">Editar Vehículo</h3>

          <div className="space-y-4">
            {/* BRAND */}
            <FilterSelect
              options={brandOptions}
              value={form.brandId}
              onChange={(v) => setForm({ ...form, brandId: v })}
              placeholder="Marca"
            />

            {/* MODEL */}
            <input
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              placeholder="Modelo"
              className="w-full border p-2"
            />

            {/* YEAR */}
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="Año"
              className="w-full border p-2"
            />

            {/* PRICE */}
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Precio"
              className="w-full border p-2"
            />

            {/* FUEL */}
            <FilterSelect
              options={fuelOptions}
              value={form.fuelType}
              onChange={(v) => setForm({ ...form, fuelType: v })}
              placeholder="Combustible"
            />

            {/* TRANSMISSION */}
            <FilterSelect
              options={transmissionOptions}
              value={form.transmission}
              onChange={(v) => setForm({ ...form, transmission: v })}
              placeholder="Transmisión"
            />

            {/* BODY TYPE ✅ FIXED */}
            <FilterSelect
              options={bodyOptions}
              value={form.bodyType}
              onChange={(v) => setForm({ ...form, bodyType: v })}
              placeholder="Carrocería"
            />

            {/* DESCRIPTION */}
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full border p-2"
              placeholder="Descripción"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => onOpenChange(false)}>Cancelar</button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-red-700 text-white px-4 py-2 disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
