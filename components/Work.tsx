import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import { Arrow } from "./Arrow";
import Roll from "./Roll";
import CaseVisual from "./visuals/CaseVisual";

type Props = { lang: Locale; work: Dictionary["work"]; vis: Dictionary["vis"]; mustHold: string };

const num = (i: number) => String(i + 1).padStart(2, "0");

/** A black opening band with the index, then one spread per product: sticky text on one side, its own interactive illustration on the other. */
export default function Work({ lang, work, vis, mustHold }: Props) {
  const main = work.cases.filter((c) => c.tier === "main");
  const earlier = work.cases.filter((c) => c.tier === "earlier");

  return (
    <section id="work" className="work solid" aria-labelledby="work-title">
      <div className="work-band">
        <div className="wrap">
          <p className="mono work-no">02</p>
          <h2 id="work-title" className="work-title">
            {work.title} <em>{work.titleEm}</em>
          </h2>
          <p className="work-intro">{work.intro}</p>

          <ol className="idx">
            {main.map((c, i) => (
              <li key={c.slug}>
                <a href={`#p-${c.slug}`} className="idx-row">
                  <span className="mono idx-n">{num(i)}</span>
                  <span className="idx-name">{c.name}</span>
                  <span className="idx-must">{c.invariant}</span>
                  <span className="idx-go" aria-hidden="true">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="wrap">
        {main.map((c, i) => (
          <article key={c.slug} id={`p-${c.slug}`} className={`proj${i % 2 ? " is-flip" : ""}`} aria-labelledby={`h-${c.slug}`}>
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
              <Link href={`/${lang}/work/${c.slug}`} className="btn btn-line">
                <Roll>{work.caseCta}</Roll>
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
