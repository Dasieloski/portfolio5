"use client";

import { useRef, useState } from "react";
import type { Visuals } from "@/content/types";
import { useScrub } from "./hooks";

type Net = "visa" | "mastercard";

/** ACR Card: scrolling advances a request through clear states until exactly one card is issued. */
export default function IssueCard({ t }: { t: Visuals["issue"] }) {
  const [net, setNet] = useState<Net>("visa");
  const [step, setStep] = useState(-1); // -1 idle, 0 request, 1 review, 2 issued
  const root = useRef<HTMLDivElement>(null);

  const stage = useScrub<HTMLDivElement>((p) => {
    root.current?.style.setProperty("--p", p.toFixed(3));
    const s = p < 0.08 ? -1 : p < 0.3 ? 0 : p < 0.6 ? 1 : 2;
    setStep((prev) => (prev === s ? prev : s));
  });

  const phase = step < 0 ? "idle" : step < 2 ? "busy" : "done";

  return (
    <div className="vis ic" ref={root} data-phase={phase} data-net={net}>
      <div className="vis-head">
        <span className="mono">{t.title}</span>
      </div>

      <div className="tu-pick" role="group" aria-label={t.title}>
        {(["visa", "mastercard"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={net === k} onClick={() => setNet(k)}>
            {t[k]}
          </button>
        ))}
      </div>

      <ol className="ic-steps">
        {t.steps.map((s, i) => (
          <li key={s} data-on={i <= step || undefined}>
            <span className="mono">0{i + 1}</span> {s}
          </li>
        ))}
      </ol>

      <div className="ic-stage" ref={stage} aria-hidden="true">
        <div className="ic-slot" />
        <div className="ic-card">
          <b>ACR</b>
          <span className="ic-chip" />
          <span className="ic-net">{net === "visa" ? "VISA" : "mastercard"}</span>
        </div>
      </div>

      <p className="vis-caption" aria-live="polite">
        {phase === "idle" ? t.idle : phase === "busy" ? t.busy : t.done}
      </p>
    </div>
  );
}
