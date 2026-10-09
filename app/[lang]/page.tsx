import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { CONTACT, isLocale, localeUrl } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID } from "@/lib/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Intro from "@/components/Intro";
import Anatomy from "@/components/Anatomy";
import CardStage from "@/components/card/CardStage";
import Path from "@/components/Path";
import Lab from "@/components/Lab";
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
      <CardStage role={t.hero.role} name={CONTACT.name} tagline={`${t.hero.line1} ${t.hero.line2}`} since={t.hero.since} />
      <Header lang={lang} nav={t.nav} />
      <main id="main">
        <Hero lang={lang} hero={t.hero} status={t.contact.availability} cardName={CONTACT.name} since={t.hero.since} />
        <Intro intro={t.intro} profile={t.path.profile} role={t.hero.role} cardName={CONTACT.name} since={t.hero.since} />
        <Work lang={lang} work={t.work} vis={t.vis} mustHold={t.caseUi.mustHold} />
        <Anatomy stack={t.stack} />
        <Path
          path={t.path}
          links={Object.fromEntries(t.work.cases.map((c) => [c.name, `/${lang}/work/${c.slug}`]))}
          cases={Object.fromEntries(t.work.cases.map((c) => [c.slug, { name: c.name, href: `/${lang}/work/${c.slug}` }]))}
        />
        <Lab lab={t.lab} vis={t.vis} />
        <Contact contact={t.contact} card={{ role: t.hero.role, name: CONTACT.name, since: t.hero.since }} />
      </main>
      <Footer footer={t.footer} />
    </>
  );
}
