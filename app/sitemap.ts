import type { MetadataRoute } from "next";
import { getDictionary } from "@/content";
import { LOCALES, languageAlternates, localeUrl } from "@/lib/site";
import { CONTENT_UPDATED } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getDictionary("en").work.cases.map((c) => `/work/${c.slug}`);
  return ["", ...slugs].flatMap((path) =>
    LOCALES.map((lang) => ({
      url: localeUrl(lang, path),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
