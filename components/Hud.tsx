"use client";

import { useEffect, useRef } from "react";

type Props = { marks: { id: string; label: string }[] };

/** Right-edge scroll ruler: progress fill + current scene name. Writes to the DOM directly (no re-renders on scroll). */
export default function Hud({ marks }: Props) {
  const fill = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = marks.map((m) => document.getElementById(m.id));
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      let idx = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) idx = i;
      });
      if (label.current) label.current.textContent = marks[idx].label;
      if (num.current) num.current.textContent = `${String(idx + 1).padStart(2, "0")}/${String(marks.length).padStart(2, "0")}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [marks]);

  return (
    <div className="hud" aria-hidden="true">
      <span ref={num} className="mono hud-num" />
      <div className="hud-rule">
        <div ref={fill} className="hud-fill" />
      </div>
      <span ref={label} className="mono hud-label" />
    </div>
  );
}
