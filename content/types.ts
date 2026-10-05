export type CaseSection = { title: string; body: string[] };

export type CaseStudy = {
  slug: string;
  name: string;
  kind: string;
  /** Omitted when the dates are not public; the UI hides the row. */
  period?: string;
  role: string;
  url?: string;
  /** `main` cases get a full plate on the home page; `earlier` ones are listed compactly. */
  tier: "main" | "earlier";
  /** The one line that must never break in this product. */
  invariant: string;
  summary: string;
  stack: string[];
  /** Add `{ title, body }` entries here (challenges, learnings, results…) and they render automatically. */
  sections: CaseSection[];
  seoDescription: string;
};

export type Layer = {
  id: string;
  name: string;
  claim: string;
  points: { text: string; ref: string }[];
};

export type Visuals = {
  note: string;
  gateway: { title: string; run: string; busy: string; idle: string; done: string; from: string[]; gateway: string; to: string[] };
  topup: { title: string; run: string; busy: string; reset: string; idle: string; done: string; card: string; phone: string };
  issue: { title: string; run: string; busy: string; reset: string; idle: string; done: string; steps: string[]; visa: string; mastercard: string };
  app: { title: string; run: string; busy: string; reset: string; idle: string; done: string; a: string; b: string; list: string };
  stock: { title: string; run: string; reset: string; skus: string; idle: string; lock: string; done: string };
  schema: { title: string; hint: string; roles: string; nodes: Record<"location" | "members" | "trainers" | "memberships" | "payments", string>; edges: Record<"assigned" | "holds" | "settles" | "tenant", string> };
  axes: { title: string; width: string; weight: string; sample: string };
};

export type Dictionary = {
  meta: { title: string; description: string; ogTagline: string };
  nav: { work: string; stack: string; path: string; lab: string; contact: string; hire: string; skip: string; langLabel: string };
  hero: {
    role: string;
    eyebrow: string;
    line1: string;
    line2: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  work: {
    title: string;
    titleEm: string;
    intro: string;
    cases: CaseStudy[];
    caseCta: string;
    earlierTitle: string;
    alsoTitle: string;
    also: { name: string; text: string; url: string }[];
  };
  stack: { title: string; intro: string; layers: Layer[] };
  path: {
    title: string;
    profile: { title: string; rows: { k: string; v: string }[] };
    about: string[];
    rows: { period: string; title: string; place: string; text: string }[];
    educationLabel: string;
    education: { period: string; title: string; place: string };
  };
  lab: { title: string; intro: string; items: { name: string; period: string; text: string; href?: string }[] };
  contact: {
    title: string;
    text: string;
    copy: string;
    copied: string;
    cvEn: string;
    cvEs: string;
    availability: string;
    location: string;
  };
  vis: Visuals;
  caseUi: {
    back: string;
    role: string;
    period: string;
    stack: string;
    visit: string;
    next: string;
    breadcrumbHome: string;
    contactCta: string;
    architecture: string;
    visualLabel: string;
    mustHold: string;
  };
  footer: { rights: string; top: string };
  notFound: { title: string; text: string; back: string };
};
