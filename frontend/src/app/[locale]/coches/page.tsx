import CatalogCars from "@/components/catalog/CatalogCars";
import CarsApi from "@/services/carsApi";
import { SORT_MAP, SortKey } from "@/lib/catalogSortConfig";
import { FuelType } from "@/lib/enums/fuelType";
import { Transmission } from "@/lib/enums/transmission";
import { CarDto } from "@/types/car/carDto";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import { getAlternates, OG_LOCALES } from "@/i18n/seo";

const SITE_URL = "https://mbplusbenidorm.es";

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

function buildCatalogJsonLd(cars: CarDto[], name: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    inLanguage: locale,
    numberOfItems: cars.length,
    itemListElement: cars.map((car, index) => {
      const url = `${SITE_URL}/coches/${car.slug}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Vehicle",
          "@id": `${url}#vehicle`,
          name: `${car.brand} ${car.model} ${car.year}`,
          url,
          image: car.mainImageUrl,
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
          ...(car.powerHp && {
            vehicleEngine: {
              "@type": "EngineSpecification",
              enginePower: {
                "@type": "QuantitativeValue",
                value: car.powerHp,
                unitCode: "BHP",
              },
            },
          }),
          itemCondition: "https://schema.org/UsedCondition",
          offers: {
            "@type": "Offer",
            url,
            price: car.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/UsedCondition",
            seller: { "@id": `${SITE_URL}/#dealer` },
          },
        },
      };
    }),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const alternates = getAlternates(locale as Locale, "/coches");
  return {
    title: t("catalogTitle"),
    description: t("catalogDescription"),
    alternates,
    openGraph: {
      title: t("catalogOgTitle"),
      description: t("catalogOgDescription"),
      url: alternates.canonical as string,
      locale: OG_LOCALES[locale as Locale],
      type: "website",
    },
  };
}

interface CochesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sort?: string }>;
}

function parseSortKey(value: string | undefined): SortKey {
  if (value && value in SORT_MAP) return value as SortKey;
  return "year-desc";
}

export default async function CochesPage({ params, searchParams }: CochesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Catalog");

  const { sort: sortParam } = await searchParams;
  const sortKey = parseSortKey(sortParam);
  const { sort, order } = SORT_MAP[sortKey];

  const cars = await CarsApi.getAllCars(sort, order).catch(() => []);

  const month = new Date();
  month.setDate(month.getDate() - 30);
  const recentCars = cars.filter(
    (car) => new Date(car.createdAt) >= month
  );

  const catalogJsonLd = buildCatalogJsonLd(cars, t("pageTitle"), locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 pt-14 pb-2 ">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          {t("pageEyebrow")}
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
          {t("pageTitle")}
        </h1>
      </div>

      <CatalogCars cars={cars} recentCars={recentCars} currentSort={sortKey} />
    </>
  );
}
