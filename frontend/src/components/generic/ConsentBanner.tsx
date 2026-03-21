"use client";

import { useConsent } from "@/context/ConsentContext";
import { useState, useEffect } from "react";

export default function ConsentBanner() {
  const { consent, setConsent } = useConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no consent given
    setIsVisible(!consent);
  }, [consent]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm">
          Usamos Google Analytics para entender cómo usas nuestro sitio y mejorar tu experiencia.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setConsent(false);
              setIsVisible(false);
            }}
            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded"
          >
            Rechazar
          </button>
          <button
            onClick={() => {
              setConsent(true);
              setIsVisible(false);
            }}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
