"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Visuals } from "@/content/types";
import { Arrow } from "../Arrow";

type Props = {
  t: Visuals["pay"];
  note: string;
  head: { n: string; name: string; kind: string; period: string; text: string; cta: string; href: string };
};

/** Pinned scene: scrolling advances one payment through six steps on a phone screen. */
export default function PhoneScene({ t, note, head }: Props) {
  const scene = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scene.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      setActive(Math.min(t.nodes.length - 1, Math.floor(p * t.nodes.length)));
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
  }, [t.nodes.length]);

  const node = t.nodes[active];

  return (
    <div ref={scene} className="phone-scene">
      <div className="phone-pin">
        <div className="scene-text">
          <p className="label">
            {head.n} · {head.kind}
          </p>
          <h3 className="scene-name">{head.name}</h3>
          <p className="scene-sum">{head.text}</p>
          <Link href={head.href} className="link-arrow">
            {head.cta} <Arrow />
          </Link>
          <p className="label scene-meta">{head.period}</p>
        </div>

        <div className="phone" role="img" aria-label={`${t.title}: ${t.nodes.map((n) => n.label).join(" → ")}`}>
          <div className="phone-screen">
            <p className="label">{t.title}</p>
            <div className="phone-amount">
              <span className="label">{t.amount}</span>
              <i />
            </div>
            <ol className="phone-steps">
              {t.nodes.map((n, i) => (
                <li key={n.label} data-state={i < active ? "done" : i === active ? "now" : "next"}>
                  <b aria-hidden="true" />
                  <span>{n.label}</span>
                </li>
              ))}
            </ol>
            <p className="phone-status">{node.status}</p>
          </div>
        </div>

        <div className="scene-aside" aria-live="polite">
          <p className="label">
            {String(active + 1).padStart(2, "0")} / {String(t.nodes.length).padStart(2, "0")}
          </p>
          <p className="aside-big">{node.label}</p>
          <p>{node.text}</p>
          <p className="label aside-note">{note}</p>
        </div>
      </div>
    </div>
  );
}
