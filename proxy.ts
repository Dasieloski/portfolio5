import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/lib/site";

/** Picks the best supported locale from Accept-Language, falling back to the default. */
function negotiate(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of wanted) if (isLocale(base)) return base;
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${negotiate(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Skip Next internals and any file with an extension (assets, sitemap.xml, robots.txt, icons…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
