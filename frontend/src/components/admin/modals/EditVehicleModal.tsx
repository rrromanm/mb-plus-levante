"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { FilterSelect } from "@/components/generic/FiltersSelect";
import { fuelTypes } from "@/lib/enums/fuelType";
import { transmissions } from "@/lib/enums/transmission";
import { bodyTypes } from "@/lib/enums/bodyType";
import type { FuelType } from "@/lib/enums/fuelType";
import type { Transmission } from "@/lib/enums/transmission";
import type { BodyType } from "@/lib/enums/bodyType";
import { useGetAllBrands } from "@/controller/useGetAllBrands";
import { useGetCarById } from "@/controller/useGetCarById";
import useEditCar from "@/controller/useEditCar";
import useEditRentalCar from "@/controller/useEditRentalCar";
import type { RentalCarDto } from "@/types/car/rentalCarDto";
import toast from "react-hot-toast";
import FUEL_CONFIG from "@/lib/FUEL_CONFIG";

type EditVehicleModalProps = {
  carId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  variant?: "sale" | "rental";
  /** rental variant seeds the form from the table row — no detail endpoint needed */
  rentalCar?: RentalCarDto | null;
};

const emptyForm = {
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
  pricePerDay: "",
  pricePerMonth: "",
  active: true,
};

