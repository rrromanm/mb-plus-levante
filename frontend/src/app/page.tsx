import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { AboutUs } from "@/components/AboutUs";
import { CompanyInfo } from "@/components/CompanyInfo";
import TrustStrip from "@/components/homepage/TrustStrip";
import CarsApi from "@/services/carsApi";
import { CONTACT } from "@/lib/contactInfo";
import type { Metadata } from "next";

const SITE_URL = "https://mbplusbenidorm.es";

export const metadata: Metadata = {
  title: "Coches de segunda mano en Benidorm (Alicante) | MB Plus Benidorm",
  description:
    "Compra coches de segunda mano en Benidorm (Alicante). Especialistas en Mercedes-Benz y vehículos de ocasión con garantía, revisados y listos para entrega.",
  alternates: {
    canonical: "/",
  },
};

const dealerJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${SITE_URL}/#dealer`,
  name: "MB Plus Benidorm",
  url: SITE_URL,
  image: `${SITE_URL}/mb-emblema.avif`,
  logo: `${SITE_URL}/mb-plus-black.svg`,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. d'Europa 204",
    addressLocality: "L'Albir",
    addressRegion: "Alicante",
    postalCode: "03580",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.579953,
    longitude: -0.075103,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: [
    "Benidorm",
    "Altea",
    "Calpe",
    "L'Albir",
    "La Nucía",
    "Villajoyosa",
    "L'Alfàs del Pi",
    "Finestrat",
    "Polop",
    "Callosa d'En Sarrià",
    "Alicante",
    "Costa Blanca",
  ].map((name) => ({ "@type": "City", name })),
};

export default async function Home() {
  const featuredCars = await CarsApi.getFeaturedCars().catch(() => []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }}
      />
      <Hero />
      <TrustStrip />
      <FeaturedCars cars={featuredCars} />
      <AboutUs />
      <CompanyInfo />
    </>
  );
}
