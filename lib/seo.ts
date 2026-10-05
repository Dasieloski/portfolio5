import { BASE_URL, CONTACT, type Locale } from "./site";

/** Bump when page content really changes; used by the sitemap instead of a build timestamp. */
export const CONTENT_UPDATED = "2026-10-05";

/** Only skills the site actually evidences (case studies, stack and path sections). */
const KNOWS_ABOUT = [
  "Full-stack development",
  "Frontend development",
  "Backend development",
  "APIs",
  "Databases",
  "System integrations",
  "Payment systems",
  "Fintech",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Strapi",
];

export const PERSON_ID = `${BASE_URL}/#person`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export const personNode = (description: string) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: CONTACT.name,
  url: BASE_URL,
  jobTitle: "Full-Stack Software Engineer",
  description,
  email: `mailto:${CONTACT.email}`,
  address: { "@type": "PostalAddress", addressCountry: "CU" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Ciencias Informáticas" },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Software Engineer",
    occupationLocation: { "@type": "Country", name: "Cuba" },
    skills: KNOWS_ABOUT.slice(0, 8).join(", "),
  },
  knowsAbout: KNOWS_ABOUT,
  sameAs: [CONTACT.github, CONTACT.linkedin].filter(Boolean),
});

export const websiteNode = (lang: Locale) => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: BASE_URL,
  name: CONTACT.name,
  // Reason: one WebSite entity serves every locale, so it declares all of them.
  inLanguage: ["en", "es"],
  publisher: { "@id": PERSON_ID },
  description: lang === "es" ? "Portfolio de Dasiel Torres, Ingeniero de Software Full-Stack." : "Portfolio of Dasiel Torres, Full-Stack Software Engineer.",
});

/** schema.org applicationCategory per case-study slug. */
export const APP_CATEGORY: Record<string, string> = {
  "acr-card": "FinanceApplication",
  "acr-card-app": "FinanceApplication",
  "supernova-gateway": "FinanceApplication",
  "acr-pay": "FinanceApplication",
  "gym-victoria": "BusinessApplication",
  "mk-tattoo-supply": "ShoppingApplication",
};
