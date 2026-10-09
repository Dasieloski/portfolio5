"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/content/types";

const pad = (i: number) => String(i + 1).padStart(2, "0");
const TOP = 56;

/**
 * The layers of a product as a stack of slabs that pulls apart while you scroll, one layer at a time.
 * Each layer's claim and evidence (the projects where it mattered) show beside it. Buttons give the same control
 * by keyboard, and without JS or with reduced motion it is a plain, exploded, clickable diagram.
 */
export default function Anatomy({ stack }: { stack: Dictionary["stack"] }) {
  const n = stack.layers.length;
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = track.current;
    const s = stage.current;
    if (!t || !s || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    // Reason: a class, not state, so enabling the scroll mode does not trigger an extra render.
    t.classList.add("is-live");
    s.style.setProperty("--spread", "0");
    let last = -1;
    const st = ScrollTrigger.create({
      trigger: t,
      start: `top top+=${TOP}`,
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        // Reason: the stack opens during the first fifth of the scroll, then each layer gets an equal share.
        const open = Math.min(1, p / 0.2);
        s.style.setProperty("--spread", String(1 - (1 - open) ** 3));
        const idx = Math.min(n - 1, Math.max(0, Math.floor(((p - 0.14) / 0.86) * n)));
        if (idx !== last) {
          last = idx;
          setActive(idx);
        }
      },
    });
    return () => {
      st.kill();
      s.style.removeProperty("--spread");
      t.classList.remove("is-live");
    };
  }, [n]);

  const go = (i: number) => {
    setActive(i);
    const t = track.current;
    if (!t || !t.classList.contains("is-live")) return;
    const r = t.getBoundingClientRect();
    const span = t.offsetHeight - window.innerHeight + TOP;
    const p = Math.min(1, 0.14 + ((i + 0.5) / n) * 0.86);
    window.scrollTo({ top: window.scrollY + r.top - TOP + p * span, behavior: "smooth" });
  };

  const layer = stack.layers[active];

  return (
    <section id="stack" className="stack-sec solid" aria-labelledby="stack-title">
      <div ref={track} className="anat-track" style={{ "--n": n } as CSSProperties}>
        <div ref={stage} className="anat-stage">
          <header className="anat-head">
            <p className="mono">03</p>
            <h2 id="stack-title" className="anat-title">
              {stack.title}
            </h2>
            <p className="anat-intro">{stack.intro}</p>
            <p className="label anat-hint">{stack.hint} ↓</p>
          </header>

          <div className="slabs" aria-hidden="true">
            {stack.layers.map((l, i) => (
              <div key={l.id} className="slab" data-on={i === active} style={{ "--k": n - 1 - i } as CSSProperties}>
                <span className="mono">{pad(i)}</span>
                <span className="slab-name">{l.name}</span>
              </div>
            ))}
          </div>

          <div className="anat-side">
            <ol className="anat-nav" aria-label={stack.layersLabel}>
              {stack.layers.map((l, i) => (
                <li key={l.id}>
                  <button type="button" onClick={() => go(i)} aria-current={i === active ? "true" : undefined}>
                    <span className="mono">{pad(i)}</span> {l.name}
                  </button>
                </li>
              ))}
            </ol>
            <div className="anat-panel" key={layer.id}>
              <p className="mono anat-n">
                {pad(active)} / {layer.name}
              </p>
              <h3 className="anat-claim">{layer.claim}</h3>
              <ul className="anat-points">
                {layer.points.map((p) => (
                  <li key={p.text}>
                    <span>{p.text}</span>
                    <span className="ref mono">{p.ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
