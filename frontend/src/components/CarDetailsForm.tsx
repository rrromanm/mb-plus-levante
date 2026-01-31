import { fuelTypes } from "@/lib/enums/fuelType";
import { bodyTypes } from "@/lib/enums/bodyType";
import { transmissions } from "@/lib/enums/transmission";

export default function CarDetailsForm() {
  return (
    <div className="space-y-6 text-sm text-gray-700">
      <div className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Información básica
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-gray-500">Marca</label>
            <input
              type="text"
              className="w-full rounded-md border bg-white px-3 py-2"
              placeholder="Mercedes-Benz"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-500">Modelo</label>
            <input
              type="text"
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
            <select className="w-full rounded-md border px-3 py-2">
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
            <select className="w-full rounded-md border px-3 py-2">
                <option value="">Seleccionar</option>
                
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-xs text-gray-500">Motor</label>
            <input
              type="text"
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
              className="w-full rounded-md border px-3 py-2"
              placeholder="Berlina"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
