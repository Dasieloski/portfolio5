"use client";

import { useEffect, useRef } from "react";

type Props = { title: string; intro: string; count: number; children: React.ReactNode };

/**
 * Desktop: the section is pinned and vertical scroll drives a horizontal track.
 * Touch / narrow screens: no pinning, panels simply stack (see sections.css).
 */
export default function WorkGallery({ title, intro, count, children }: Props) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current!;
    const tr = track.current!;
    const mq = window.matchMedia("(min-width: 960px) and (hover: hover)");
    let dist = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / Math.max(1, dist)));
      tr.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (counter.current) {
        const n = Math.min(count, Math.floor(p * count) + 1);
        counter.current.textContent = `${String(n).padStart(2, "0")}/${String(count).padStart(2, "0")}`;
      }
    };
    const measure = () => {
      if (!mq.matches) {
        sec.style.height = "";
        tr.style.transform = "";
        return;
      }
      dist = Math.max(0, tr.scrollWidth - window.innerWidth);
      sec.style.height = `${window.innerHeight + dist}px`;
      update();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <section id="work" ref={section} className="work" aria-labelledby="work-title">
      <div className="work-pin">
        <header className="work-head">
          <h2 id="work-title" className="display">
            {title}
          </h2>
          <p className="section-intro">{intro}</p>
          <span ref={counter} className="mono work-count" aria-hidden="true">
            01/{String(count).padStart(2, "0")}
          </span>
        </header>
        <div ref={track} className="work-track">
          {children}
        </div>
        <div className="work-progress" aria-hidden="true">
          <div ref={bar} />
        </div>
      </div>
    </section>
  );
}
