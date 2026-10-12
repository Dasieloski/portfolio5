"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/types";

/**
 * The layers a product needs, as an accordion: one open at a time, each backed by the projects where it had to be right.
 * It is a button list (keyboard and screen-reader friendly); the open row grows with a grid-rows transition, no layout animation.
 */
export default function Practice({ stack }: { stack: Dictionary["stack"] }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="stack" className="practice light sheet" aria-labelledby="stack-title">
      <div className="wrap practice-grid">
        <header className="practice-head">
          <h2 id="stack-title" className="h2">
            {stack.title}
          </h2>
          <p className="lede">{stack.intro}</p>
        </header>
        <ol className="layers" aria-label={stack.layersLabel}>
          {stack.layers.map((l, i) => {
            const on = i === open;
            return (
              <li key={l.id} className="layer" data-on={on}>
                <h3>
                  <button type="button" id={`l-${l.id}`} aria-expanded={on} aria-controls={`p-${l.id}`} onClick={() => setOpen(on ? -1 : i)}>
                    <span className="layer-name">{l.name}</span>
                    <span className="layer-claim">{l.claim}</span>
                    <span className="layer-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`p-${l.id}`} role="region" aria-labelledby={`l-${l.id}`} className="layer-panel">
                  <ul>
                    {l.points.map((p) => (
                      <li key={p.text}>
                        <span>{p.text}</span>
                        <span className="mono">{p.ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
