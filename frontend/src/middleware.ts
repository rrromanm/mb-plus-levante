import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on all pathnames except:
  //  - /api (API routes)
  //  - /admin (kept single-language, has its own root layout)
  //  - Next.js internals (/_next, /_vercel)
  //  - files with an extension (sitemap.xml, robots.txt, images, etc.)
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
