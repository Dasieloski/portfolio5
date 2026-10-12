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

export type Dictionary = {
  meta: { title: string; description: string; ogTagline: string };
  nav: { work: string; stack: string; path: string; lab: string; contact: string; hire: string; skip: string;
    menu: string; langLabel: string };
  hero: {
    role: string;
    eyebrow: string;
    line1: string;
    line2: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  intro: { kicker: string; statement: string; emphasis: string[] };
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
  stack: { title: string; intro: string; hint: string; layersLabel: string; layers: Layer[] };
  path: {
    title: string;
    profile: { title: string; rows: { k: string; v: string }[] };
    about: string[];
    rows: { period: string; title: string; place: string; text: string; caseSlugs?: string[] }[];
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
    stepsLabel: string;
  };
  footer: { rights: string; top: string };
  notFound: { title: string; text: string; back: string };
};
