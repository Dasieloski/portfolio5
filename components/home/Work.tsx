import Link from "next/link";
import type { CaseStudy, Dictionary } from "@/content/types";
import { caseSide, litVector } from "@/content/stage";
import type { Locale } from "@/lib/site";
import { Arrow } from "../Arrow";
import Roll from "../Roll";
import Scramble from "../motion/Scramble";

type Props = { lang: Locale; t: Dictionary["work"]; layerNames: string[] };

/** One full-screen shot per product: the tokens become its emblem on one side, the story sits on the other. */
function Shot({ c, i, lang, t, layerNames }: { c: CaseStudy; i: number; lang: Locale; t: Dictionary["work"]; layerNames: string[] }) {
  const lit = litVector(c.slug);
  return (
    <article id={`case-${c.slug}`} className="shot" data-scene="case" data-slug={c.slug} data-i={i} data-side={caseSide(i)} aria-labelledby={`n-${c.slug}`}>
      <div className="shot-card" data-rv>
        <p className="shot-kind mono">{c.kind}</p>
        <h3 id={`n-${c.slug}`} className="shot-name">
          {c.name}
        </h3>
        <p className="rule">{c.invariant}</p>
        <p className="shot-sum">{c.summary}</p>
        <dl className="shot-facts">
          <div>
            <dt className="mono">{t.myPart}</dt>
            <dd>{c.contribution}</dd>
          </div>
          {c.stack.length > 0 && (
            <div>
              <dt className="mono">{t.stackLabel}</dt>
              <dd>{c.stack.join(", ")}</dd>
            </div>
          )}
          <div>
            <dt className="mono">{t.layersLabel}</dt>
            <dd>
              <ul className="chips">
                {layerNames.map((name, k) => (
                  <li key={name} className={lit[k] ? "is-on" : undefined}>
                    {name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <Link className="link-arrow" href={`/${lang}/work/${c.slug}`}>
          <span className="ring" aria-hidden="true">
            <Arrow />
          </span>
          <Roll text={t.caseCta} />
        </Link>
      </div>
    </article>
  );
}

export default function Work({ lang, t, layerNames }: Props) {
  const main = t.cases.filter((c) => c.tier === "main");
  const earlier = t.cases.filter((c) => c.tier === "earlier");
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <header className="work-head" data-scene="calm" data-chapter="work">
        <h2 id="work-title" className="display">
          <Scramble text={t.title} />
        </h2>
        <p className="lead" data-rv>
          {t.intro}
        </p>
      </header>

      {main.map((c, i) => (
        <Shot key={c.slug} c={c} i={i} lang={lang} t={t} layerNames={layerNames} />
      ))}

      <div className="more" data-scene="calm" data-chapter="work">
        <h3 className="more-title">{t.moreTitle}</h3>
        <ul className="more-list">
          {earlier.map((c) => (
            <li key={c.slug} data-rv>
              <Link href={`/${lang}/work/${c.slug}`} className="more-row">
                <span className="more-name">
                  <Roll text={c.name} />
                </span>
                <span className="more-kind">{c.kind}</span>
                <span className="more-meta mono">{c.period}</span>
                <span className="more-ico" aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
          {t.also.map((a) => (
            <li key={a.name} data-rv>
              <a href={a.url} className="more-row" target="_blank" rel="noopener noreferrer">
                <span className="more-name">
                  <Roll text={a.name} />
                </span>
                <span className="more-kind">{a.text}</span>
                <span className="more-meta mono">{t.live}</span>
                <span className="more-ico is-out" aria-hidden="true">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
