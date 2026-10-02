"use client";

import { useState } from "react";
import type { Visuals } from "@/content/types";

type Key = keyof Visuals["schema"]["nodes"];
const POS: Record<Key, [number, number]> = {
  location: [110, 70],
  members: [330, 70],
  trainers: [330, 250],
  memberships: [570, 70],
  payments: [570, 250],
};
const EDGES: { a: Key; b: Key; label: "tenant" | "assigned" | "holds" | "settles" }[] = [
  { a: "members", b: "location", label: "tenant" },
  { a: "trainers", b: "location", label: "tenant" },
  { a: "trainers", b: "members", label: "assigned" },
  { a: "members", b: "memberships", label: "holds" },
  { a: "memberships", b: "payments", label: "settles" },
];

export default function SchemaMap({ t }: { t: Visuals["schema"] }) {
  const [hot, setHot] = useState<Key | null>(null);
  const keys = Object.keys(POS) as Key[];
  const linked = (e: (typeof EDGES)[number]) => hot !== null && (e.a === hot || e.b === hot);

  return (
    <div className="vis schemav">
      <div className="vis-head">
        <span className="label">{t.title}</span>
        <span className="label vis-hint">{t.hint}</span>
      </div>
      <svg viewBox="0 0 700 330" role="img" aria-label={t.title} className="schema-svg">
        {EDGES.map((e) => {
          const [x1, y1] = POS[e.a];
          const [x2, y2] = POS[e.b];
          return (
            <g key={`${e.a}-${e.b}`} className="schema-edge" data-on={linked(e)}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} />
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" className="label">
                {t.edges[e.label]}
              </text>
            </g>
          );
        })}
        {keys.map((k) => {
          const [x, y] = POS[k];
          const on = hot === k || (hot !== null && EDGES.some((e) => (e.a === hot && e.b === k) || (e.b === hot && e.a === k)));
          return (
            <g
              key={k}
              transform={`translate(${x} ${y})`}
              className="schema-node"
              data-on={on}
              tabIndex={0}
              onMouseEnter={() => setHot(k)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(k)}
              onBlur={() => setHot(null)}
            >
              <rect x="-70" y="-34" width="140" height="68" rx="3" />
              <line x1="-70" y1="-12" x2="70" y2="-12" />
              <text x="0" y="-18" textAnchor="middle" className="label schema-title" />
              <text x="0" y="18" textAnchor="middle" className="schema-name">
                {t.nodes[k]}
              </text>
              <line x1="-58" y1="-2" x2="-18" y2="-2" className="schema-field" />
              <line x1="-10" y1="-2" x2="30" y2="-2" className="schema-field" />
            </g>
          );
        })}
      </svg>
      <p className="vis-caption">
        <span className="label">{t.roles}</span> admin · trainer · member
      </p>
    </div>
  );
}
