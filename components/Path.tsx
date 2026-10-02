import type { Dictionary } from "@/content/types";

export default function Path({ path }: { path: Dictionary["path"] }) {
  const e = path.education;
  return (
    <section id="path" className="section section-tint" aria-labelledby="path-title">
      <div className="path">
        <div className="path-lead">
          <h2 id="path-title" className="display reveal">
            {path.title}
          </h2>
          {path.about.map((p) => (
            <p key={p} className="section-intro">
              {p}
            </p>
          ))}
        </div>

        <ol className="ledger">
          {path.rows.map((r) => (
            <li key={r.place}>
              <span className="mono ledger-period">{r.period}</span>
              <div>
                <h3>
                  {r.place} <span>· {r.title}</span>
                </h3>
                <p>{r.text}</p>
              </div>
            </li>
          ))}
          <li className="ledger-edu">
            <span className="mono ledger-period">{e.period}</span>
            <div>
              <h3>
                {e.place} <span>· {e.title}</span>
              </h3>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
