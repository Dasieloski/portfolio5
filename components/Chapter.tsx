"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DiagramText } from "@/content/diagrams";
import Diagram from "./diagrams/Diagram";
import Roll from "./Roll";

type Head = { name: string; meta: string; mustHold: string; invariant: string; summary: string; cta: string; href: string };
type Props = { id?: string; slug: string; text: DiagramText; note: string; label: string; stepsLabel: string; head?: Head };

const FALLBACK_TOP = 104;

/**
 * One project, told in as many steps as its rule has. While the chapter is on screen the diagram plate stays put
 * and scroll advances the steps; the rail below does the same with taps, clicks and the keyboard.
 */
export default function Chapter({ id, slug, text, note, label, stepsLabel, head }: Props) {
  const n = text.steps.length;
  // Reason: without JS or with reduced motion the diagram rests on its completed state, which is the informative one.
  const [step, setStep] = useState(n - 1);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // Reason: the plate sticks at a CSS-defined offset (it centres itself on tall screens); scroll maths must read that same value.
  const top = () => (stage.current ? parseFloat(getComputedStyle(stage.current).top) || FALLBACK_TOP : FALLBACK_TOP);

  useEffect(() => {
    const t = track.current;
    if (!t || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    t.classList.add("is-live");
    const st = ScrollTrigger.create({
      trigger: t,
      start: () => `top top+=${top()}`,
      end: "bottom bottom",
      onRefresh: (self) => setStep(Math.min(n - 1, Math.floor(self.progress * n))),
      onUpdate: (self) => setStep(Math.min(n - 1, Math.floor(self.progress * n))),
    });
    return () => {
      st.kill();
      t.classList.remove("is-live");
    };
  }, [n]);

  const go = (i: number) => {
    const t = track.current;
    if (!t || !t.classList.contains("is-live")) return setStep(i);
    const span = t.offsetHeight - window.innerHeight + top();
    window.scrollTo({ top: window.scrollY + t.getBoundingClientRect().top - top() + ((i + 0.5) / n) * span, behavior: "smooth" });
  };

  return (
    <article id={id} className={`chapter${head ? "" : " is-bare"}`} aria-label={head?.name ?? label} style={{ "--n": n } as CSSProperties}>
      {head && (
        <header className="ch-head">
          <h3 className="ch-name">{head.name}</h3>
          <p className="ch-meta">{head.meta}</p>
          <p className="ch-must">
            <span className="mono">{head.mustHold}</span>
            {head.invariant}
          </p>
          <p className="ch-sum">{head.summary}</p>
          <Link href={head.href} className="btn btn-ghost">
            <Roll>{head.cta}</Roll>
            <span className="btn-ico" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M2 10 10 2M10 2H4M10 2v6" />
              </svg>
            </span>
            <span className="sr"> - {head.name}</span>
          </Link>
        </header>
      )}

      <div ref={track} className="ch-track">
        <div ref={stage} className="ch-stage">
          <figure className="ch-plate">
            <div className="bezel">
              <div className="bezel-core">
                <Diagram slug={slug} step={step} text={text} label={label} />
              </div>
            </div>
            <figcaption className="ch-cap">
              <div className="ch-lines" aria-live="polite">
                {text.steps.map((s, i) => (
                  <p key={s} data-on={i === step} aria-hidden={i !== step}>
                    {s}
                  </p>
                ))}
              </div>
              <ol className="ch-rail" aria-label={stepsLabel}>
                {text.steps.map((s, i) => (
                  <li key={s}>
                    <button type="button" onClick={() => go(i)} aria-label={`${i + 1}. ${s}`} aria-current={i === step ? "step" : undefined} data-done={i <= step} />
                  </li>
                ))}
              </ol>
              <p className="ch-note mono">{note}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}
