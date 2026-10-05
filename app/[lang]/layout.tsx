import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Fraunces } from "next/font/google";
import { getDictionary } from "@/content";
import { BASE_URL, CONTACT, LOCALES, OG_LOCALE, isLocale, languageAlternates, localeUrl } from "@/lib/site";
import { personNode, websiteNode } from "@/lib/seo";
import "../globals.css";
import "../hero.css";
import "../sections.css";
import "../visuals.css";
import "../products.css";

const sans = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});
// Reason: Fraunces carries the display voice (light, tight, italic for emphasis); Archivo does everything else.
const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#f1efe8",
  colorScheme: "light",
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
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
    verification: { google: "J9KJ0PyeOc0pT2c98S3kSwVQP6dXC4SLSqdA1EOfIwo" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { meta, nav } = getDictionary(lang);

  const jsonLd = { "@context": "https://schema.org", "@graph": [personNode(meta.description), websiteNode(lang)] };

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          {nav.skip}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
