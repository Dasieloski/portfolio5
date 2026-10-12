import type { Dictionary } from "@/content/types";
import { DIAGRAM_NOTE, diagramText } from "@/content/diagrams";
import type { Locale } from "@/lib/site";
import Chapter from "./Chapter";

type Props = { lang: Locale; work: Dictionary["work"]; mustHold: string; stepsLabel: string };

/** The core of the site: each product is a chapter whose diagram is built step by step as you scroll. */
export default function Work({ lang, work, mustHold, stepsLabel }: Props) {
  const main = work.cases.filter((c) => c.tier === "main");
  return (
    <section id="work" className="work dark sheet" aria-labelledby="work-title">
      <div className="wrap">
        <header className="work-head">
          <h2 id="work-title" className="h2">
            {work.title} <em>{work.titleEm}</em>
          </h2>
          <p className="lede">{work.intro}</p>
        </header>

        {main.map((c) => {
          const text = diagramText(lang, c.slug);
          if (!text) return null;
          return (
            <Chapter
              key={c.slug}
              id={`p-${c.slug}`}
              slug={c.slug}
              text={text}
              note={DIAGRAM_NOTE[lang]}
              label={c.name}
              stepsLabel={stepsLabel}
              head={{
                name: c.name,
                meta: `${c.kind} / ${c.role}`,
                mustHold,
                invariant: c.invariant,
                summary: c.summary,
                cta: work.caseCta,
                href: `/${lang}/work/${c.slug}`,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
