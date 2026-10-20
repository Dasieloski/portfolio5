"use client";

import { useEffect, useRef } from "react";

/**
 * A figure that counts up to its value the first time it scrolls into view. Years start a few steps back instead of
 * from zero, so "2023" ticks through recent years. Server-rendered as the final value; reduced motion skips it.
 */
export default function Counter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const end = Number(value);
    if (!el || !Number.isFinite(end) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const from = end >= 1000 ? end - 12 : 0;
    // Reason: show the starting figure before it scrolls into view, so it never flashes the final value first.
    el.textContent = String(from);
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = String(Math.round(from + (end - from) * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        run();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
