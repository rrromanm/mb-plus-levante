import { Playfair_Display, Manrope } from "next/font/google"
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/app/providers";
import Header from "@/components/generic/Header";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans`}
      >
        <Providers>
          <AuthProvider>
            <Header />
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
