"use client";

import { useEffect, useRef, useState } from "react";
import type { Visuals } from "@/content/types";

type Phase = "idle" | "land" | "lock" | "done";
const RANGE = [9, 10, 11, 12];
const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

export default function Availability({ t }: { t: Visuals["avail"] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = () => {
    clear();
    setPhase("land");
    timers.current.push(window.setTimeout(() => setPhase("lock"), 1300), window.setTimeout(() => setPhase("done"), 2800));
  };
  const reset = () => {
    clear();
    setPhase("idle");
  };

  const message = phase === "idle" ? t.idle : phase === "land" ? t.land : phase === "lock" ? t.lock : `${t.won} ${t.lost}`;

  return (
    <div className="vis avail" data-phase={phase}>
      <div className="vis-head">
        <span className="label">{t.title}</span>
        <div className="vis-actions">
          <button type="button" className="btn btn-sm" onClick={run} disabled={phase !== "idle"}>
            {t.run}
          </button>
          <button type="button" className="btn btn-sm btn-line" onClick={reset} disabled={phase === "idle"}>
            {t.reset}
          </button>
        </div>
      </div>

      <div className="cal" role="img" aria-label={t.title}>
        {DAYS.map((d) => {
          const inRange = RANGE.includes(d);
          return (
            <span key={d} className="cal-day" data-range={inRange} data-edge={d === RANGE[0] ? "start" : d === RANGE[RANGE.length - 1] ? "end" : undefined}>
              <i className="label">{d}</i>
            </span>
          );
        })}
        <span className="req req-a" data-on={phase !== "idle"}>
          <b className="label">{t.a}</b>
          <u className="stamp">{phase === "done" ? "✓" : ""}</u>
        </span>
        <span className="req req-b" data-on={phase !== "idle"}>
          <b className="label">{t.b}</b>
          <u className="stamp">{phase === "done" ? "×" : ""}</u>
        </span>
        <span className="cal-lock label" data-on={phase === "lock"}>
          ◆ LOCK
        </span>
      </div>

      <p className="vis-caption" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
