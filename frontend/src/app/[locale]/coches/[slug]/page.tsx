import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { getAlternates } from "@/i18n/seo";
import CarCarousel from "@/components/cars/CarCarousel";
import ShareButton from "@/components/cars/ShareButton";
import { FuelType } from "@/lib/enums/fuelType";
import { Transmission } from "@/lib/enums/transmission";
import { BodyType } from "@/lib/enums/bodyType";
import { SimilarCars } from "@/components/cars/SimilarCars";
import { CONTACT } from "@/lib/contactInfo";
import { formatPrice, formatMileage } from "@/lib/utils";
import CarsApi from "@/services/carsApi";
import type { CarDetailsDto, CarStatus } from "@/types/car/carDetailsDto";

const SITE_URL = "https://mbplusbenidorm.es";

// schema.org enum values are always English (structured data is locale-agnostic).
const FUEL_SCHEMA: Record<FuelType, string> = {
  PETROL: "Gasoline",
  DIESEL: "Diesel",
  HYBRID: "Hybrid",
  ELECTRIC: "Electric",
};

const TRANSMISSION_SCHEMA: Record<Transmission, string> = {
  MANUAL: "Manual",
  AUTOMATIC: "Automatic",
};

const BODY_SCHEMA: Partial<Record<BodyType, string>> = {
  SEDAN: "Sedan",
  COUPE: "Coupe",
  CONVERTIBLE: "Convertible",
  SUV: "SUV",
  HATCHBACK: "Hatchback",
  WAGON: "StationWagon",
  PICKUP: "Pickup",
  VAN: "Van",
};

const AVAILABILITY_SCHEMA: Record<CarStatus, string | undefined> = {
  ACTIVE: "https://schema.org/InStock",
  SOLD: "https://schema.org/SoldOut",
  DELETED: undefined,
};

function buildBreadcrumbJsonLd(
  car: CarDetailsDto,
  labels: { home: string; catalog: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: labels.home,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: labels.catalog,
        item: `${SITE_URL}/coches`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${car.brand} ${car.model} ${car.year}`,
      },
    ],
  };
}

function buildVehicleJsonLd(car: CarDetailsDto) {
  const url = `${SITE_URL}/coches/${car.slug}`;
  const images = (car.images ?? [])
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((img) => img.imageUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "@id": `${url}#vehicle`,
    name: `${car.brand} ${car.model} ${car.year}`,
    url,
    description: car.description,
    image: images.length ? images : undefined,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileageKm,
      unitCode: "KMT",
    },
    fuelType: FUEL_SCHEMA[car.fuelType],
    vehicleTransmission: TRANSMISSION_SCHEMA[car.transmission],
    bodyType: BODY_SCHEMA[car.bodyType],
    vehicleEngine: {
      "@type": "EngineSpecification",
      ...(car.engine && { name: car.engine }),
      ...(car.powerHp && {
        enginePower: {
          "@type": "QuantitativeValue",
          value: car.powerHp,
          unitCode: "BHP",
        },
      }),
    },
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      url,
      price: car.price,
      priceCurrency: "EUR",
      availability: AVAILABILITY_SCHEMA[car.status],
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@id": `${SITE_URL}/#dealer` },
    },
  };
}

interface CarDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  try {
    const car = await CarsApi.getCarBySlug(slug);
    const tFuel = await getTranslations({ locale, namespace: "Enums.fuel" });
    const tTransmission = await getTranslations({
      locale,
      namespace: "Enums.transmission",
    });

    const title = `${car.brand} ${car.model} ${car.year} – ${formatPrice(car.price)}`;

    const description = tMeta("carDescription", {
      brand: car.brand,
      model: car.model,
      year: car.year,
      mileage: formatMileage(car.mileageKm),
      transmission: tTransmission(car.transmission),
      fuel: tFuel(car.fuelType),
    });

    return {
      title,
      description,
      alternates: getAlternates(locale as Locale, `/coches/${slug}`),
      openGraph: {
        title,
        description,
        type: "website",
        url: `${SITE_URL}/coches/${slug}`,
        images: car.images?.[0]?.imageUrl
          ? [{ url: car.images[0].imageUrl, width: 1200, height: 630 }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: car.images?.[0]?.imageUrl ? [car.images[0].imageUrl] : [],
      },
    };
  } catch {
    return {
      title: tMeta("carNotFoundTitle"),
      description: tMeta("carNotFoundDescription"),
    };
  }
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("CarDetail");
  const tFuel = await getTranslations("Enums.fuel");
  const tTransmission = await getTranslations("Enums.transmission");
  const tBody = await getTranslations("Enums.body");

