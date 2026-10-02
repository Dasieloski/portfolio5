"use client";

import { useEffect, useRef } from "react";

/** Trailing ring for mouse users only. Grows over interactive elements; never hides the native cursor. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ring.current!;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.on = "true";
      const t = e.target as HTMLElement | null;
      el.dataset.hot = t?.closest("a, button, summary, [data-cursor], input") ? "true" : "false";
    };
    const leave = () => (el.dataset.on = "false");
    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      el.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ring} className="cursor" aria-hidden="true" />;
}
