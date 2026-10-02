import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import { Arrow } from "./Arrow";
import PhoneScene from "./visuals/PhoneScene";
import CaseVisual from "./visuals/CaseVisual";

export default function Work({ lang, work, vis }: { lang: Locale; work: Dictionary["work"]; vis: Dictionary["vis"] }) {
  const f = work.featured;

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <header className="work-intro">
        <h2 id="work-title" className="h2">
          {work.title}
        </h2>
        <p>{work.intro}</p>
      </header>

      <PhoneScene
        t={vis.pay}
        note={vis.note}
        head={{ n: "01", name: f.name, kind: f.kind, period: f.period, text: f.text, cta: f.cta, href: `/${lang}#contact` }}
      />

      {work.cases.map((c, i) => (
        <article key={c.slug} className="scene" data-side={i % 2 ? "right" : "left"}>
          <div className="scene-text">
            <p className="label">
              {String(i + 2).padStart(2, "0")} · {c.kind}
            </p>
            <h3 className="scene-name">{c.name}</h3>
            <p className="scene-sum">{c.summary}</p>
            <Link href={`/${lang}/work/${c.slug}`} className="link-arrow">
              {work.caseCta} <Arrow />
            </Link>
            <p className="label scene-meta">{c.period}</p>
          </div>
          <div className="scene-visual">
            <CaseVisual slug={c.slug} vis={vis} />
            <p className="label scene-note">{vis.note}</p>
          </div>
        </article>
      ))}

      <aside className="also" aria-label={work.alsoTitle}>
        <h3 className="label">{work.alsoTitle}</h3>
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
    </section>
  );
}
