"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/types";

type Props = { stack: Dictionary["stack"]; path: Dictionary["path"] };

/**
 * Experience as a map instead of a CV: which layers each product asked me to work in.
 * Every dot is backed by a sentence already written in the dictionary (stack.layers[].points).
 */
export default function Layers({ stack, path }: Props) {
  const rows = path.rows.map((r) => ({
    key: r.place,
    period: r.period,
    title: r.title,
    cells: stack.layers.map((l) => l.points.find((p) => r.place === p.ref || r.place.startsWith(p.ref)) ?? null),
  }));
  const first = rows.findIndex((r) => r.cells.some(Boolean));
  const [sel, setSel] = useState<[number, number] | null>(first >= 0 ? [first, stack.layers.findIndex((_, c) => rows[first].cells[c])] : null);

  const selected = sel ? { row: rows[sel[0]], layer: stack.layers[sel[1]], point: rows[sel[0]].cells[sel[1]] } : null;

  return (
    <section id="stack" className="sheet layers" aria-labelledby="stack-title">
      <div className="layers-lead">
        <h2 id="stack-title" className="h2">
          {stack.title}
        </h2>
        <p className="section-intro">{stack.intro}</p>
        {path.about.map((p) => (
          <p key={p} className="about">
            {p}
          </p>
        ))}
        <p className="label edu">
          {path.education.period} · {path.education.title}, {path.education.place}
        </p>
      </div>

      <div className="matrix-wrap">
        <div className="matrix" role="grid" aria-label={stack.title} style={{ ["--cols" as string]: stack.layers.length }}>
          <div className="m-row m-head" role="row">
            <span role="columnheader" />
            {stack.layers.map((l) => (
              <span key={l.id} role="columnheader" className="m-col" data-on={sel ? stack.layers[sel[1]].id === l.id : false}>
                {l.name}
              </span>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div key={r.key} className="m-row" role="row" data-on={sel?.[0] === ri}>
              <span role="rowheader" className="m-name">
                <b>{r.key.replace(/ ecosystem| ecosistema/i, "")}</b>
                <i className="label">{r.period}</i>
              </span>
              {r.cells.map((cell, ci) =>
                cell ? (
                  <button
                    key={ci}
                    type="button"
                    role="gridcell"
                    className="m-dot"
                    data-on={sel?.[0] === ri && sel?.[1] === ci}
                    aria-label={`${r.key} — ${stack.layers[ci].name}`}
                    onMouseEnter={() => setSel([ri, ci])}
                    onFocus={() => setSel([ri, ci])}
                    onClick={() => setSel([ri, ci])}
                  >
                    <i />
                  </button>
                ) : (
                  <span key={ci} role="gridcell" className="m-none" aria-hidden="true">
                    <i />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="detail" aria-live="polite">
          {selected && selected.point ? (
            <>
              <p className="label">
                {selected.row.key} · {selected.layer.name}
              </p>
              <p className="detail-claim">{selected.layer.claim}</p>
              <p>{selected.point.text}</p>
            </>
          ) : (
            <p className="label">{stack.empty}</p>
          )}
          <p className="label detail-hint">{stack.hint}</p>
        </div>
      </div>
    </section>
  );
}
