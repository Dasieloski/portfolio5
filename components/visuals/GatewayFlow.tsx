"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { Visuals } from "@/content/types";
import { useScrub } from "./hooks";

type Pt = [number, number];
type Layout = { w: number; h: number; src: Pt[]; gw: Pt; dst: Pt[]; node: [number, number]; vertical: boolean };

const WIDE: Layout = { w: 880, h: 340, src: [[100, 60], [100, 170], [100, 280]], gw: [440, 170], dst: [[780, 60], [780, 170], [780, 280]], node: [170, 52], vertical: false };
const TALL: Layout = { w: 360, h: 560, src: [[60, 50], [180, 50], [300, 50]], gw: [180, 280], dst: [[60, 510], [180, 510], [300, 510]], node: [108, 46], vertical: true };

// Reason: the route is fixed so the scroll position always maps to the same, readable journey: Product B → gateway → Financial service.
const ROUTE = { s: 1, d: 1 };

const curve = ([x0, y0]: Pt, [x1, y1]: Pt, vertical: boolean) =>
  vertical
    ? `M ${x0} ${y0} C ${x0} ${(y0 + y1) / 2}, ${x1} ${(y0 + y1) / 2}, ${x1} ${y1}`
    : `M ${x0} ${y0} C ${(x0 + x1) / 2} ${y0}, ${(x0 + x1) / 2} ${y1}, ${x1} ${y1}`;
const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 700px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Supernova: scrolling sends one payment in, through the gateway (where it is authorized once) and out to a bank. */
export default function GatewayFlow({ t }: { t: Visuals["gateway"] }) {
  const tall = useSyncExternalStore(subscribe, () => window.matchMedia("(max-width: 700px)").matches, () => false);
  const L = tall ? TALL : WIDE;
  const [phase, setPhase] = useState<"idle" | "busy" | "done">("idle");
  const srcPath = useRef<SVGPathElement>(null);
  const dstPath = useRef<SVGPathElement>(null);
  const packet = useRef<SVGGElement>(null);

  const stage = useScrub<HTMLDivElement>((p) => {
    const a = srcPath.current;
    const b = dstPath.current;
    if (a && b && packet.current) {
      // in (10–48%) → pause inside the gateway (48–58%) → out (58–92%)
      const pt = p < 0.48 ? a.getPointAtLength(a.getTotalLength() * ease(Math.max(0, (p - 0.1) / 0.38))) : p < 0.58 ? a.getPointAtLength(a.getTotalLength()) : b.getPointAtLength(b.getTotalLength() * ease(Math.min(1, (p - 0.58) / 0.28)));
      packet.current.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    }
    const s = p < 0.1 ? "idle" : p < 0.86 ? "busy" : "done";
    setPhase((prev) => (prev === s ? prev : s));
  });

  const [nw, nh] = L.node;
  const box = (p: Pt, w = nw, h = nh) => ({ x: p[0] - w / 2, y: p[1] - h / 2, width: w, height: h });
  const caption = phase === "idle" ? t.idle : phase === "busy" ? t.busy : t.done;

  return (
    <div className="vis gw" data-phase={phase}>
      <div className="vis-head">
        <span className="mono">{t.title}</span>
      </div>
      <div ref={stage}>
        <svg viewBox={`0 0 ${L.w} ${L.h}`} className="gw-svg" data-tall={tall || undefined} role="img" aria-label={t.title}>
          {L.src.map((p, i) => (
            <path key={`s${i}`} ref={i === ROUTE.s ? srcPath : undefined} d={curve(p, L.gw, L.vertical)} className="gw-line" data-on={(i === ROUTE.s && phase !== "idle") || undefined} />
          ))}
          {L.dst.map((p, i) => (
            <path key={`d${i}`} ref={i === ROUTE.d ? dstPath : undefined} d={curve(L.gw, p, L.vertical)} className="gw-line" data-on={(i === ROUTE.d && phase === "done") || undefined} />
          ))}
          {L.src.map((p, i) => (
            <g key={`sn${i}`} className="gw-node" data-on={(i === ROUTE.s && phase !== "idle") || undefined}>
              <rect {...box(p)} rx="3" />
              <text x={p[0]} y={p[1] + 5} textAnchor="middle">
                {t.from[i]}
              </text>
            </g>
          ))}
          {L.dst.map((p, i) => (
            <g key={`dn${i}`} className="gw-node" data-on={(i === ROUTE.d && phase === "done") || undefined}>
              <rect {...box(p)} rx="3" />
              <text x={p[0]} y={p[1] + 5} textAnchor="middle">
                {t.to[i]}
              </text>
            </g>
          ))}
          <g className="gw-core">
            <rect {...box(L.gw, tall ? 132 : 170, tall ? 64 : 84)} rx="4" />
            <text x={L.gw[0]} y={L.gw[1] + 6} textAnchor="middle">
              {t.gateway}
            </text>
          </g>
          <g ref={packet} className="gw-packet" transform={`translate(${L.src[ROUTE.s][0]} ${L.src[ROUTE.s][1]})`}>
            <circle r="15" className="gw-halo" />
            <circle r="7" />
          </g>
        </svg>
      </div>
      <p className="vis-caption" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}
