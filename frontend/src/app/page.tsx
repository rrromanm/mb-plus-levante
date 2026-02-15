import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import { IntroSection } from "@/components/IntroSection";

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
