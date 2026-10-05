import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import { Arrow } from "./Arrow";
import CaseVisual from "./visuals/CaseVisual";

type Props = { lang: Locale; work: Dictionary["work"]; vis: Dictionary["vis"]; mustHold: string };

const num = (i: number) => String(i + 1).padStart(2, "0");

/** An index grid first (the whole picture), then one editorial spread per product with its own animation. */
export default function Work({ lang, work, vis, mustHold }: Props) {
  const main = work.cases.filter((c) => c.tier === "main");
  const earlier = work.cases.filter((c) => c.tier === "earlier");

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="work-head">
          <h2 id="work-title" className="h2">
            {work.title} <em>{work.titleEm}</em>
          </h2>
          <p className="label work-intro">{work.intro}</p>
        </header>

        <ol className="idx">
          {main.map((c, i) => (
            <li key={c.slug}>
              <a href={`#p-${c.slug}`} className="idx-cell">
                <span className="idx-n">{num(i)}</span>
                <span className="idx-body">
                  <span className="idx-name">{c.name}</span>
                  <span className="idx-must">{c.invariant}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>

        {main.map((c, i) => (
          <article key={c.slug} id={`p-${c.slug}`} className="proj" aria-labelledby={`h-${c.slug}`}>
            <div className="proj-text">
              <p className="proj-n" aria-hidden="true">
                {num(i)}
              </p>
              <h3 id={`h-${c.slug}`} className="proj-name">
                {c.name}
              </h3>
              <p className="label proj-kind">
                {c.kind}
                {c.period ? ` · ${c.period}` : ""}
              </p>
              <p className="proj-must">
                <span className="label">{mustHold}</span>
                {c.invariant}
              </p>
              <p className="proj-sum">{c.summary}</p>
              <Link href={`/${lang}/work/${c.slug}`} className="link-arrow label">
                {work.caseCta}
                <span className="sr"> — {c.name}</span> <Arrow />
              </Link>
            </div>
            <div className="proj-plate">
              <CaseVisual slug={c.slug} vis={vis} />
              <p className="label wp-note">{vis.note}</p>
            </div>
          </article>
        ))}

        <aside className="also" aria-label={work.earlierTitle}>
          <div className="also-group">
            <h3 className="label">{work.earlierTitle}</h3>
            <ul>
              {earlier.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${lang}/work/${c.slug}`}>
                    {c.name} <Arrow />
                  </Link>
                  <span className="label">{c.kind}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="also-group">
            <h3 className="label">{work.alsoTitle}</h3>
            <ul>
              {work.also.map((a) => (
                <li key={a.name}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer">
                    {a.name} <Arrow />
                  </a>
                  <span className="label">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
