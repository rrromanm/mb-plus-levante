// Canonical host. Always www — the apex 308-redirects to it, and sitemap /
// canonical URLs that redirect get deprioritised by Google.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mbplusbenidorm.es";
