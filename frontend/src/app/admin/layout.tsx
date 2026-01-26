"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    fetch("http://localhost:8080/admin/ping", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => {
        setChecking(false);
      });
  }, [pathname]);

  if (checking) {
    return <div className="p-8">Checking admin access…</div>;
  }

  return <>{children}</>;
}
