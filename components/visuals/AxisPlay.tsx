"use client";

import { useState } from "react";
import type { Visuals } from "@/content/types";

/** Lab piece: the site's own display axes as a playable instrument. */
export default function AxisPlay({ t }: { t: Visuals["axes"] }) {
  const [wdth, setWdth] = useState(100);
  const [wght, setWght] = useState(700);
  return (
    <div className="axis">
      <p className="axis-word" style={{ fontStretch: `${wdth}%`, fontWeight: wght }} aria-hidden="true">
        {t.sample}
      </p>
      <label>
        <span className="mono">
          {t.width} {wdth}
        </span>
        <input type="range" min={62} max={125} value={wdth} onChange={(e) => setWdth(+e.target.value)} />
      </label>
      <label>
        <span className="mono">
          {t.weight} {wght}
        </span>
        <input type="range" min={100} max={900} value={wght} onChange={(e) => setWght(+e.target.value)} />
      </label>
    </div>
  );
}
