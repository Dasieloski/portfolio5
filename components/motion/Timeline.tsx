"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Wraps a list of entries with a vertical line that draws itself as you scroll, lighting each entry on the way. */
export default function Timeline({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    el.classList.add("is-live");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 62%", scrub: 0.3 } },
      );
      el.querySelectorAll(":scope > ol > li").forEach((li) =>
        ScrollTrigger.create({ trigger: li, start: "top 62%", onToggle: (self) => li.classList.toggle("is-on", self.isActive || self.progress > 0) }),
      );
    }, el);
    return () => {
      ctx.revert();
      el.classList.remove("is-live");
    };
  }, []);

  return (
    <div ref={root} className="tl">
      <span className="tl-line" aria-hidden="true" />
      {children}
    </div>
  );
}
