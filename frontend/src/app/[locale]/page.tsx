import Hero from "@/components/homepage/Hero";
import FeaturedCars from "@/components/homepage/FeaturedCars";
import { AboutUs } from "@/components/AboutUs";
import { CompanyInfo } from "@/components/CompanyInfo";
import TrustStrip from "@/components/homepage/TrustStrip";
import CarsApi from "@/services/carsApi";
import { CONTACT } from "@/lib/contactInfo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAlternates } from "@/i18n/seo";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: getAlternates(locale as Locale, "/"),
  };
}

const SAME_AS = [
  "https://maps.google.com/?cid=2235880023792833369",
  "https://www.facebook.com/janis.mobil",
  "https://www.instagram.com/mb.pluss",
].filter((url) => !url.includes("{{"));

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
  knowsLanguage: routing.locales,
  ...(SAME_AS.length > 0 && { sameAs: SAME_AS }),
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredCars = await CarsApi.getFeaturedCars().catch(() => []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ ...dealerJsonLd, inLanguage: locale }),
        }}
      />
      <Hero />
      <TrustStrip />
      <FeaturedCars cars={featuredCars} />
      <AboutUs />
      <div className="pb-8 sm:pb-12">
        <CompanyInfo />
      </div>
    </>
  );
}
