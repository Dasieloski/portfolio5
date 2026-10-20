import type { Formation } from "@/content/stage";

/**
 * What the camera should be showing. The Director writes it from the scroll position; the engine's physics pulls
 * every token toward it. Plain module state: no React re-render on scroll.
 */
export type Shot = {
  /** Formation the tokens leave and the one they join; `mix` (0..1) is the share of tokens already in `to`. */
  from: Formation;
  to: Formation;
  mix: number;
  /** Placement as a fraction of half the viewport, plus scale and tilt of the whole formation. */
  x: number;
  y: number;
  scale: number;
  rotX: number;
  rotY: number;
  /** 0 hides the scene (tokens drift back into the dark), 1 shows it. */
  presence: number;
  /** Strength of the cursor's push. */
  push: number;
};

export const DEFAULT_SHOT: Shot = {
  from: "cluster",
  to: "cluster",
  mix: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotX: 0,
  rotY: 0,
  presence: 1,
  push: 1,
};

export const cinema = { shot: { ...DEFAULT_SHOT } as Shot };

export const setShot = (s: Partial<Shot>) => Object.assign(cinema.shot, s);
