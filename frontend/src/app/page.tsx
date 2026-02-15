import Header from "@/components/generic/Header";
import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { IntroSection } from "@/components/homepage/IntroSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IntroSection />
      <FeaturedCars />
    </>
  );
}
