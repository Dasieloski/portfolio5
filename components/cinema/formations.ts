import { Euler, Quaternion, Vector3 } from "three";
import type { Formation } from "@/content/stage";

/** Token finish keys: ceramic white, lacquered black, signal accent. -1 keeps the token's own colour. */
export type Tone = -1 | 0 | 1 | 2;

export type Spec = {
  /** Tokens bump into each other (loose piles) or pass through (tight, ordered shapes). */
  collide: boolean;
  /** Spring stiffness toward the target. */
  k: number;
  /** Writes the target position (and orientation, returning true) of token i at time t. */
  place: (i: number, n: number, t: number, p: Vector3, q: Quaternion) => boolean;
  tone?: (i: number, n: number, p: Vector3) => Tone;
};

export const TOKEN_R = 0.42;
export const TOKEN_H = 0.26;
const STEP = TOKEN_R * 2 + 0.02;

const FACE = new Quaternion().setFromEuler(new Euler(Math.PI / 2, 0, 0));
const FLAT = new Quaternion();
const SIDE = new Quaternion().setFromEuler(new Euler(0, 0, Math.PI / 2));
const UP = new Vector3(0, 1, 0);
const tmp = new Vector3();

/** Deterministic pseudo-random in [0, 1) so every formation is identical between visits. */
const rand = (i: number, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/** A stable point inside a sphere of radius 1 per token. */
const home = (i: number, out: Vector3) => {
  const u = rand(i, 1) * 2 - 1;
  const a = rand(i, 2) * Math.PI * 2;
  const r = Math.cbrt(rand(i, 3));
  const s = Math.sqrt(1 - u * u);
  return out.set(Math.cos(a) * s * r, u * r, Math.sin(a) * s * r);
};
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
/** Grid that fits n tokens with a given aspect, centred. */
const gridFor = (n: number, aspect: number) => {
  const cols = Math.max(2, Math.round(Math.sqrt(n * aspect)));
  return { cols, rows: Math.ceil(n / cols) };
};
const scatter = (i: number, t: number, p: Vector3) => {
  // Reason: far enough back that the fog leaves only faint shapes; spare tokens never clutter a formation.
  home(i, p).multiplyScalar(6).add(tmp.set(0, 0, -20));
  p.y += Math.sin(t * 0.25 + i) * 0.4;
  return false;
};

export const FORMATIONS: Record<Formation, Spec> = {
  // A loose pile pulled to the centre; the tokens tumble and knock into each other.
  cluster: {
    collide: true,
    k: 1.6,
    place: (i, _n, _t, p) => (home(i, p).multiplyScalar(1.3), false),
  },
  // Columns of stacked tokens, like a ledger or a bar chart: order out of the pile.
  ledger: {
    collide: false,
    k: 14,
    place: (i, n, _t, p, q) => {
      const weights = [0.13, 0.21, 0.3, 0.22, 0.14];
      const f = i / n;
      let s = 0;
      let acc = weights[0];
      while (f > acc && s < weights.length - 1) acc += weights[++s];
      const start = weights.slice(0, s).reduce((a, b) => a + b, 0);
      const level = Math.floor((f - start) * n);
      p.set((s - 2) * 1.2, -2.3 + level * (TOKEN_H + 0.02), 0);
      q.setFromAxisAngle(UP, rand(i) * 0.6);
      return true;
    },
    tone: (i) => (i % 9 === 4 ? 2 : -1),
  },
  // A portal ring; the stream is disordered before it and in line after it.
  gateway: {
    collide: false,
    k: 12,
    place: (i, n, t, p, q) => {
      const ring = Math.round(n * 0.55);
      if (i < ring) {
        const a = (i / ring) * Math.PI * 2;
        p.set(Math.cos(a) * 2.3, Math.sin(a) * 2.3, 0);
        q.setFromUnitVectors(UP, tmp.set(Math.cos(a), Math.sin(a), 0));
        return true;
      }
      const k = i - ring;
      const count = n - ring;
      const len = Math.min(count * 0.62 + 2, 9);
      const x = ((t * 1.3 + k * 0.62) % len) - len / 2;
      if (k * 0.62 > len) return scatter(i, t, p);
      const chaos = smooth(0.2, -2.5, x);
      p.set(x, Math.sin(k * 12.9 + t * 2.4) * 1.1 * chaos, Math.cos(k * 7.3 + t * 2) * 0.9 * chaos);
      q.copy(SIDE);
      return true;
    },
    tone: (i, n, p) => (i < Math.round(n * 0.55) ? 1 : p.x > 0 ? 2 : 0),
  },
  // A phone outline; tokens fall into it and settle on a balance that grows.
  topup: {
    collide: false,
    k: 12,
    place: (i, n, t, p, q) => {
      const w = 2.5;
      const h = 4.8;
      const per = Math.min(Math.round((2 * (w + h)) / 0.82), Math.round(n * 0.5));
      const drops = 5;
      if (i < per) {
        let d = (i / per) * 2 * (w + h);
        if (d < w) p.set(-w / 2 + d, h / 2, 0);
        else if ((d -= w) < h) p.set(w / 2, h / 2 - d, 0);
        else if ((d -= h) < w) p.set(w / 2 - d, -h / 2, 0);
        else p.set(-w / 2, -h / 2 + (d - w), 0);
        q.copy(FACE);
        return true;
      }
      if (i < per + drops) {
        const u = (t * 0.5 + (i - per) / drops) % 1;
        p.set(0, 5.4 - u * 6.4, 0);
        q.copy(FACE);
        return true;
      }
      const level = i - per - drops;
      if (level >= 11) return scatter(i, t, p);
      p.set(0, -h / 2 + 0.45 + level * (TOKEN_H + 0.02), 0);
      q.copy(FLAT);
      return true;
    },
    tone: (i, n) => {
      const per = Math.min(Math.round((2 * 7.3) / 0.82), Math.round(n * 0.5));
      return i < per ? 1 : i < per + 5 ? 2 : 0;
    },
  },
  // A card: white body, an accent chip, a black number line.
  card: {
    collide: false,
    k: 12,
    place: (i, n, t, p, q) => {
      const { cols, rows } = n >= 60 ? { cols: 10, rows: 6 } : { cols: 8, rows: 5 };
      if (i >= cols * rows) return scatter(i, t, p);
      const c = i % cols;
      const r = Math.floor(i / cols);
      p.set((c - (cols - 1) / 2) * STEP, ((rows - 1) / 2 - r) * STEP, 0);
      q.copy(FACE);
      return true;
    },
    tone: (i, n) => {
      const { cols, rows } = n >= 60 ? { cols: 10, rows: 6 } : { cols: 8, rows: 5 };
      if (i >= cols * rows) return -1;
      const c = i % cols;
      const r = Math.floor(i / cols);
      if ((c === 1 || c === 2) && (r === 1 || r === 2)) return 2;
      if (r === rows - 2 && c >= 1 && c <= cols - 3) return 1;
      return 0;
    },
  },
  // Two balances; a few tokens arc from one to the other, again and again.
  transfer: {
    collide: false,
    k: 12,
    place: (i, n, t, p, q) => {
      const fly = 6;
      if (i < fly) {
        const u = (t * 0.42 + i / fly) % 1;
        p.set(-2.6 + 5.2 * u, 0.6 + Math.sin(Math.PI * u) * 2.4, 0);
        q.copy(FACE);
        return true;
      }
      const k = i - fly;
      const left = k % 2 === 0;
      const level = Math.floor(k / 2);
      if (level >= 12) return scatter(i, t, p);
      p.set(left ? -2.6 : 2.6, -2.4 + level * (TOKEN_H + 0.02), 0);
      q.copy(FLAT);
      return true;
    },
    tone: (i) => (i < 6 ? 2 : (i - 6) % 2 === 0 ? 0 : 1),
  },
  // A shopping bag: a tapered body and an accent handle.
  store: {
    collide: false,
    k: 12,
    place: (i, n, t, p, q) => {
      const widths = [5, 6, 6, 7, 7, 7];
      const body = widths.reduce((a, b) => a + b, 0);
      const handle = 7;
      q.copy(FACE);
      if (i < body) {
        let r = 0;
        let k = i;
        while (k >= widths[r]) k -= widths[r++];
        p.set((k - (widths[r] - 1) / 2) * STEP, -2.3 + r * STEP, 0);
        return true;
      }
      if (i < body + handle) {
        const a = Math.PI * ((i - body) / (handle - 1));
        p.set(Math.cos(a) * 1.6, -2.3 + widths.length * STEP - 0.1 + Math.sin(a) * 1.5, 0);
        return true;
      }
      return scatter(i, t, p);
    },
    tone: (i) => (i < 38 ? 1 : i < 45 ? 2 : -1),
  },
  grid: {
    collide: false,
    k: 10,
    place: (i, n, _t, p, q) => {
      const { cols, rows } = gridFor(n, 1.6);
      p.set(((i % cols) - (cols - 1) / 2) * STEP, ((rows - 1) / 2 - Math.floor(i / cols)) * STEP, 0);
      q.copy(FACE);
      return true;
    },
  },
  // A slow halo around the closing words.
  orbit: {
    collide: false,
    k: 6,
    place: (i, n, t, p, q) => {
      const a = (i / n) * Math.PI * 2 + t * 0.18;
      p.set(Math.cos(a) * 4.6, Math.sin(a) * 0.55 + Math.sin(i * 3.1 + t) * 0.12, Math.sin(a) * 2.4 - 1.2);
      q.setFromAxisAngle(UP, -a).multiply(FACE);
      return true;
    },
  },
  scatter: {
    collide: false,
    k: 3,
    place: (i, _n, t, p) => scatter(i, t, p),
  },
};
