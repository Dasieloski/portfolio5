"use client";

import { useEffect, useRef } from "react";

type Props = { label: string; loading: string };

/**
 * The fixed WebGL layer behind every page, plus the opening counter. Three.js is imported after first paint; the
 * counter tracks the real steps (module loaded, scene compiled) and lifts as soon as the tokens can burst out.
 * Without JS, with reduced motion or after a hard timeout the counter never blocks the page.
 */
export default function Cinema({ label, loading }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let engine: { dispose: () => void } | null = null;
    let cancelled = false;
    let target = 12;
    let shown = 0;
    let raf = 0;

    const done = () => {
      root.classList.add("ready");
      cancelAnimationFrame(raf);
    };
    const tick = () => {
      shown += (target - shown) * 0.16 + 0.9;
      if (shown > target) shown = target;
      if (count.current) count.current.textContent = String(Math.floor(shown)).padStart(3, "0");
      if (shown >= 100) return done();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Reason: never hold the page hostage to a slow GPU or a failed import.
    const timeout = window.setTimeout(() => (target = 100), 1200);

    (async () => {
      try {
        const { createCinema } = await import("./engine");
        if (cancelled) return;
        target = 70;
        engine = createCinema(el, { reduced, mobile: window.matchMedia("(max-width: 860px)").matches });
        if (engine) root.classList.add("gl");
      } finally {
        target = 100;
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      engine?.dispose();
      root.classList.remove("gl");
    };
  }, []);

  return (
    <>
      <div className="cinema" aria-hidden="true">
        <canvas ref={canvas} className="cinema-canvas" role="img" aria-label={label} />
      </div>
      <div ref={loader} className="loader" aria-hidden="true">
        <span className="loader-label mono">
          Dasiel Torres <span>{loading}</span>
        </span>
        <span ref={count} className="loader-count">
          000
        </span>
      </div>
    </>
  );
}
