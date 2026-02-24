import Header from "@/components/generic/Header";
import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { AboutUs } from "@/components/AboutUs";
import { CompanyInfo } from "@/components/CompanyInfo";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <FeaturedCars />
      <CompanyInfo />
    </>
  );
}
