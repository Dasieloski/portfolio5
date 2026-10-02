"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Visuals } from "@/content/types";

type Props = { t: Visuals["pay"] };

// Reason: two layouts of the same route (wide / tall) so the diagram reads well on desktop and on a phone.
const WIDE = { w: 880, h: 360, pts: [[80, 250], [235, 110], [390, 250], [545, 110], [700, 250], [810, 110]] };
const TALL = { w: 360, h: 760, pts: [[90, 60], [260, 190], [90, 320], [260, 450], [90, 580], [260, 700]] };

function route(pts: number[][]) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const horizontal = Math.abs(x1 - x0) > Math.abs(y1 - y0) * 0.6 && pts === WIDE.pts;
    d += horizontal
      ? ` C ${(x0 + x1) / 2} ${y0}, ${(x0 + x1) / 2} ${y1}, ${x1} ${y1}`
      : ` C ${x0} ${(y0 + y1) / 2}, ${x1} ${(y0 + y1) / 2}, ${x1} ${y1}`;
  }
  return d;
}

function Diagram({ layout, t, active, packetRef, pathRef }: {
  layout: typeof WIDE;
  t: Props["t"];
  active: number;
  packetRef: React.Ref<SVGGElement>;
  pathRef: React.Ref<SVGPathElement>;
}) {
  return (
    <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className="pay-svg" role="img" aria-label={t.title}>
      <defs>
        <pattern id={`hatch-${layout.w}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.28" />
        </pattern>
      </defs>
      <path ref={pathRef} d={route(layout.pts)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.55" />
      {layout.pts.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} className="pay-node" data-on={i <= active} data-now={i === active}>
          <rect x="-58" y="-30" width="116" height="60" rx="3" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" />
          <rect x="-58" y="-30" width="116" height="60" rx="3" fill={`url(#hatch-${layout.w})`} className="pay-hatch" />
          <text x="0" y="5" textAnchor="middle" className="pay-label">{t.nodes[i].label}</text>
          <text x="-50" y="-36" className="pay-n">0{i + 1}</text>
        </g>
      ))}
      <g ref={packetRef} className="pay-packet">
        <circle r="16" fill="var(--sig)" opacity="0.18" />
        <circle r="7" fill="var(--sig)" />
      </g>
    </svg>
  );
}

export default function PaymentFlow({ t }: Props) {
  const [active, setActive] = useState(-1);
  const [busy, setBusy] = useState(false);
  const wideRef = useRef<SVGPathElement>(null);
  const tallRef = useRef<SVGPathElement>(null);
  const packetWide = useRef<SVGGElement>(null);
  const packetTall = useRef<SVGGElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const inView = useRef(false);

  const fly = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setBusy(true);
    const dur = 6500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      // Reason: only the visible layout is driven (getTotalLength is unreliable on display:none SVG).
      const tall = window.matchMedia("(max-width: 760px)").matches;
      const path = tall ? tallRef.current : wideRef.current;
      const packet = tall ? packetTall.current : packetWide.current;
      const layout = tall ? TALL : WIDE;
      if (path && packet) {
        const pt = path.getPointAtLength(path.getTotalLength() * e);
        packet.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        let n = 0;
        layout.pts.forEach(([x, y], i) => {
          if (Math.hypot(pt.x - x, pt.y - y) < 60) n = i;
        });
        setActive((a) => (n >= a ? n : a));
      }
      if (p < 1) raf.current = requestAnimationFrame(step);
      else setBusy(false);
    };
    setActive(0);
    raf.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (e.isIntersecting && !inView.current && !calm) fly();
        inView.current = e.isIntersecting;
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [fly]);

  const node = t.nodes[Math.max(0, active)];

  return (
    <div className="vis pay" ref={root}>
      <div className="vis-head">
        <span className="mono">{t.title}</span>
        <button type="button" className="btn btn-sm" onClick={fly} disabled={busy}>
          {busy ? t.busy : t.run}
        </button>
      </div>
      <div className="pay-wide">
        <Diagram layout={WIDE} t={t} active={active} packetRef={packetWide} pathRef={wideRef} />
      </div>
      <div className="pay-tall">
        <Diagram layout={TALL} t={t} active={active} packetRef={packetTall} pathRef={tallRef} />
      </div>
      <p className="vis-caption" aria-live="polite">
        <span className="mono">0{Math.max(0, active) + 1} · {node.label}</span> {node.text}
      </p>
    </div>
  );
}
