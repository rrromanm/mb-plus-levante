"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={isAdminRoute ? "light" : "system"}
      enableSystem={!isAdminRoute}
      forcedTheme={isAdminRoute ? "light" : undefined}
    >
      {children}
    </ThemeProvider>
  );
}
