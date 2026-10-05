"use client";

import { useEffect, useRef } from "react";

export const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Calls `onSeen` once, the first time the element is at least half visible. Returns the ref to attach. */
export function useOnceInView<T extends Element>(onSeen: () => void, threshold = 0.5) {
  const ref = useRef<T>(null);
  const cb = useRef(onSeen);
  useEffect(() => {
    cb.current = onSeen;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        cb.current();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Collects timeout ids so a replay or unmount can cancel everything in flight. */
export function useTimers() {
  const ids = useRef<number[]>([]);
  const clear = () => {
    ids.current.forEach(window.clearTimeout);
    ids.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    ids.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => clear, []);
  return { later, clear };
}

/**
 * Scroll-linked progress for an animation stage: 0 when it enters near the bottom of the viewport,
 * 1 once it has settled around the middle. `onP` runs on animation frames while scrolling, so it should
 * only touch the DOM or set cheap, rarely-changing state.
 */
export function useScrub<T extends HTMLElement>(onP: (p: number) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(onP);
  useEffect(() => {
    cb.current = onP;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Reason: p = 0 when the stage top is at 90% of the viewport; p = 1 when its bottom reaches 65%.
      const p = (vh * 0.9 - r.top) / (vh * 0.25 + r.height);
      cb.current(Math.min(1, Math.max(0, p)));
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);
  return ref;
}
