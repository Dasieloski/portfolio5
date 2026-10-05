import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { BASE_URL, LOCALES, isLocale, languageAlternates, localeUrl } from "@/lib/site";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Arrow";
import CaseVisual from "@/components/visuals/CaseVisual";
import LayerDiagram from "@/components/visuals/LayerDiagram";
import { ARCH } from "@/content/visuals";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getDictionary(lang).work.cases.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const c = getDictionary(lang).work.cases.find((x) => x.slug === slug);
  if (!c) return {};
  const path = `/work/${slug}`;
  return {
    title: `${c.name} — ${c.kind}`,
    description: c.seoDescription,
    alternates: { canonical: localeUrl(lang, path), languages: languageAlternates(path) },
    openGraph: { title: `${c.name} — ${c.kind}`, description: c.seoDescription, url: localeUrl(lang, path), type: "article" },
  };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const cases = t.work.cases;
  const index = cases.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const c = cases[index];
  const next = cases[(index + 1) % cases.length];

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.caseUi.breadcrumbHome, item: localeUrl(lang) },
      { "@type": "ListItem", position: 2, name: t.work.title, item: `${localeUrl(lang)}#work` },
      { "@type": "ListItem", position: 3, name: c.name, item: localeUrl(lang, `/work/${slug}`) },
    ],
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.name} — ${c.kind}`,
    description: c.seoDescription,
    author: { "@id": `${BASE_URL}/#person` },
    inLanguage: lang,
    mainEntityOfPage: localeUrl(lang, `/work/${slug}`),
  };

  return (
    <>
      <Header lang={lang} nav={t.nav} />
      <main id="main" className="case">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([crumbs, article]) }} />
        <nav aria-label="Breadcrumb" className="crumbs label">
          <Link href={`/${lang}`}>{t.caseUi.breadcrumbHome}</Link> / <Link href={`/${lang}#work`}>{t.caseUi.back}</Link>
        </nav>

        <header className="case-head">
          <p className="mono">{c.kind}</p>
          <h1 className="case-title">{c.name}</h1>
          <p className="case-must">
            <span className="mono">{t.caseUi.mustHold}</span>
            {c.invariant}
          </p>
          <p className="lede">{c.summary}</p>
          <dl className="facts">
            <div>
              <dt className="mono">{t.caseUi.role}</dt>
              <dd>{c.role}</dd>
            </div>
            {c.period && (
              <div>
                <dt className="mono">{t.caseUi.period}</dt>
                <dd>{c.period}</dd>
              </div>
            )}
            {c.stack.length > 0 && (
              <div>
                <dt className="mono">{t.caseUi.stack}</dt>
                <dd>{c.stack.join(" · ")}</dd>
              </div>
            )}
          </dl>
          {c.url && (
            <a className="btn btn-solid" href={c.url} target="_blank" rel="noopener noreferrer">
              {t.caseUi.visit} <Arrow />
            </a>
          )}
        </header>

        <div className="case-stage">
          <p className="mono case-stage-label">{t.caseUi.visualLabel}</p>
                    <CaseVisual slug={c.slug} vis={t.vis} />
          <p className="mono wp-note">{t.vis.note}</p>
        </div>

        <div className="case-body">
          {c.sections.map((s, i) => {
            const arch = ARCH[c.slug];
            if (arch && i === arch.archSection) {
              return (
                <section key={s.title} className="case-arch">
                  <div>
                    <h2>{s.title}</h2>
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  <figure>
                    <figcaption className="mono">{t.caseUi.architecture}</figcaption>
                    <LayerDiagram arch={arch} label={`${c.name} — ${t.caseUi.architecture}`} />
                  </figure>
                </section>
              );
            }
            return (
              <section key={s.title} className="case-sec">
                <h2>{s.title}</h2>
                <div>
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <Link href={`/${lang}/work/${next.slug}`} className="case-next">
          <span className="mono">{t.caseUi.next}</span>
          <span className="display">
            {next.name} <Arrow />
          </span>
        </Link>
      </main>
      <Contact contact={t.contact} />
      <Footer footer={t.footer} />
    </>
  );
}
