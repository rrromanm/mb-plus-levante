import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import GoogleAnalyticsClient from "@/components/GoogleAnalyticsClient";
import { ConsentProvider } from "@/context/ConsentContext";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "Coches de segunda mano en Benidorm | MB Plus Benidorm",
    template: "%s | MB Plus Benidorm",
  },
  description:
    "Venta de coches de segunda mano en Benidorm (Alicante). Vehículos revisados, garantizados y listos para entrega inmediata en MB Plus.",
  keywords: [
    "coches segunda mano Benidorm",
    "coches en venta Alicante",
    "vehículos ocasión Benidorm",
    "concesionario coches Benidorm",
    "comprar coche usado Alicante",
  ],
  metadataBase: new URL("https://mbplusbenidorm.es"),

  openGraph: {
    title: "Coches de segunda mano en Benidorm | MB Plus Benidorm",
    description:
      "Encuentra coches de ocasión en Benidorm. Vehículos revisados y garantizados.",
    url: "https://mbplusbenidorm.es",
    siteName: "MB Plus Benidorm",
    locale: "es_ES",
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
    title: "Coches de segunda mano en Benidorm | MB Plus Benidorm",
    description: "Vehículos de ocasión en Benidorm al mejor precio",
    images: ["/wheel.avif"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ConsentProvider>
          <ClientLayout>{children}</ClientLayout>
          <GoogleAnalyticsClient gaId={gaId} />
        </ConsentProvider>
      </body>
    </html>
  );
}
