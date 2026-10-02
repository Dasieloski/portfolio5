"use client";

import { useRef } from "react";

/** Pulls its child toward the pointer. Inert on touch and with reduced motion. */
export default function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span ref={ref} className="magnetic" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}
