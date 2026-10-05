"use client";

import { useRef, useState } from "react";
import type { Visuals } from "@/content/types";
import { useScrub } from "./hooks";

const ROWS = 5;

/** ACR Card App: scrolling fills the transaction list, moves money A → B, and finally logs the transfer. */
export default function CardApp({ t }: { t: Visuals["app"] }) {
  const [phase, setPhase] = useState<"idle" | "busy" | "done">("idle");
  const root = useRef<HTMLDivElement>(null);

  const body = useScrub<HTMLDivElement>((p) => {
    root.current?.style.setProperty("--p", p.toFixed(3));
    const s = p < 0.25 ? "idle" : p < 0.74 ? "busy" : "done";
    setPhase((prev) => (prev === s ? prev : s));
  });

  return (
    <div className="vis ca" ref={root} data-phase={phase}>
      <div className="vis-head">
        <span className="mono">{t.title}</span>
      </div>

      <div className="ca-body" ref={body} aria-hidden="true">
        <div className="ca-phone">
          <span className="ca-notch" />
          <p className="mono">{t.list}</p>
          <ul>
            {Array.from({ length: ROWS }, (_, i) => (
              <li key={i} className={i === 0 ? "ca-new" : undefined} style={{ "--i": i } as React.CSSProperties}>
                <i />
                <span />
                <b />
              </li>
            ))}
          </ul>
        </div>

        <div className="ca-cards">
          <div className="ca-card ca-a">
            <span className="mono">{t.a}</span>
            <span className="tu-bar">
              <i />
            </span>
          </div>
          <span className="ca-token" />
          <div className="ca-card ca-b">
            <span className="mono">{t.b}</span>
            <span className="tu-bar">
              <i />
            </span>
          </div>
        </div>
      </div>

      <p className="vis-caption" aria-live="polite">
        {phase === "idle" ? t.idle : phase === "busy" ? t.busy : t.done}
      </p>
    </div>
  );
}
