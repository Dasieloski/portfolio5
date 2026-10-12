"use client";

import { useEffect, useRef } from "react";
import type { DialVariant } from "./scene";

/**
 * The engine-turned dial. The HTML always contains a CSS drawing of it (`.dial-fb`), which is what you get with no
 * WebGL2, no JS or Save-Data, and what is on screen until the shader has drawn its first frame. Reduced motion
 * still gets the shader, but as a single still frame.
 */
export default function Dial({ variant }: { variant: DialVariant }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reason: the hero stays pinned behind the page. Once covered, its controls leave the tab order (the text stays readable).
    const hero = variant === "hero" ? box.closest<HTMLElement>(".hero") : null;
    const covered = hero ? new IntersectionObserver(([e]) => hero.querySelectorAll<HTMLElement>("a, button").forEach((el) => (el.tabIndex = e.intersectionRatio < 0.05 ? -1 : 0)), { threshold: [0, 0.05, 1] }) : null;
    covered?.observe(box);

    let dispose: (() => void) | null | undefined;
    let cancelled = false;

    const start = async () => {
      try {
        const { mountDial } = await import("./scene");
        if (cancelled) return;
        dispose = mountDial(canvas, { variant, animate });
        if (dispose) requestAnimationFrame(() => !cancelled && box.setAttribute("data-ready", ""));
      } catch {
        box.removeAttribute("data-ready");
      }
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      box.removeAttribute("data-ready");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    // Reason: the hero dial starts at once (it is the first impression); the closing one waits until it is near.
    if (variant === "hero") {
      const idle = "requestIdleCallback" in window;
      const h = idle ? window.requestIdleCallback(start, { timeout: 600 }) : window.setTimeout(start, 120);
      return () => {
        covered?.disconnect();
        cancelled = true;
        if (idle) window.cancelIdleCallback(h);
        else clearTimeout(h);
        canvas.removeEventListener("webglcontextlost", onLost);
        dispose?.();
      };
    }
    const io: IntersectionObserver = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(box);
    return () => {
      cancelled = true;
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      dispose?.();
    };
  }, [variant]);

  return (
    <div ref={wrap} className={`dial dial-${variant}`} aria-hidden="true">
      <div className="dial-fb" />
      <canvas ref={ref} />
    </div>
  );
}
