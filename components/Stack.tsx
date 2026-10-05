import type { Dictionary } from "@/content/types";

/** The layers a product needs, each backed by the projects where I had to get it right. */
export default function Stack({ stack }: { stack: Dictionary["stack"] }) {
  return (
    <section id="stack" className="section stack-sec" aria-labelledby="stack-title">
      <header className="section-head">
        <h2 id="stack-title" className="display">
          {stack.title}
        </h2>
        <p className="section-intro">{stack.intro}</p>
      </header>

      <ol className="anat">
        {stack.layers.map((l, i) => (
          <li key={l.id} className="anat-row">
            <div>
              <p className="anat-n mono">
                {String(i + 1).padStart(2, "0")} / {l.name}
              </p>
              <h3 className="anat-claim">{l.claim}</h3>
            </div>
            <ul className="anat-points">
              {l.points.map((p) => (
                <li key={p.text}>
                  <span>{p.text}</span>
                  <span className="ref mono">{p.ref}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
