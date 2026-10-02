"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

/**
 * Loads the WebGL stack only when it can run well (WebGL available, no reduced-motion preference)
 * and only after the page is interactive. Until then — and always as fallback — the SVG art in each stage shows.
 */
export default function Scene({ names }: { names: string[] }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
    } catch {
      return;
    }
    const start = () => setShow(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 400);
    return () => clearTimeout(id);
  }, []);

  const ready = useCallback(() => {
    document.documentElement.dataset.scene = "on";
  }, []);

  useEffect(() => () => {
    delete document.documentElement.dataset.scene;
  }, []);

  return show ? <SceneCanvas names={names} onReady={ready} /> : null;
}
