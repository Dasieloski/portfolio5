"use client";

import { useEffect, useRef } from "react";
import type { CardCopy } from "./cardTexture";

type Props = { role: string; name: string; tagline: string; since: string };

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Fixed, click-through canvas that hosts the 3D card. It is a progressive enhancement:
 * the card exists in the HTML as a CSS drawing (see CardSlot) and only gets replaced once Three.js
 * has loaded and drawn its first frame. No WebGL, reduced motion or Save-Data: the CSS card stays.
 */
export default function CardStage({ role, name, tagline, since }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData || !hasWebGL()) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;
    const root = document.documentElement;

    const start = async () => {
      try {
        await document.fonts.ready;
        const { mountCard } = await import("./cardScene");
        if (cancelled) return;
        const cs = getComputedStyle(document.body);
        const copy: CardCopy = {
          role,
          name,
          tagline,
          since,
          fonts: { sans: cs.getPropertyValue("--sans").trim() || "sans-serif", serif: cs.getPropertyValue("--serif").trim() || "serif" },
        };
        dispose = mountCard(canvas, copy);
        // Reason: swap after the first painted frame so the CSS card never disappears into an empty canvas.
        requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && (root.dataset.gl = "1")));
      } catch {
        delete root.dataset.gl;
      }
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      delete root.dataset.gl;
    };
    canvas.addEventListener("webglcontextlost", onLost);

    // Reason: Three.js is the heaviest asset on the page; it waits for the browser to be idle so the hero text paints first.
    const hasIdle = "requestIdleCallback" in window;
    const handle = hasIdle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      canvas.removeEventListener("webglcontextlost", onLost);
      dispose?.();
      delete root.dataset.gl;
    };
  }, [role, name, tagline, since]);

  // Reason: the backdrop is a real painted layer, because mix-blend-mode needs one to blend the headlines against.
  return (
    <>
      <div className="page-backdrop" aria-hidden="true" />
      <canvas ref={ref} className="card-canvas" aria-hidden="true" />
    </>
  );
}
