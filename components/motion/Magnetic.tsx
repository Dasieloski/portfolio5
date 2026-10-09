"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Nudges its child toward the pointer when it is near. Fine pointers only; off with reduced motion. */
export default function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) * 0.9;
      if (Math.hypot(dx, dy) > reach) {
        el.style.transform = "";
        return;
      }
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const leave = () => (el.style.transform = "");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
