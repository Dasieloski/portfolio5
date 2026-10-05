export const BASE_URL = "https://dasiel.vercel.app";

/** Add a locale here + a file in /content and the whole site (routes, sitemap, hreflang) follows. */
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_ES" };

export const CONTACT = {
  name: "Dasiel Torres",
  email: "dasieldev@gmail.com",
  github: "https://github.com/Dasieloski",
  // Add a LinkedIn URL here once available; the UI renders it automatically.
  linkedin: "" as string,
  whatsapp: "https://wa.me/5354710329",
  cvEn: "/Dasiel_Torres_CV_English.pdf",
  cvEs: "/Dasiel_Torres_CV_Espanol.pdf",
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

export const localeUrl = (lang: Locale, path = "") => `${BASE_URL}/${lang}${path}`;

/** hreflang map for a given path, including x-default. */
export const languageAlternates = (path = "") => ({
  ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, path)])),
  "x-default": localeUrl(DEFAULT_LOCALE, path),
});
