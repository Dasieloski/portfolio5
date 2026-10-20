import type { Dictionary } from "@/content/types";

/** A calm beat after the products: six layers, each with the tools and the proof, as wide ruled rows. */
export default function Capabilities({ t }: { t: Dictionary["layers"] }) {
  return (
    <section id="layers" className="caps" data-scene="calm" data-chapter="layers" aria-labelledby="caps-title">
      <header className="caps-head">
        <h2 id="caps-title" className="display" data-rv>
          {t.title}
        </h2>
        <p className="lead" data-rv>
          {t.intro}
        </p>
      </header>
      <ol className="caps-list">
        {t.items.map((l, i) => (
          <li key={l.id} className="cap" data-rv>
            <span className="cap-n mono">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="cap-name">{l.name}</h3>
            <div className="cap-body">
              <p className="cap-claim">{l.claim}</p>
              <ul className="cap-points">
                {l.points.map((p) => (
                  <li key={p.text}>
                    {p.text} <span className="mono">{p.ref}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="cap-tools">{l.tools.join(", ")}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
