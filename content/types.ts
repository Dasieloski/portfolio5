/** The six layers of a product. Order is top to bottom of the 3D stack. */
export const LAYER_IDS = ["product", "interface", "api", "data", "money", "delivery"] as const;
export type LayerId = (typeof LAYER_IDS)[number];

export type CaseSection = { title: string; body: string[] };

export type CaseStudy = {
  slug: string;
  name: string;
  kind: string;
  /** Omitted when the dates are not public; the UI hides the row. */
  period?: string;
  role: string;
  url?: string;
  /** `main` cases are full scenes on the home page; `earlier` ones are listed in the index. */
  tier: "main" | "earlier";
  /** The one rule this product must never break. */
  invariant: string;
  summary: string;
  /** My part, in one sentence, as stated in the CV. */
  contribution: string;
  /** The hard part, in one sentence. */
  challenge: string;
  stack: string[];
  /** Add `{ title, body }` entries here and they render automatically on the case page. */
  sections: CaseSection[];
  seoDescription: string;
};

export type Layer = {
  id: LayerId;
  name: string;
  claim: string;
  tools: string[];
  points: { text: string; ref: string }[];
};

export type Dictionary = {
  meta: { title: string; description: string; ogTagline: string };
  nav: {
    layers: string;
    work: string;
    record: string;
    contact: string;
    cv: string;
    skip: string;
    menu: string;
    close: string;
    langLabel: string;
    home: string;
  };
  hero: {
    name: string;
    role: string;
    statement: string;
    status: string;
    primary: string;
    canvasLabel: string;
    loading: string;
  };
  /** Three short lines revealed one by one while the tokens fall into order, then one sentence. */
  manifest: { lines: string[]; body: string };
  layers: { title: string; intro: string; toolsLabel: string; items: Layer[] };
  work: {
    title: string;
    intro: string;
    cases: CaseStudy[];
    caseCta: string;
    live: string;
    mustHold: string;
    myPart: string;
    hardPart: string;
    layersLabel: string;
    stackLabel: string;
    moreTitle: string;
    also: { name: string; text: string; url: string }[];
  };
  record: {
    title: string;
    intro: string;
    /** Figures that are true as stated: dates and counts taken from the CV and this site. */
    stats: { v: string; k: string }[];
    rows: { period: string; title: string; place: string; text: string; slugs?: string[] }[];
    educationLabel: string;
    education: { period: string; title: string; place: string };
  };
  contact: {
    title: string;
    text: string;
    write: string;
    copy: string;
    copied: string;
    cvEn: string;
    cvEs: string;
    availability: string;
    location: string;
    elsewhere: string;
  };
  caseUi: {
    back: string;
    role: string;
    period: string;
    stack: string;
    layers: string;
    visit: string;
    next: string;
    contactCta: string;
  };
  footer: { rights: string; top: string; built: string };
  notFound: { title: string; text: string; back: string };
};
