"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";

/** Sticky layer index on desktop that follows the scroll; plain stacked panels on phones. */
export default function Stack({ stack }: { stack: Dictionary["stack"] }) {
  const [active, setActive] = useState(stack.layers[0].id);
  const panels = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id.replace("layer-", ""));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    panels.current.forEach((p) => p && io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="stack">
        <div className="stack-side">
          <h2 id="stack-title" className="display reveal">
            {stack.title}
          </h2>
          <p className="section-intro">{stack.intro}</p>
          <ol className="stack-index" aria-hidden="true">
            {stack.layers.map((l, i) => (
              <li key={l.id} data-on={l.id === active}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span> {l.name}
              </li>
            ))}
          </ol>
        </div>

        <div className="stack-panels">
          {stack.layers.map((l, i) => (
            <article
              key={l.id}
              id={`layer-${l.id}`}
              ref={(el) => {
                if (el) panels.current[i] = el;
              }}
              className="panel"
              data-on={l.id === active}
            >
              <p className="panel-n mono">
                {String(i + 1).padStart(2, "0")} / {l.name}
              </p>
              <h3 className="panel-claim">{l.claim}</h3>
              <ul className="panel-points">
                {l.points.map((p) => (
                  <li key={p.text}>
                    <span>{p.text}</span>
                    <span className="ref mono">{p.ref}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
