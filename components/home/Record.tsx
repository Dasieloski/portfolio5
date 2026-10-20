import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";

type Props = { lang: Locale; t: Dictionary["record"]; cases: Dictionary["work"]["cases"] };

/** Three true figures, then the career as a ledger joined by a line that draws as you read. */
export default function Record({ lang, t, cases }: Props) {
  const name = (slug: string) => cases.find((c) => c.slug === slug)?.name ?? slug;
  return (
    <section id="record" className="record" data-scene="calm" data-chapter="record" aria-labelledby="record-title">
      <header className="record-head">
        <h2 id="record-title" className="display" data-rv>
          {t.title}
        </h2>
        <p className="lead" data-rv>
          {t.intro}
        </p>
      </header>
      <dl className="stats">
        {t.stats.map((s) => (
          <div key={s.k} data-rv>
            <dt>{s.k}</dt>
            <dd>{s.v}</dd>
          </div>
        ))}
      </dl>
      <ol className="ledger">
        {t.rows.map((r) => (
          <li key={r.period + r.place} className="entry" data-rv>
            <p className="entry-period mono">{r.period}</p>
            <div>
              <h3 className="entry-place">{r.place}</h3>
              <p className="entry-title">{r.title}</p>
              <p className="entry-text">{r.text}</p>
              {r.slugs && (
                <ul className="entry-links">
                  {r.slugs.map((s) => (
                    <li key={s}>
                      <Link href={`/${lang}/work/${s}`} className="ulink">
                        {name(s)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
        <li className="entry is-edu" data-rv>
          <p className="entry-period mono">{t.education.period}</p>
          <div>
            <h3 className="entry-place">{t.education.title}</h3>
            <p className="entry-title">{t.education.place}</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
