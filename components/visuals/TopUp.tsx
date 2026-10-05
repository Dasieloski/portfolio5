"use client";

import { useRef, useState } from "react";
import type { Visuals } from "@/content/types";
import { useScrub } from "./hooks";

type Target = "card" | "phone";

/** ACR Pay: as you scroll, a stream of credit flows into a classic card or a mobile line and the balance fills once. */
export default function TopUp({ t }: { t: Visuals["topup"] }) {
  const [target, setTarget] = useState<Target>("card");
  const [phase, setPhase] = useState<"idle" | "busy" | "done">("idle");
  const root = useRef<HTMLDivElement>(null);

  const stage = useScrub<HTMLDivElement>((p) => {
    root.current?.style.setProperty("--p", p.toFixed(3));
    const s = p < 0.1 ? "idle" : p < 0.74 ? "busy" : "done";
    setPhase((prev) => (prev === s ? prev : s));
  });

  return (
    <div className="vis tu" ref={root} data-phase={phase} data-target={target}>
      <div className="vis-head">
        <span className="mono">{t.title}</span>
      </div>

      <div className="tu-pick" role="group" aria-label={t.title}>
        {(["card", "phone"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={target === k} onClick={() => setTarget(k)}>
            {t[k]}
          </button>
        ))}
      </div>

      <div className="tu-stage" ref={stage} aria-hidden="true">
        <div className="tu-src mono">ACR Pay</div>
        <div className="tu-stream">
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
        {target === "card" ? (
          <div className="tu-card">
            <span className="tu-chip" />
            <span className="tu-bar">
              <i />
            </span>
            <span className="tu-ok">✓</span>
          </div>
        ) : (
          <div className="tu-phone">
            <span className="tu-signal">
              <i />
              <i />
              <i />
            </span>
            <span className="tu-bar">
              <i />
            </span>
            <span className="tu-ok">✓</span>
          </div>
        )}
      </div>

      <p className="vis-caption" aria-live="polite">
        {phase === "idle" ? t.idle : phase === "busy" ? t.busy : t.done}
      </p>
    </div>
  );
}
