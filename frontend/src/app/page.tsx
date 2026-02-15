import Header from "@/components/generic/Header";
import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { StatsSection } from "@/components/homepage/StatsSection";
import { AboutSection } from "@/components/homepage/AboutSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StatsSection />
      <FeaturedCars />
      <AboutSection />
    </>
  );
}
