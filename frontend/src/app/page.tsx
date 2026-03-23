import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { AboutUs } from "@/components/AboutUs";
import { CompanyInfo } from "@/components/CompanyInfo";
import TrustStrip from "@/components/homepage/TrustStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coches de segunda mano en Benidorm (Alicante) | MB Plus Benidorm",
  description:
    "Compra coches de segunda mano en Benidorm (Alicante). Especialistas en Mercedes-Benz y vehículos de ocasión con garantía, revisados y listos para entrega.",
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
