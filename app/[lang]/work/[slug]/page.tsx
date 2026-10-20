import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { litVector } from "@/content/stage";
import { LOCALES, isLocale, languageAlternates, localeUrl } from "@/lib/site";
import { APP_CATEGORY, PERSON_ID, WEBSITE_ID } from "@/lib/seo";
import Header from "@/components/Header";
import Contact from "@/components/home/Contact";
import Director from "@/components/cinema/Director";
import Roll from "@/components/Roll";
import { Arrow } from "@/components/Arrow";

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
    title: `${c.name} - ${c.kind}`,
    description: c.seoDescription,
    alternates: { canonical: localeUrl(lang, path), languages: languageAlternates(path) },
    openGraph: {
      title: `${c.name} - ${c.kind}`,
      description: c.seoDescription,
      url: localeUrl(lang, path),
      type: "article",
      images: [{ url: `${localeUrl(lang)}/opengraph-image`, width: 1200, height: 630, alt: "Dasiel Torres - Full-Stack Software Engineer" }],
    },
    twitter: { card: "summary_large_image", title: `${c.name} - ${c.kind}`, description: c.seoDescription },
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
  const lit = litVector(c.slug);
  const layerNames = t.layers.items.map((l) => l.name);

  const pageUrl = localeUrl(lang, `/work/${slug}`);
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.nav.home, item: localeUrl(lang) },
      { "@type": "ListItem", position: 2, name: t.nav.work, item: `${localeUrl(lang)}#work` },
      { "@type": "ListItem", position: 3, name: c.name, item: pageUrl },
    ],
  };
  // Reason: the page is a WebPage about one software product; the person is a contributor, not its owner.
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${c.name} - ${c.kind}`,
    description: c.seoDescription,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${pageUrl}#software` },
    mainEntity: { "@id": `${pageUrl}#software` },
  };
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: c.name,
    description: c.summary,
    applicationCategory: APP_CATEGORY[c.slug] ?? "BusinessApplication",
    inLanguage: lang,
    contributor: { "@id": PERSON_ID },
    ...(c.url ? { url: c.url } : {}),
  };

  return (
    <>
      <Header lang={lang} nav={t.nav} />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([crumbs, page, software]) }} />

        <section className="cs-top" data-scene="case" data-hero="true" data-slug={c.slug} data-i={index} data-chapter="work" aria-labelledby="case-title">
          <div className="cs-head">
            <nav aria-label="Breadcrumb" className="crumbs mono">
              <Link href={`/${lang}`} className="ulink">
                {t.nav.home.split(",")[0]}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${lang}#work`} className="ulink">
                {t.caseUi.back}
              </Link>
            </nav>
            <p className="shot-kind mono">{c.kind}</p>
            <h1 id="case-title" className="cs-title">
              {c.name}
            </h1>
            <p className="rule">{c.invariant}</p>
            <p className="cs-lede">{c.summary}</p>
            <dl className="cs-facts">
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
              <div>
                <dt className="mono">{t.work.myPart}</dt>
                <dd>{c.contribution}</dd>
              </div>
              {c.stack.length > 0 && (
                <div>
                  <dt className="mono">{t.caseUi.stack}</dt>
                  <dd>{c.stack.join(", ")}</dd>
                </div>
              )}
              <div>
                <dt className="mono">{t.caseUi.layers}</dt>
                <dd>
                  <ul className="chips">
                    {layerNames.map((n, k) => (
                      <li key={n} className={lit[k] ? "is-on" : undefined}>
                        {n}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            {c.url && (
              <a className="btn" href={c.url} target="_blank" rel="noopener noreferrer">
                <Roll text={t.caseUi.visit} />
                <Arrow />
              </a>
            )}
          </div>
        </section>

        <div className="cs-body" data-scene="calm" data-chapter="work">
          {c.sections.map((s, i) => (
            <section key={s.title} className="cs-sec" data-rv>
              <p className="mono cs-sec-n">{String(i + 1).padStart(2, "0")}</p>
              <h2>{s.title}</h2>
              <div className="cs-sec-text">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <Link href={`/${lang}/work/${next.slug}`} className="cs-next">
            <span className="mono">{t.caseUi.next}</span>
            <span className="cs-next-name">
              <Roll text={next.name} />
              <Arrow />
            </span>
            <span className="cs-next-kind">{next.kind}</span>
          </Link>
        </div>

        <Contact t={t.contact} talk={t.nav.contact} footer={t.footer} />
      </main>
      <Director />
    </>
  );
}
