import Link from "next/link";
import type { Dictionary } from "@/content/types";
import Timeline from "./motion/Timeline";

type Props = {
  path: Dictionary["path"];
  /** Place name → internal URL, for entries that have their own case study. */
  links?: Record<string, string>;
  /** slug → { name, href } for the case studies an entry can point to. */
  cases?: Record<string, { name: string; href: string }>;
};

export default function Path({ path, links = {}, cases = {} }: Props) {
  const e = path.education;
  const entries = [
    ...path.rows.map((r) => ({ period: r.period, place: r.place, title: r.title, text: r.text, caseSlugs: r.caseSlugs ?? [] })),
    { period: e.period, place: e.place, title: e.title, text: "", caseSlugs: [] as string[] },
  ];

  return (
    <section id="path" className="path-sec solid" aria-labelledby="path-title">
      <div className="wrap path">
        <div className="path-lead">
          <p className="mono">04</p>
          <h2 id="path-title" className="path-title">
            {path.title}
          </h2>
          {path.about.map((p) => (
            <p key={p} className="path-about">
              {p}
            </p>
          ))}
        </div>

        <Timeline>
          <ol className="ledger">
            {entries.map((r) => (
              <li key={r.place}>
                <span className="tl-node" aria-hidden="true" />
                <span className="mono ledger-period">{r.period}</span>
                <h3>{links[r.place] ? <Link href={links[r.place]}>{r.place}</Link> : r.place}</h3>
                <span className="ledger-role">{r.title}</span>
                {r.text && <p className="ledger-text">{r.text}</p>}
                {r.caseSlugs.length > 0 && (
                  <ul className="ledger-cases">
                    {r.caseSlugs.map((s) =>
                      cases[s] ? (
                        <li key={s}>
                          <Link href={cases[s].href} className="chip">
                            {cases[s].name}
                          </Link>
                        </li>
                      ) : null,
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Timeline>
      </div>
    </section>
  );
}
