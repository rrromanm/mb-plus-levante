"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  carBrand: string;
  carModel: string;
  carYear: number;
}

export default function ShareButton({ carBrand, carModel, carYear }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `${carBrand} ${carModel} (${carYear})`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 border border-border px-8 py-3 rounded-full font-medium hover:bg-muted transition"
    >
      <Share2 className="w-4 h-4" />
      Compartir
    </button>
  );
}
