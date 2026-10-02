import type { Arch } from "@/content/visuals";

const X = [110, 350, 590];
const Y = (row: number) => 60 + row * 100;

/** Data-driven architecture drawing: three tiers (client / server / data) with animated flow lines. */
export default function LayerDiagram({ arch, label }: { arch: Arch; label: string }) {
  const byId = Object.fromEntries(arch.nodes.map((n) => [n.id, n]));
  const rows = Math.max(...arch.nodes.map((n) => n.row)) + 1;
  return (
    <svg viewBox={`0 0 700 ${rows * 100 + 20}`} className="arch-svg" role="img" aria-label={label}>
      {arch.edges.map(([a, b]) => {
        const A = byId[a];
        const B = byId[b];
        const x1 = X[A.tier];
        const y1 = Y(A.row);
        const x2 = X[B.tier];
        const y2 = Y(B.row);
        const mx = (x1 + x2) / 2;
        return <path key={`${a}-${b}`} d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`} className="arch-flow" />;
      })}
      {arch.nodes.map((n) => (
        <g key={n.id} transform={`translate(${X[n.tier]} ${Y(n.row)})`} className="arch-node">
          <rect x="-96" y="-26" width="192" height="52" rx="3" />
          <text x="0" y="5" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
