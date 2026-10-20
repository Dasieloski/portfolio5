import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary } from "@/content";
import { BASE_URL, CONTACT, LOCALES, OG_LOCALE, isLocale, languageAlternates, localeUrl } from "@/lib/site";
import { personNode, websiteNode } from "@/lib/seo";
import Cinema from "@/components/cinema/Cinema";
import Analytics from "@/components/Analytics";
import "../base.css";
import "../home.css";
import "../case.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(BASE_URL),
    title: { default: meta.title, template: "%s | Dasiel Torres" },
    description: meta.description,
    authors: [{ name: CONTACT.name, url: BASE_URL }],
    creator: CONTACT.name,
    alternates: { canonical: localeUrl(lang), languages: languageAlternates() },
    openGraph: {
      type: "website",
      siteName: CONTACT.name,
      title: meta.title,
      description: meta.description,
      url: localeUrl(lang),
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
    verification: { google: "J9KJ0PyeOc0pT2c98S3kSwVQP6dXC4SLSqdA1EOfIwo" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { meta, nav, hero } = getDictionary(lang);

  const jsonLd = { "@context": "https://schema.org", "@graph": [personNode(meta.description), websiteNode(lang)] };

  return (
    // Reason: the inline script adds `js` before first paint; React must not treat that as a mismatch.
    <html lang={lang} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {nav.skip}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Cinema label={hero.canvasLabel} loading={hero.loading} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
