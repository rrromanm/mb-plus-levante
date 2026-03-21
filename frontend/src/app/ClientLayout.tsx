"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/app/providers";
import Header from "@/components/generic/Header";
import Footer from "@/components/generic/Footer";
import { usePathname } from "next/navigation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
    >
      <Providers>
        <AuthProvider>
          {!isAdminRoute ? (
            <>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </>
          ) : (
            children
          )}

          <Toaster position="top-right" />
        </AuthProvider>
      </Providers>
    </div>
  );
}