"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";
import StageArt from "./scene/StageArt";

/** Layer panels scroll on the left; the 3D stack (pinned stage on the right) highlights the active layer. */
export default function Stack({ stack }: { stack: Dictionary["stack"] }) {
  const [active, setActive] = useState(0);
  const panels = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(stack.layers.findIndex((l) => `layer-${l.id}` === e.target.id));
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    panels.current.forEach((p) => p && io.observe(p));
    return () => io.disconnect();
  }, [stack.layers]);

  // Reason: the WebGL scene lives outside React; a window event is the lightest link between them.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("layer", { detail: active }));
  }, [active]);
  useEffect(
    () => () => {
      window.dispatchEvent(new CustomEvent("layer", { detail: -1 }));
    },
    [],
  );

  return (
    <section id="stack" className="section stack-sec" aria-labelledby="stack-title">
      <header className="section-head">
        <h2 id="stack-title" className="display">
          {stack.title}
        </h2>
        <p className="section-intro">{stack.intro}</p>
      </header>

      <div className="stack">
        <div className="stack-stage-wrap">
          <div className="stage stack-stage" data-stage="stack">
            <StageArt />
          </div>
          <ol className="stack-index" aria-hidden="true">
            {stack.layers.map((l, i) => (
              <li key={l.id} data-on={i === active}>
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
              data-on={i === active}
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
