"use client";

import { Fragment, useEffect, useRef } from "react";

const REST = 560;
const PEAK = 840;
const RADIUS = 220;

/**
 * Headline whose variable-font weight swells around the pointer.
 * Characters are real text (SR reads the aria-label'd heading once); animation is skipped for reduced motion / touch.
 */
export default function HeroTitle({ line1, line2 }: { line1: string; line2: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-c]"));
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      for (const c of chars) {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / RADIUS);
        c.style.fontWeight = String(Math.round(REST + (PEAK - REST) * t * t));
      }
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      for (const c of chars) c.style.fontWeight = "";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const words = (line: string, offset: number) =>
    line.split(" ").map((w, wi, all) => (
      <Fragment key={`${offset}-${wi}`}>
        <span className="hw" aria-hidden="true">
          {Array.from(w).map((ch, ci) => (
            <span
              data-c
              key={ci}
              className="hc"
              style={{ animationDelay: `${(offset + wi * 4 + ci) * 28}ms` }}
            >
              {ch}
            </span>
          ))}
        </span>
        {wi < all.length - 1 ? " " : ""}
      </Fragment>
    ));

  return (
    <h1 ref={root} className="hero-title" aria-label={`${line1} ${line2}`}>
      <span className="hl">{words(line1, 0)}</span>
      <span className="hl hl-alt">{words(line2, 12)}</span>
    </h1>
  );
}
