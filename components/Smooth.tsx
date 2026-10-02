"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Inertial scrolling on pointer devices only; native scrolling on touch and with reduced motion. */
export default function Smooth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
    document.documentElement.classList.add("lenis");
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}
