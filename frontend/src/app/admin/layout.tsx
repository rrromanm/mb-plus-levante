"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAdmin, checkAuth } = useAuth();

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }

    checkAuth();
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [user, isLoading, isAdmin, pathname, router]);

  if (pathname !== "/admin/login" && isLoading) {
    return <div className="p-8">Checking admin access…</div>;
  }

  if (pathname !== "/admin/login" && !user) {
    return <div className="p-8">Redirecting to login…</div>;
  }

  return <>{children}</>;
}
