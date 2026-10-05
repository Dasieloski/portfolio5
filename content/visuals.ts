/** Language-neutral architecture diagrams (technology names), keyed by case-study slug. */
export type ArchNode = { id: string; label: string; tier: 0 | 1 | 2; row: number };
export type Arch = { archSection: number; nodes: ArchNode[]; edges: [string, string][] };

export const ARCH: Record<string, Arch> = {
  "gym-victoria": {
    archSection: 1,
    nodes: [
      { id: "ui", label: "Next.js App Router", tier: 0, row: 0 },
      { id: "auth", label: "Role-based sessions", tier: 1, row: 0 },
      { id: "pg", label: "PostgreSQL", tier: 2, row: 0 },
      { id: "ci", label: "CI/CD → Vercel", tier: 1, row: 2 },
      { id: "tw", label: "Tailwind UI", tier: 0, row: 2 },
    ],
    edges: [["ui", "auth"], ["auth", "pg"], ["tw", "ui"], ["ci", "ui"]],
  },
  "mk-tattoo-supply": {
    archSection: 0,
    nodes: [
      { id: "ui", label: "Next.js storefront", tier: 0, row: 0 },
      { id: "strapi", label: "Strapi headless CMS", tier: 1, row: 0 },
      { id: "stock", label: "Stock control", tier: 1, row: 1 },
      { id: "pay", label: "Payment API", tier: 2, row: 1 },
      { id: "admin", label: "No-code admin", tier: 0, row: 2 },
    ],
    edges: [["ui", "strapi"], ["ui", "stock"], ["stock", "pay"], ["admin", "strapi"]],
  },
};
