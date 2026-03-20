import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Coches de ocasión en Benidorm | MB Plus Benidorm",
    template: "%s | MB Plus Benidorm",
  },
  description:
    "Venta de coches de ocasión y vehículos usados en Benidorm. Encuentra coches revisados y garantizados al mejor precio en MB Plus Levante.",
  keywords: [
    "coches de ocasión Benidorm",
    "coches usados Benidorm",
    "concesionario Benidorm",
    "vehículos segunda mano Benidorm",
    "comprar coche Benidorm",
  ],
  metadataBase: new URL("https://mbplusbenidorm.es"),
  openGraph: {
    title: "Coches de ocasión en Benidorm | MB Plus Benidorm",
    description:
      "Concesionario de vehículos usados en Benidorm. Coches revisados, garantizados y al mejor precio.",
    url: "mbplusbenidorm.es",
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
    title: "Coches de ocasión en Benidorm",
    description: "Vehículos usados y de ocasión en Benidorm",
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
