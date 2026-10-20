import { LAYER_IDS, type LayerId } from "./types";

/**
 * Language-neutral facts per product: the layers the CV says I worked on (shown as chips) and the formation the
 * tokens take for it. Words live in the dictionaries.
 */
export type Formation =
  | "cluster"
  | "ledger"
  | "gateway"
  | "topup"
  | "card"
  | "transfer"
  | "store"
  | "grid"
  | "orbit"
  | "scatter";

type CaseStage = { lit: LayerId[]; formation: Formation };

export const CASE_STAGE: Record<string, CaseStage> = {
  "supernova-gateway": { lit: ["api", "data", "money"], formation: "gateway" },
  "acr-pay": { lit: ["interface", "api", "data", "money"], formation: "topup" },
  "acr-card": { lit: ["interface", "api", "data"], formation: "card" },
  "acr-card-app": { lit: ["interface", "api", "data", "money"], formation: "transfer" },
  habaluna: { lit: ["product", "interface", "api", "data", "money", "delivery"], formation: "store" },
  "gym-victoria": { lit: ["product", "interface", "api", "data", "delivery"], formation: "grid" },
  "mk-tattoo-supply": { lit: ["product", "interface", "api", "data", "money"], formation: "grid" },
};

/** Per-layer 0/1 for a case, in LAYER_IDS order. */
export const litVector = (slug: string): number[] => {
  const cfg = CASE_STAGE[slug];
  return LAYER_IDS.map((id) => (cfg?.lit.includes(id) ? 1 : 0));
};

export const formationOf = (slug: string): Formation => CASE_STAGE[slug]?.formation ?? "grid";

/** Text side per featured product, alternating so neighbouring scenes never share a composition. */
export const caseSide = (i: number): "left" | "right" => (i % 2 === 0 ? "left" : "right");
