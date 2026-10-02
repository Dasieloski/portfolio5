import type { MetadataRoute } from "next";
import { getDictionary } from "@/content";
import { LOCALES, languageAlternates, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getDictionary("en").work.cases.map((c) => `/work/${c.slug}`);
  return ["", ...slugs].flatMap((path) =>
    LOCALES.map((lang) => ({
      url: localeUrl(lang, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
