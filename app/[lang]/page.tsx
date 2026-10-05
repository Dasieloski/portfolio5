import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/site";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Path from "@/components/Path";
import Lab from "@/components/Lab";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header lang={lang} nav={t.nav} />
      <main id="main">
        <Hero lang={lang} hero={t.hero} status={`${t.contact.availability} · ${t.contact.location}`} />
        <Work lang={lang} work={t.work} vis={t.vis} mustHold={t.caseUi.mustHold} />
        <Stack stack={t.stack} />
        <Path path={t.path} />
        <Lab lab={t.lab} vis={t.vis} />
        <Contact contact={t.contact} />
      </main>
      <Footer footer={t.footer} />
    </>
  );
}
