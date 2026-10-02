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
import Hud from "@/components/Hud";
import Scene from "@/components/scene/Scene";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const marks = [
    { id: "top", label: t.hud.intro },
    { id: "work", label: t.nav.work },
    { id: "stack", label: t.nav.stack },
    { id: "path", label: t.nav.path },
    { id: "lab", label: t.nav.lab },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <>
      <Header lang={lang} nav={t.nav} />
      <Hud marks={marks} />
      <Scene names={t.stack.layers.map((l) => l.name)} />
      <main id="main">
        <Hero lang={lang} hero={t.hero} layers={t.stack.layers} hint={t.vis.scrollHint} />
        <Work lang={lang} work={t.work} vis={t.vis} />
        <Stack stack={t.stack} />
        <Path path={t.path} />
        <Lab lab={t.lab} vis={t.vis} />
        <Contact contact={t.contact} />
      </main>
      <Footer footer={t.footer} />
    </>
  );
}
