import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { AboutUs } from "@/components/AboutUs";
import { CompanyInfo } from "@/components/CompanyInfo";
import TrustStrip from "@/components/homepage/TrustStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MB Plus Benidorm — Coches de Segunda Mano en Alicante",
  description:
    "Concesionario especializado en Mercedes-Benz y coches de ocasión en Benidorm, Alicante. ITV pasada, garantía hasta 12 meses, taller propio.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCars />
      <AboutUs />
      <CompanyInfo />
    </>
  );
}