export const EditVehicleModal = ({
  open,
  onOpenChange,
  carId,
  onSuccess,
  variant = "sale",
  rentalCar = null,
}: EditVehicleModalProps) => {
  const isRental = variant === "rental";
  const { data: carDetails, loading: loadingCar } = useGetCarById(
    isRental ? null : carId,
  );
  const { data: brands, loading: loadingBrands } = useGetAllBrands();
  const { editCar, loading: savingCar } = useEditCar();
  const { editRentalCar, loading: savingRental } = useEditRentalCar();
  const saving = isRental ? savingRental : savingCar;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const remainingDescriptionChars = 800 - form.description.length;

  useEffect(() => {
    const source = isRental ? rentalCar : carDetails;
    if (!source || !brands) return;

    const matchedBrand = brands.find(
      (b) => b.name.toUpperCase() === source.brand?.toUpperCase(),
    );

    setForm({
      ...emptyForm,
      brandId: matchedBrand?.id?.toString() || "",
      model: source.model || "",
      year: source.year?.toString() || "",
      mileageKm: source.mileageKm?.toString() || "",
      fuelType: source.fuelType || "",
      transmission: source.transmission || "",
      ...(isRental
        ? {
            pricePerDay: rentalCar?.pricePerDay?.toString() || "",
            pricePerMonth: rentalCar?.pricePerMonth?.toString() || "",
            active: rentalCar?.active ?? true,
          }
        : {
            price: carDetails?.price?.toString() || "",
            engine: carDetails?.engine || "",
            powerHp: carDetails?.powerHp?.toString() || "",
            description: carDetails?.description || "",
            bodyType: carDetails?.bodyType || "",
          }),
    });
  }, [carDetails, rentalCar, brands, isRental]);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setErrors({});
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!carId) return;

    const nextErrors: Record<string, string> = {};
    if (!form.brandId) nextErrors.brandId = "La marca es obligatoria";
    if (!form.model.trim()) nextErrors.model = "El modelo es obligatorio";
    if (!form.year) nextErrors.year = "El año es obligatorio";
    if (!form.mileageKm) nextErrors.mileageKm = "El kilometraje es obligatorio";
    if (isRental) {
      if (!form.pricePerDay) {
        nextErrors.pricePerDay = "El precio por día es obligatorio";
      }
    } else if (!form.price) {
      nextErrors.price = "El precio es obligatorio";
    }
    if (!form.fuelType) {
      nextErrors.fuelType = "El tipo de combustible es obligatorio";
    }
    if (!form.transmission) {
      nextErrors.transmission = "La transmisión es obligatoria";
    }
    if (!isRental && !form.bodyType) {
      nextErrors.bodyType = "La carrocería es obligatoria";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Completa los campos obligatorios");
      return;
    }

    try {
      if (isRental) {
        await editRentalCar(carId, {
          brandId: Number(form.brandId),
          model: form.model,
          year: Number(form.year),
          mileageKm: Number(form.mileageKm),
          fuelType: form.fuelType as FuelType,
          transmission: form.transmission as Transmission,
          pricePerDay: Number(form.pricePerDay),
          pricePerMonth: form.pricePerMonth ? Number(form.pricePerMonth) : null,
          active: form.active,
        });

        toast.success("Vehículo actualizado correctamente");
        onSuccess?.();
        onOpenChange(false);
        return;
      }

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
      onSuccess?.();
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
    icon: FUEL_CONFIG[f.value as keyof typeof FUEL_CONFIG]?.icon,
    iconColor: FUEL_CONFIG[f.value as keyof typeof FUEL_CONFIG]?.color,
  }));

  const transmissionOptions = transmissions.map((t) => ({
    value: t.value,
    label: t.label,
    logo: `/transmission/${t.value.toLowerCase()}.svg`,
  }));

  const bodyOptions = bodyTypes.map((b) => ({
    value: b.value,
    label: b.label,
  }));

  if (!open || !carId) return null;

  if (loadingCar || loadingBrands) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
          <div className="relative mt-10 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            Cargando vehículo...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
      <div
        className="flex min-h-full items-start justify-center p-4 sm:p-6"
        onClick={() => onOpenChange(false)}
      >
        <div
          className="relative mt-10 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>

          <h3 className="mb-6 text-lg font-semibold">
            {isRental ? "Editar Vehículo en alquiler" : "Editar Vehículo"}
          </h3>

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
                    value={form.brandId}
                    onChange={(value) => {
                      setForm({ ...form, brandId: value });
                      setErrors((prev) => ({ ...prev, brandId: "" }));
                    }}
                    showLogo={true}
                  />
                  {errors.brandId && (
                    <p className="mt-1 text-xs text-red-500">{errors.brandId}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Modelo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.model}
                    onChange={(e) => {
                      setForm({ ...form, model: e.target.value });
                      setErrors((prev) => ({ ...prev, model: "" }));
                    }}
                    className="w-full rounded-md border bg-white px-3 py-2"
                    placeholder="C 220"
                  />
                  {errors.model && (
                    <p className="mt-1 text-xs text-red-500">{errors.model}</p>
                  )}
                </div>
              </div>

              <div
                className={`mt-4 grid grid-cols-1 gap-4 ${isRental ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
              >
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Año <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => {
                      setForm({ ...form, year: e.target.value });
                      setErrors((prev) => ({ ...prev, year: "" }));
                    }}
                    className="w-full rounded-md border bg-white px-3 py-2"
                    placeholder="2020"
                  />
                  {errors.year && (
                    <p className="mt-1 text-xs text-red-500">{errors.year}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Kilometraje (km) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.mileageKm}
                    onChange={(e) => {
                      setForm({ ...form, mileageKm: e.target.value });
                      setErrors((prev) => ({ ...prev, mileageKm: "" }));
                    }}
                    className="w-full rounded-md border bg-white px-3 py-2"
                    placeholder="85000"
                  />
                  {errors.mileageKm && (
                    <p className="mt-1 text-xs text-red-500">{errors.mileageKm}</p>
                  )}
                </div>

                {isRental ? (
                  <>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Precio / día (€) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={form.pricePerDay}
                        onChange={(e) => {
                          setForm({ ...form, pricePerDay: e.target.value });
                          setErrors((prev) => ({ ...prev, pricePerDay: "" }));
                        }}
                        className="w-full rounded-md border bg-white px-3 py-2 font-medium"
                        placeholder="90"
                      />
                      {errors.pricePerDay && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.pricePerDay}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Precio / mes (€)
                      </label>
                      <input
                        type="number"
                        value={form.pricePerMonth}
                        onChange={(e) =>
                          setForm({ ...form, pricePerMonth: e.target.value })
                        }
                        className="w-full rounded-md border bg-white px-3 py-2 font-medium"
                        placeholder="1500"
                      />
                    </div>
                  </>
                ) : (
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Precio (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => {
                      setForm({ ...form, price: e.target.value });
                      setErrors((prev) => ({ ...prev, price: "" }));
                    }}
                    className="w-full rounded-md border bg-white px-3 py-2 font-medium"
                    placeholder="24900"
                  />
                  {errors.price && (
                    <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                  )}
                </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Detalles técnicos
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Tipo de combustible <span className="text-red-500">*</span>
                  </label>
                  <FilterSelect
                    options={fuelOptions}
                    placeholder="Seleccionar"
                    value={form.fuelType}
                    onChange={(value) => {
                      setForm({ ...form, fuelType: value as FuelType });
                      setErrors((prev) => ({ ...prev, fuelType: "" }));
                    }}
                    showIcon={true}
                  />
                  {errors.fuelType && (
                    <p className="mt-1 text-xs text-red-500">{errors.fuelType}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Transmisión <span className="text-red-500">*</span>
                  </label>
                  <FilterSelect
                    options={transmissionOptions}
                    placeholder="Seleccionar"
                    value={form.transmission}
                    onChange={(value) => {
                      setForm({ ...form, transmission: value as Transmission });
                      setErrors((prev) => ({ ...prev, transmission: "" }));
                    }}
                    showLogo={true}
                  />
                  {errors.transmission && (
                    <p className="mt-1 text-xs text-red-500">{errors.transmission}</p>
                  )}
                </div>
              </div>

              {isRental ? (
                <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({ ...form, active: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                  Activo (visible en el catálogo de alquiler)
                </label>
              ) : (
                <>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Motor</label>
                  <input
                    type="text"
                    value={form.engine}
                    onChange={(e) => setForm({ ...form, engine: e.target.value })}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="2.0"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">Potencia (hp)</label>
                  <input
                    type="number"
                    value={form.powerHp}
                    onChange={(e) => setForm({ ...form, powerHp: e.target.value })}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="194"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Carrocería <span className="text-red-500">*</span>
                  </label>
                  <FilterSelect
                    options={bodyOptions}
                    placeholder="Seleccionar"
                    value={form.bodyType}
                    onChange={(value) => {
                      setForm({ ...form, bodyType: value as BodyType });
                      setErrors((prev) => ({ ...prev, bodyType: "" }));
                    }}
                  />
                  {errors.bodyType && (
                    <p className="mt-1 text-xs text-red-500">{errors.bodyType}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                  <span>Descripción</span>
                  <span>{remainingDescriptionChars} caracteres restantes</span>
                </div>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  rows={4}
                  maxLength={800}
                  placeholder="Añade detalles relevantes del vehículo"
                />
              </div>
                </>
              )}
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
                onClick={handleSubmit}
                disabled={saving}
                className="rounded-md bg-[#880808] px-4 py-2 text-sm font-medium text-white hover:bg-[#6f0606] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar Vehículo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
