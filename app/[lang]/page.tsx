import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localeUrl } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID } from "@/lib/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Work from "@/components/Work";
import Practice from "@/components/Practice";
import Path from "@/components/Path";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
      <Header lang={lang} nav={t.nav} />
      <main id="main">
        <Hero lang={lang} hero={t.hero} />
        <Statement intro={t.intro} profile={t.path.profile} />
        <Work lang={lang} work={t.work} mustHold={t.caseUi.mustHold} stepsLabel={t.caseUi.stepsLabel} />
        <Practice stack={t.stack} />
        <Path lang={lang} path={t.path} work={t.work} lab={t.lab} />
        <Contact contact={t.contact} />
      </main>
      <Footer footer={t.footer} />
    </>
  );
}
