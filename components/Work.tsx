import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import { Arrow } from "./Arrow";
import CaseVisual from "./visuals/CaseVisual";

type Item = { slug: string; href: string; name: string; kind: string; period: string; text: string; cta: string };

/** One project per screen: the illustration leads, the text stays short. */
export default function Work({ lang, work, vis }: { lang: Locale; work: Dictionary["work"]; vis: Dictionary["vis"] }) {
  const f = work.featured;
  const items: Item[] = [
    { slug: "featured", href: `/${lang}#contact`, name: f.name, kind: f.kind, period: f.period, text: f.text, cta: f.cta },
    ...work.cases.map((c) => ({
      slug: c.slug,
      href: `/${lang}/work/${c.slug}`,
      name: c.name,
      kind: c.kind,
      period: c.period,
      text: c.summary,
      cta: work.caseCta,
    })),
  ];

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <header className="work-head">
        <h2 id="work-title" className="h2">
          {work.title}
        </h2>
        <p className="section-intro">{work.intro}</p>
      </header>

      {items.map((it, i) => (
        <article key={it.slug} className="proj" data-side={i % 2 ? "right" : "left"}>
          <div className="proj-text">
            <p className="mono proj-n">
              {String(i + 1).padStart(2, "0")} · {it.period}
            </p>
            <h3 className="proj-name">{it.name}</h3>
            <p className="proj-kind">{it.kind}</p>
            <p className="proj-sum">{it.text}</p>
            <Link href={it.href} className="link-arrow">
              {it.cta} <Arrow />
            </Link>
          </div>
          <div className="proj-plate">
            <CaseVisual slug={it.slug} vis={vis} />
            <p className="mono wp-note">{vis.note}</p>
          </div>
        </article>
      ))}

      <aside className="also" aria-label={work.alsoTitle}>
        <h3 className="mono">{work.alsoTitle}</h3>
        <ul>
          {work.also.map((a) => (
            <li key={a.name}>
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                {a.name} <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