  try {
    const [data, similarCars] = await Promise.all([
      CarsApi.getCarBySlug(slug),
      CarsApi.getRecommendedCars(slug).catch(() => []),
    ]);

    const sortedImages =
      data.images?.sort((a, b) => a.orderIndex - b.orderIndex) || [];

    const formattedPrice = formatPrice(data.price);
    const formattedMileage = formatMileage(data.mileageKm);

    const isUnavailable = data.status === "SOLD" || data.status === "DELETED";
    const vehicleJsonLd = buildVehicleJsonLd(data);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd(data, {
      home: t("breadcrumbHome"),
      catalog: t("breadcrumbCatalog"),
    });

    const whatsappText = `${t("whatsappPrefill", {
      car: `${data.brand} ${data.model} (${data.year})`,
      price: formattedPrice,
    })}\n${SITE_URL}/coches/${data.slug}`;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {isUnavailable && (
          <div className="relative w-full overflow-hidden bg-red-50 dark:bg-black border-b border-red-200 dark:border-red-600/20">
            <div className="py-12 sm:py-16 px-4 sm:px-6 text-center">
              <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-red-400/60 dark:bg-red-600/60" />
                  <span className="text-red-600 dark:text-red-500 text-xs uppercase tracking-widest font-semibold">{t("unavailableBadge")}</span>
                  <div className="h-px w-12 bg-red-400/60 dark:bg-red-600/60" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t("notForSaleLine1")}
                  <br />
                  <span className="text-red-600 dark:text-red-500">{t("notForSaleLine2")}</span>
                </h2>
                <p className="text-gray-500 dark:text-white/50 text-base sm:text-lg max-w-md">
                  {t("notForSaleDesc")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="min-h-screen bg-linear-to-b from-background to-muted/30 px-4 py-8 sm:px-6 sm:py-12">
          <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex items-center gap-2 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition">
                    {t("breadcrumbHome")}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li>
                  <Link
                    href="/coches"
                    className="hover:text-foreground transition"
                  >
                    {t("breadcrumbCatalog")}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li
                  aria-current="page"
                  className="text-foreground font-medium truncate max-w-48 sm:max-w-none"
                >
                  {data.brand} {data.model} {data.year}
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <CarCarousel
                images={sortedImages}
                carName={`${data.brand} ${data.model} ${data.year}`}
              />

              <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col gap-6 sm:gap-7">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-4xl font-semibold leading-tight tracking-tight">
                    {data.year} {data.brand} {data.model}
                  </h1>
                  <p className="text-base text-muted-foreground">
                    {data.year} · {formattedMileage}
                  </p>
                </div>

                <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {formattedPrice}
                </p>

                <dl className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-5 border-t border-border/50 pt-6 text-sm">
                  <Spec label={t("specYear")} value={data.year} />
                  <Spec label={t("specMileage")} value={formattedMileage} />
                  <Spec
                    label={t("specFuel")}
                    value={data.fuelType ? tFuel(data.fuelType) : undefined}
                  />
                  <Spec
                    label={t("specTransmission")}
                    value={
                      data.transmission
                        ? tTransmission(data.transmission)
                        : undefined
                    }
                  />
                  <Spec label={t("specEngine")} value={data.engine} />
                  <Spec
                    label={t("specPower")}
                    value={`${data.powerHp} ${t("powerUnit")}`}
                  />
                  <Spec
                    label={t("specBody")}
                    value={data.bodyType ? tBody(data.bodyType) : undefined}
                  />
                </dl>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-green-600 transition"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    {t("whatsapp")}
                  </a>
                  <ShareButton
                    carBrand={data.brand}
                    carModel={data.model}
                    carYear={data.year}
                  />
                </div>
              </div>
            </div>

            {data.description && (
              <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-10 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">{t("description")}</h2>
                <p className="leading-relaxed text-muted-foreground max-w-4xl">
                  {data.description}
                </p>
              </div>
            )}

            <SimilarCars cars={similarCars} slug={data.slug} />
          </div>
        </div>
      </>
    );
  } catch {
    notFound();
  }
}

function Spec({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-base">{value || "-"}</dd>
    </div>
  );
}
