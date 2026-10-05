import Link from "next/link";
import type { Dictionary } from "@/content/types";

type Props = { path: Dictionary["path"]; /** Place name → internal URL, for entries that have their own case study. */ links?: Record<string, string> };

export default function Path({ path, links = {} }: Props) {
  const e = path.education;
  const entries = [...path.rows.map((r) => ({ period: r.period, place: r.place, title: r.title, text: r.text })), { period: e.period, place: e.place, title: e.title, text: "" }];

  return (
    <section id="path" className="section section-tint" aria-labelledby="path-title">
      <div className="path">
        <div className="path-lead">
          <h2 id="path-title" className="h2">
            {path.title}
          </h2>
          {path.about.map((p) => (
            <p key={p} className="section-intro">
              {p}
            </p>
          ))}
          <p className="label profile-title">{path.profile.title}</p>
          <dl className="profile">
            {path.profile.rows.map((r) => (
              <div key={r.k}>
                <dt className="label">{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="ledger">
          {entries.map((r) => (
            <li key={r.place}>
              <span className="mono ledger-period">{r.period}</span>
              <h3>{links[r.place] ? <Link href={links[r.place]}>{r.place}</Link> : r.place}</h3>
              <span className="ledger-role">{r.title}</span>
              {r.text && <p className="ledger-text">{r.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
