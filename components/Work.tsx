import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import { Arrow } from "./Arrow";
import WorkGallery from "./WorkGallery";
import CaseVisual from "./visuals/CaseVisual";

type Item = { slug: string; href: string; name: string; kind: string; period: string; text: string; tags: string[]; cta: string };

export default function Work({ lang, work, vis }: { lang: Locale; work: Dictionary["work"]; vis: Dictionary["vis"] }) {
  const f = work.featured;
  const items: Item[] = [
    { slug: "featured", href: `/${lang}#contact`, name: f.name, kind: f.kind, period: f.period, text: f.text, tags: f.tags, cta: f.cta },
    ...work.cases.map((c) => ({
      slug: c.slug,
      href: `/${lang}/work/${c.slug}`,
      name: c.name,
      kind: c.kind,
      period: c.period,
      text: c.summary,
      tags: c.stack,
      cta: work.caseCta,
    })),
  ];

  return (
    <WorkGallery title={work.title} intro={work.intro} count={items.length}>
      {items.map((it, i) => (
        <article key={it.slug} className="wp">
          <div className="wp-text">
            <p className="mono wp-n">
              {String(i + 1).padStart(2, "0")} · {it.kind}
            </p>
            <h3 className="wp-name">{it.name}</h3>
            <p className="mono wp-period">{it.period}</p>
            <p className="wp-sum">{it.text}</p>
            <p className="mono wp-tags">{it.tags.join(" · ")}</p>
            <Link href={it.href} className="btn btn-paper">
              {it.cta} <Arrow />
            </Link>
          </div>
          <div className="wp-plate">
            <CaseVisual slug={it.slug} vis={vis} />
            <p className="mono wp-note">{vis.note}</p>
          </div>
        </article>
      ))}
      <aside className="wp wp-also" aria-label={work.alsoTitle}>
        <h3 className="mono">{work.alsoTitle}</h3>
        <ul>
          {work.also.map((a) => (
            <li key={a.name}>
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                {a.name} <Arrow />
              </a>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      </aside>
    </WorkGallery>
  );
}
