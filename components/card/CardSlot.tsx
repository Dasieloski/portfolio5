import type { CSSProperties } from "react";

type Props = {
  place: "hero" | "intro" | "end";
  rx: number;
  ry: number;
  rz: number;
  role: string;
  name: string;
  since: string;
};

/**
 * A reserved box the 3D card flies into. Inside it, a CSS-drawn card is the fallback (no WebGL, reduced motion,
 * first paint); it is hidden once the real one is running.
 */
export default function CardSlot({ place, rx, ry, rz, role, name, since }: Props) {
  // Reason: the 3D card may show its back; the CSS fallback always shows the front, mirrored tilt included.
  const fbRy = Math.abs(ry) > Math.PI / 2 ? ry - Math.sign(ry) * Math.PI : ry;
  return (
    <div className={`card-slot card-slot-${place}`} data-card={place} data-rx={rx} data-ry={ry} data-rz={rz} aria-hidden="true">
      <div className="card-fb" style={{ "--rz": `${rz}rad`, "--ry": `${fbRy}rad` } as CSSProperties}>
        <span className="card-fb-role">{role}</span>
        <i className="card-fb-chip" />
        <i className="card-fb-seal" />
        <span className="card-fb-pan">•••• •••• •••• ••••</span>
        <span className="card-fb-name">{name}</span>
        <span className="card-fb-since">{since}</span>
      </div>
    </div>
  );
}
