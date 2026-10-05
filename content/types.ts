export type CaseSection = { title: string; body: string[] };

export type CaseStudy = {
  slug: string;
  name: string;
  kind: string;
  period: string;
  role: string;
  url?: string;
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
  pay: { title: string; run: string; busy: string; nodes: { label: string; text: string }[] };
  avail: { title: string; run: string; reset: string; a: string; b: string; idle: string; land: string; lock: string; won: string; lost: string };
  stock: { title: string; run: string; reset: string; skus: string; idle: string; lock: string; done: string };
  schema: { title: string; hint: string; roles: string; nodes: Record<"location" | "members" | "trainers" | "memberships" | "payments", string>; edges: Record<"assigned" | "holds" | "settles" | "tenant", string> };
  axes: { title: string; width: string; weight: string; sample: string };
};

export type Dictionary = {
  meta: { title: string; description: string; ogTagline: string };
  nav: { work: string; stack: string; path: string; lab: string; contact: string; hire: string; skip: string; langLabel: string };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  work: {
    title: string;
    intro: string;
    featured: { name: string; kind: string; period: string; role: string; text: string; tags: string[]; cta: string };
    cases: CaseStudy[];
    caseCta: string;
    alsoTitle: string;
    also: { name: string; text: string; url: string }[];
  };
  stack: { title: string; intro: string; layers: Layer[] };
  path: {
    title: string;
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
    cv: string;
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
  };
  footer: { rights: string; top: string };
  notFound: { title: string; text: string; back: string };
};
