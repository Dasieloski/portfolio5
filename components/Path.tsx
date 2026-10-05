import type { Dictionary } from "@/content/types";

export default function Path({ path }: { path: Dictionary["path"] }) {
  const e = path.education;
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
        </div>

        <ol className="ledger">
          {[...path.rows.map((r) => ({ period: r.period, place: r.place, title: r.title })), { period: e.period, place: e.place, title: e.title }].map((r) => (
            <li key={r.place}>
              <span className="mono ledger-period">{r.period}</span>
              <h3>{r.place}</h3>
              <span className="ledger-role">{r.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
