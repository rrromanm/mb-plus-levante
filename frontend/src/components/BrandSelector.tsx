import { Brand } from "@/services/brandsApi";
import { useState } from "react";

type Props = {
  brands: Brand[];
  value: Brand | null;
  onChange: (brand: Brand) => void;
  disabled?: boolean;
};

export default function BrandSelector({
  brands,
  value,
  onChange,
  disabled,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (brand: Brand) => {
    onChange(brand);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-left text-sm cursor-pointer"
      >
        {value ? (
          <div className="flex items-center gap-2">
            <img
              src={`/brands/${value.slug}.svg`}
              alt={value.name}
              className="h-6 w-6 object-contain"
            />

            <span>{value.name}</span>
          </div>
        ) : (
          <span className="text-gray-400">Seleccionar marca</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-white shadow">
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => handleSelect(brand)}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
            >
            <img
              src={`/brands/${brand.slug}.svg`}
              alt={brand.name}
              className="h-6 w-6 object-contain"
            />
            <span>{brand.name}</span>
          </button>
        ))}
        </div>
      )}
    </div>
  );
}
