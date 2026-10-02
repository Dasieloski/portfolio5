import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import { Arrow } from "./Arrow";

export default function Work({ lang, work }: { lang: Locale; work: Dictionary["work"] }) {
  const f = work.featured;
  return (
    <section id="work" className="section section-dark" aria-labelledby="work-title">
      <header className="section-head">
        <h2 id="work-title" className="display reveal">
          {work.title}
        </h2>
        <p className="section-intro">{work.intro}</p>
      </header>

      <ol className="rows">
        <li className="row row-featured">
          <Link href={`/${lang}#contact`} className="row-link">
            <span className="row-n mono">01</span>
            <span className="row-name">{f.name}</span>
            <span className="row-meta">
              <span className="row-kind">{f.kind}</span>
              <span className="mono">{f.period}</span>
            </span>
            <span className="row-more">
              <span className="row-more-inner">
                <span className="row-text">{f.text}</span>
                <span className="row-tags mono">{f.tags.join(" · ")}</span>
                <span className="row-cta">
                  {f.cta} <Arrow />
                </span>
              </span>
            </span>
          </Link>
        </li>
        {work.cases.map((c, i) => (
          <li key={c.slug} className="row">
            <Link href={`/${lang}/work/${c.slug}`} className="row-link">
              <span className="row-n mono">{String(i + 2).padStart(2, "0")}</span>
              <span className="row-name">{c.name}</span>
              <span className="row-meta">
                <span className="row-kind">{c.kind}</span>
                <span className="mono">{c.period}</span>
              </span>
              <span className="row-more">
                <span className="row-more-inner">
                  <span className="row-text">{c.summary}</span>
                  <span className="row-tags mono">{c.stack.join(" · ")}</span>
                  <span className="row-cta">
                    {work.caseCta} <Arrow />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="also">
        <h3 className="mono">{work.alsoTitle}</h3>
        <ul>
          {work.also.map((a) => (
            <li key={a.name}>
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                <strong>{a.name}</strong> <Arrow />
              </a>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
