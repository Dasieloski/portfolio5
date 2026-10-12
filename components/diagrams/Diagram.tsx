import type { CSSProperties } from "react";
import { DIAGRAMS, type DiagramText } from "@/content/diagrams";

type Props = { slug: string; step: number; text: DiagramText; label: string };

/**
 * A schematic as a CSS grid: nodes, connectors and bars switch on step by step. Pure markup, so it reflows:
 * under 640px the whole flow turns 90 degrees and runs top to bottom.
 */
export default function Diagram({ slug, step, text, label }: Props) {
  const cfg = DIAGRAMS[slug];
  if (!cfg) return null;
  const flipRows = cfg.cols.split(" ").map((c) => (c.endsWith("fr") ? "auto" : c)).join(" ");

  return (
    <div
      className="dg"
      role="img"
      aria-label={`${label}. ${text.steps[Math.min(step, text.steps.length - 1)]}`}
      style={{ "--tc": cfg.cols, "--tf": flipRows, "--tr": `repeat(${cfg.rows}, auto)`, "--tn": `repeat(${cfg.rows}, minmax(0, 1fr))` } as CSSProperties}
    >
      {cfg.links.map((l) => (
        <span
          key={`l${l.col}-${l.row}`}
          className="dl"
          data-on={step >= l.at}
          style={{ "--c": l.col + 1, "--r": l.row + 1 } as CSSProperties}
          aria-hidden="true"
        />
      ))}
      {cfg.nodes.map((n) => {
        const state = step < n.at ? "idle" : n.dimAt !== undefined && step >= n.dimAt ? "dim" : "on";
        const level = n.bar ? n.bar[Math.min(step, n.bar.length - 1)] : undefined;
        return (
          <div
            key={n.id}
            className="dn"
            data-s={state}
            style={{ "--c": n.col + 1, "--r": n.row + 1, "--cs": n.cs ?? 1, "--rs": n.rs ?? 1 } as CSSProperties}
          >
            <span className="dn-label">{text.nodes[n.id]}</span>
            {level !== undefined && (
              <span className="dn-bar" aria-hidden="true">
                <i style={{ "--v": level } as CSSProperties} />
              </span>
            )}
            {n.notes?.map((note) => (
              <span key={note.key} className="dn-note" data-on={step >= note.at}>
                {text.notes[note.key]}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
