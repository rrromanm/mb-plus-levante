"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/context/ConsentContext";

interface GoogleAnalyticsClientProps {
  gaId?: string;
}

export default function GoogleAnalyticsClient({
  gaId,
}: GoogleAnalyticsClientProps) {
  const { consent } = useConsent();

  if (!gaId || !consent) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
