import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localeUrl } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID } from "@/lib/seo";
import Header from "@/components/Header";
import Director from "@/components/cinema/Director";
import Hero from "@/components/home/Hero";
import Manifest from "@/components/home/Manifest";
import Work from "@/components/home/Work";
import Capabilities from "@/components/home/Capabilities";
import Record from "@/components/home/Record";
import Contact from "@/components/home/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const main = t.work.cases.filter((c) => c.tier === "main");

  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${localeUrl(lang)}#profile`,
    url: localeUrl(lang),
    name: t.meta.title,
    description: t.meta.description,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
  // Reason: an ordered list of the featured work helps search and AI systems read the page as a portfolio.
  const work = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.work.title,
    itemListElement: main.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: localeUrl(lang, `/work/${c.slug}`),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([profile, work]) }} />
      <Header lang={lang} nav={t.nav} />
      <main id="main">
        <Hero t={t.hero} />
        <Manifest t={t.manifest} />
        <Work lang={lang} t={t.work} layerNames={t.layers.items.map((l) => l.name)} />
        <Capabilities t={t.layers} />
        <Record lang={lang} t={t.record} cases={t.work.cases} />
        <Contact t={t.contact} talk={t.nav.contact} footer={t.footer} />
      </main>
      <Director />
    </>
  );
}
