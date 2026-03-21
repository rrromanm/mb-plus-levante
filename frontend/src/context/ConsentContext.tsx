"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ConsentContextType {
  consent: boolean;
  setConsent: (value: boolean) => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [consent, setConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ga-consent");
    setConsent(stored === "true");
    setIsLoaded(true);
  }, []);

  const handleSetConsent = (value: boolean) => {
    setConsent(value);
    localStorage.setItem("ga-consent", value.toString());
  };

  return (
    <ConsentContext.Provider value={{ consent, setConsent: handleSetConsent }}>
      {isLoaded && children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return context;
};
