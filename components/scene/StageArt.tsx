/** Static isometric drawing of the layer stack: the SSR/LCP visual and the fallback when WebGL is unavailable. */
export default function StageArt({ layers = 6 }: { layers?: number }) {
  const cx = 200;
  const a = 150;
  const b = 78;
  const t = 12;
  const step = 70;
  const top = 60;
  const slabs = Array.from({ length: layers }, (_, i) => top + i * step);

  return (
    <svg className="stage-art" viewBox="0 0 400 520" role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        {[-1, 1].map((s) => (
          <line key={s} x1={cx + s * a} y1={slabs[0]} x2={cx + s * a} y2={slabs[layers - 1] + t} opacity="0.3" />
        ))}
        {[...slabs].reverse().map((cy) => (
          <g key={cy}>
            <polygon points={`${cx - a},${cy} ${cx},${cy + b} ${cx},${cy + b + t} ${cx - a},${cy + t}`} fill="var(--paper)" fillOpacity="0.85" />
            <polygon points={`${cx + a},${cy} ${cx},${cy + b} ${cx},${cy + b + t} ${cx + a},${cy + t}`} fill="var(--tint)" fillOpacity="0.9" />
            <polygon points={`${cx},${cy - b} ${cx + a},${cy} ${cx},${cy + b} ${cx - a},${cy}`} fill="var(--paper)" fillOpacity="0.9" />
            <polygon
              points={`${cx},${cy - b * 0.45} ${cx + a * 0.45},${cy} ${cx},${cy + b * 0.45} ${cx - a * 0.45},${cy}`}
              stroke={cy === slabs[3] ? "var(--sig)" : "currentColor"}
              strokeDasharray="3 4"
              opacity="0.7"
            />
          </g>
        ))}
        <circle cx={cx} cy={slabs[3] + 2} r="7" fill="var(--sig)" stroke="none" />
      </g>
    </svg>
  );
}
