"use client";

import { useEffect, useRef, useState } from "react";
import type { Visuals } from "@/content/types";

const COLS = 18;
const ROWS = 12;
const TOTAL = COLS * ROWS; // 216 SKUs, to match "200+"
const TARGET = 87;

type Phase = "idle" | "lock" | "done";

export default function StockGrid({ t }: { t: Visuals["stock"] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stock, setStock] = useState<number[]>(() => Array.from({ length: TOTAL }, (_, i) => (i === TARGET ? 1 : 2 + ((i * 7) % 3))));
  const [blip, setBlip] = useState(-1);
  const timers = useRef<number[]>([]);
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  // ambient orders: random SKUs tick down and restock, so the grid feels alive without touching the target
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const i = Math.floor(Math.random() * TOTAL);
      if (i === TARGET) return;
      setBlip(i);
      setStock((s) => s.map((v, k) => (k === i ? (v <= 1 ? 3 : v - 1) : v)));
    }, 650);
    return () => clearInterval(id);
  }, []);

  const run = () => {
    clear();
    setPhase("lock");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("done");
        setStock((s) => s.map((v, k) => (k === TARGET ? 0 : v)));
      }, 1800),
    );
  };
  const reset = () => {
    clear();
    setPhase("idle");
    setStock((s) => s.map((v, k) => (k === TARGET ? 1 : v)));
  };

  return (
    <div className="vis stockv" data-phase={phase}>
      <div className="vis-head">
        <span className="label">
          {TOTAL} {t.skus}
        </span>
        <div className="vis-actions">
          <button type="button" className="btn btn-sm" onClick={run} disabled={phase !== "idle"}>
            {t.run}
          </button>
          <button type="button" className="btn btn-sm btn-line" onClick={reset} disabled={phase === "idle"}>
            {t.reset}
          </button>
        </div>
      </div>
      <div className="sku" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }} role="img" aria-label={`${TOTAL} ${t.skus}`}>
        {stock.map((v, i) => (
          <span key={i} className="sku-cell" data-v={v} data-blip={i === blip} data-target={i === TARGET} />
        ))}
        <span className="sku-tag sku-a label" data-on={phase !== "idle"}>
          A {phase === "done" ? "✓" : ""}
        </span>
        <span className="sku-tag sku-b label" data-on={phase !== "idle"}>
          B {phase === "done" ? "×" : ""}
        </span>
      </div>
      <p className="vis-caption" aria-live="polite">
        {phase === "idle" ? t.idle : phase === "lock" ? t.lock : t.done}
      </p>
    </div>
  );
}
