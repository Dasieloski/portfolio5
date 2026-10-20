"use client";

import { useEffect } from "react";
import { caseSide, formationOf } from "@/content/stage";
import type { Formation } from "@/content/stage";
import { setShot, type Shot } from "./store";

/** How large each formation is drawn, so every emblem fits its half of the screen. */
const SIZE: Partial<Record<Formation, number>> = { gateway: 0.78, topup: 0.8, card: 0.5, transfer: 0.82, store: 0.6, grid: 0.55 };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

type Ctx = { el: HTMLElement; mobile: boolean; progress: number };

/** The shot for each scene. Offsets keep the tokens clear of the text at each breakpoint. */
const SHOTS: Record<string, (c: Ctx) => Partial<Shot>> = {
  hero: ({ mobile }) => ({
    from: "cluster", to: "cluster", mix: 1, x: mobile ? 0 : 0.26, y: mobile ? 0.04 : -0.04, scale: mobile ? 1.25 : 1.3,
    rotX: 0, rotY: 0, presence: 1, push: 1,
  }),
  // Order out of the pile, tied to the scroll: each token drops into a ledger column as you read.
  manifest: ({ el, mobile, progress }) => {
    el.dataset.step = String(Math.min(3, Math.floor(progress * 4.2)));
    return {
      from: "cluster", to: "ledger", mix: smooth(0.08, 0.7, progress), x: mobile ? 0 : 0.36, y: mobile ? 0.22 : -0.02,
      scale: mobile ? 1 : 0.95, rotX: 0.22, rotY: -0.35 + progress * 0.5, presence: 1, push: 0.8,
    };
  },
  case: ({ el, mobile }) => {
    const slug = el.dataset.slug ?? "";
    const side = el.dataset.hero === "true" ? "left" : caseSide(Number(el.dataset.i ?? 0));
    const f = formationOf(slug);
    return {
      from: f, to: f, mix: 1, x: mobile ? 0 : side === "left" ? 0.44 : -0.44, y: mobile ? 0.26 : 0,
      scale: (mobile ? 1.3 : 0.95) * (SIZE[f] ?? 0.7), rotX: 0.08, rotY: side === "left" ? -0.28 : 0.28, presence: 1, push: 0.9,
    };
  },
  // Calm sections: the stage goes dark and the tokens retreat into the fog, so the reading is undisturbed.
  calm: () => ({ from: "scatter", to: "scatter", mix: 1, x: 0, y: 0, scale: 1, rotX: 0, rotY: 0, presence: 0, push: 0 }),
  contact: ({ mobile }) => ({
    from: "orbit", to: "orbit", mix: 1, x: 0, y: mobile ? 0.3 : 0.3, scale: mobile ? 0.66 : 0.82, rotX: 0.1, rotY: 0,
    presence: 1, push: 1,
  }),
};

const CHAPTER: Record<string, string> = { case: "work", calm: "", contact: "contact" };

/**
 * Turns scroll into shots. Each `[data-scene]` element names its shot; the one crossing the middle of the viewport
 * is active. The physics takes care of the motion between shots. Also sets the active chapter for the nav and
 * reveals `[data-rv]` elements.
 */
export default function Director() {
  useEffect(() => {
    const root = document.documentElement;
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!scenes.length) return void setShot({ presence: 0 });
      const vh = window.innerHeight;
      const mid = vh * 0.5;
      let el = scenes[0];
      for (const s of scenes) if (s.getBoundingClientRect().top <= mid) el = s;
      const r = el.getBoundingClientRect();
      const progress = clamp01(-r.top / Math.max(1, r.height - vh));
      const name = el.dataset.scene ?? "calm";
      setShot((SHOTS[name] ?? SHOTS.calm)({ el, mobile: window.innerWidth < 860, progress }));
      root.dataset.chapter = el.dataset.chapter ?? CHAPTER[name] ?? "";
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // Reason: one passive listener batched to one rAF; it writes module state, never React state.
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-rv]").forEach((n) => io.observe(n));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      io.disconnect();
    };
  }, []);

  return null;
}
