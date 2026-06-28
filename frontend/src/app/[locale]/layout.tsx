import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAlternates, OG_LOCALES } from "@/i18n/seo";
import ClientLayout from "@/app/ClientLayout";
import GoogleAnalyticsClient from "@/components/GoogleAnalyticsClient";
import { ConsentProvider } from "@/context/ConsentContext";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const alternates = getAlternates(locale as Locale, "/");

  return {
    metadataBase: new URL("https://mbplusbenidorm.es"),
    title: {
      default: t("layoutTitleDefault"),
      template: t("layoutTitleTemplate"),
    },
    description: t("layoutDescription"),
    alternates,
    openGraph: {
      title: t("layoutOgTitle"),
      description: t("layoutOgDescription"),
      url: alternates.canonical as string,
      siteName: t("siteName"),
      locale: OG_LOCALES[locale as Locale],
      type: "website",
      images: [
        {
          url: "/mb-plus-black.svg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("layoutTwitterTitle"),
      description: t("layoutTwitterDescription"),
      images: ["/wheel.avif"],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "geo.region": "ES-A",
      "geo.placename": "Benidorm",
      "geo.position": "38.579953;-0.075103",
      ICBM: "38.579953, -0.075103",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <ConsentProvider>
            <ClientLayout>{children}</ClientLayout>
            <GoogleAnalyticsClient gaId={gaId} />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
