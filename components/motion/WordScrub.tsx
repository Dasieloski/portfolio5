"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = { text: string; emphasis?: string[]; className?: string };

/** A statement that fills in word by word as it scrolls through the viewport. Fully visible without JS or with reduced motion. */
export default function WordScrub({ text, emphasis = [], className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const words = el.querySelectorAll<HTMLElement>(".ws-w");
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 46%", scrub: 0.4 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Reason: emphasized phrases keep their italic across the per-word spans; `sp` keeps punctuation glued to its word.
  const tokens: { w: string; em: boolean; sp: boolean }[] = [];
  const flat = emphasis.filter((e) => text.includes(e));
  let rest = text;
  while (rest.length) {
    const hit = flat.map((e) => ({ e, i: rest.indexOf(e) })).filter((h) => h.i >= 0).sort((a, b) => a.i - b.i)[0];
    const chunk = hit ? rest.slice(0, hit.i) : rest;
    chunk.split(/\s+/).filter(Boolean).forEach((w) => tokens.push({ w, em: false, sp: true }));
    if (!hit) break;
    const parts = hit.e.split(/\s+/);
    rest = rest.slice(hit.i + hit.e.length);
    parts.forEach((w, k) => tokens.push({ w, em: true, sp: k < parts.length - 1 || /^\s/.test(rest) || rest === "" }));
  }

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <span key={i} className={`ws-w${t.em ? " is-em" : ""}`}>
          {t.w}
          {t.sp ? " " : ""}
        </span>
      ))}
    </p>
  );
}
