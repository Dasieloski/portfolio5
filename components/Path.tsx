import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";

type Props = {
  lang: Locale;
  path: Dictionary["path"];
  work: Dictionary["work"];
  lab: Dictionary["lab"];
};

const Arrow = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M2 10 10 2M10 2H4M10 2v6" />
  </svg>
);

/** Experience as a plain ledger, then the quieter work: earlier projects, side projects and the lab. */
export default function Path({ lang, path, work, lab }: Props) {
  const e = path.education;
  const cases = Object.fromEntries(work.cases.map((c) => [c.slug, c]));
  const rows = [
    ...path.rows.map((r) => ({ ...r, slugs: r.caseSlugs ?? [] })),
    { period: e.period, title: e.title, place: e.place, text: "", slugs: [] as string[] },
  ];
  const earlier = work.cases.filter((c) => c.tier === "earlier");

  return (
    <section id="path" className="path light sheet" aria-labelledby="path-title">
      <div className="wrap">
        <header className="path-head">
          <h2 id="path-title" className="h2">
            {path.title}
          </h2>
          {path.about.map((p) => (
            <p key={p} className="lede">
              {p}
            </p>
          ))}
        </header>

        <ol className="ledger">
          {rows.map((r) => (
            <li key={r.place} className="rv">
              <span className="mono ledger-period">{r.period}</span>
              <div className="ledger-who">
                <h3>{r.place}</h3>
                <p>{r.title}</p>
              </div>
              <div className="ledger-what">
                {r.text && <p>{r.text}</p>}
                {r.slugs.length > 0 && (
                  <ul className="chips">
                    {r.slugs.map((s) => (
                      <li key={s}>
                        <Link href={`/${lang}/work/${s}`} className="chip">
                          {cases[s].name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="more">
          <section aria-labelledby="more-earlier" className="rv">
            <h3 id="more-earlier" className="mono">
              {work.earlierTitle}
            </h3>
            <ul>
              {earlier.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${lang}/work/${c.slug}`} className="ulink">
                    {c.name} <Arrow />
                  </Link>
                  <span>{c.kind}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="more-also" className="rv">
            <h3 id="more-also" className="mono">
              {work.alsoTitle}
            </h3>
            <ul>
              {work.also.map((a) => (
                <li key={a.name}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="ulink">
                    {a.name} <Arrow />
                  </a>
                  <span>{a.text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section id="lab" aria-labelledby="more-lab" className="rv">
            <h3 id="more-lab" className="mono">
              {lab.title}
            </h3>
            <ul>
              {lab.items.map((i) => (
                <li key={i.name}>
                  {i.href ? (
                    <a href={i.href} target="_blank" rel="noopener noreferrer" className="ulink">
                      {i.name} <Arrow />
                    </a>
                  ) : (
                    <span className="plain">{i.name}</span>
                  )}
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
