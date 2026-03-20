"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function GTMTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin")) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: pathname,
    });
  }, [pathname]);

  return null;
}

export default GTMTracker;