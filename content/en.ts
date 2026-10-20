import type { Dictionary } from "./types";
import cases from "./cases.en";

const en: Dictionary = {
  meta: {
    title: "Dasiel Torres | Full-Stack Developer: TypeScript, Next.js, Node.js",
    description:
      "Dasiel Torres, full-stack developer (TypeScript, React, Next.js, Node.js, NestJS) working remotely from Cuba. Fintech, payment gateway, cards, e-commerce and SaaS.",
    ogTagline: "Reliable software for the moment money moves.",
  },
  nav: {
    layers: "Expertise",
    work: "Work",
    record: "Experience",
    contact: "Contact",
    cv: "CV",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    langLabel: "Language",
    home: "Dasiel Torres, home",
  },
  hero: {
    name: "Dasiel Torres",
    role: "Full-Stack Software Engineer, Payments & Fintech",
    statement: "Full-stack engineer specialised in payment systems: interfaces, APIs, data models and banking integrations.",
    status: "Available for remote positions",
    primary: "View selected work",
    canvasLabel: "Glossy tokens that float, respond to the cursor and arrange themselves into each product while scrolling.",
    loading: "Loading",
  },
  manifest: {
    lines: ["Every payment is a commitment.", "It must be completed.", "Exactly once."],
    body: "My work focuses on products where money moves, developed end to end: from the interface a customer uses to the banking systems on the other side.",
  },
  layers: {
    title: "Expertise across the full stack.",
    intro: "The layers of a software product, and the work I have delivered in each of them.",
    toolsLabel: "Tools",
    items: [
      {
        id: "product",
        name: "Product",
        claim: "Ownership of product and technical decisions.",
        tools: ["Product decisions", "UX/UI"],
        points: [
          { text: "A payment gateway, top-ups, card issuing and a card application operating as one ecosystem.", ref: "Supernova & ACR" },
          { text: "Product, architecture and UX/UI of an online store, as its sole engineer.", ref: "Habaluna" },
        ],
      },
      {
        id: "interface",
        name: "Interface",
        claim: "Clear, dependable flows for financial operations.",
        tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        points: [
          { text: "Card management: transaction history and transfers.", ref: "ACR Card App" },
          { text: "The request flow for Visa and Mastercard cards.", ref: "ACR Card" },
          { text: "Page loads under two seconds.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "api",
        name: "API & logic",
        claim: "Well-defined boundaries that hold as the product grows.",
        tools: ["Node.js", "NestJS", "REST", "Strapi"],
        points: [
          { text: "Bank and financial-service integrations behind a single gateway.", ref: "Supernova" },
          { text: "Role-based authentication with server-side sessions, without an auth library.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "data",
        name: "Data",
        claim: "Consistency under concurrent load.",
        tools: ["PostgreSQL", "Prisma", "Redis", "SQL"],
        points: [
          { text: "Real-time stock control that prevents overselling.", ref: "MK Tattoo Supply" },
          { text: "Inventory and order management for a production store.", ref: "Habaluna" },
          { text: "A relational schema with referential integrity.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "money",
        name: "Payments",
        claim: "Systems in which an error carries a financial cost.",
        tools: ["Banking integrations", "Payment APIs"],
        points: [
          { text: "A payment gateway with banking integrations.", ref: "Supernova" },
          { text: "Top-ups for classic cards and mobile phones.", ref: "ACR Pay" },
          { text: "Store payments processed through the Supernova gateway.", ref: "Habaluna" },
        ],
      },
      {
        id: "delivery",
        name: "Delivery",
        claim: "Reliable deployment and operation in production.",
        tools: ["Vercel", "CI/CD", "Git", "GitHub"],
        points: [
          { text: "Zero-downtime CI/CD on every push.", ref: "Gym Victoria" },
          { text: "Delivered to production in eight weeks.", ref: "MK Tattoo Supply" },
        ],
      },
    ],
  },
  work: {
    title: "Selected work",
    intro: "Five products in reverse chronological order, each defined by the guarantee it must uphold.",
    cases,
    caseCta: "Read the case study",
    live: "Live site",
    mustHold: "Guarantee",
    myPart: "Contribution",
    hardPart: "Key challenge",
    layersLabel: "Scope",
    stackLabel: "Technologies",
    moreTitle: "Additional projects",
    also: [
      {
        name: "El Friñon",
        text: "E-commerce for parts and accessories, with user roles, a point of sale and warehouse management.",
        url: "https://variedadeselfrinon.vercel.app",
      },
      {
        name: "MotoMarket",
        text: "A marketplace for buying and selling motorcycles in Cuba. Currently in development.",
        url: "https://motomarket-three.vercel.app",
      },
    ],
  },
  record: {
    title: "Professional experience",
    intro: "In reverse chronological order.",
    stats: [
      { v: "2023", k: "Developing software professionally since" },
      { v: "4", k: "Payment products in the Supernova & ACR ecosystem" },
      { v: "7", k: "Products documented as case studies" },
    ],
    rows: [
      {
        period: "2026 - Present",
        title: "Software Engineer",
        place: "Supernova & ACR",
        text: "Payment gateway, ACR Pay, ACR Card and the ACR Card application. Web interfaces, backend services, APIs and banking integrations.",
        slugs: ["supernova-gateway", "acr-pay", "acr-card", "acr-card-app"],
      },
      {
        period: "Dec 2024 - Mar 2025",
        title: "Sole engineer (freelance)",
        place: "Habaluna, Luna S.U.R.L",
        text: "An online store delivered end to end: catalogue, cart, payments through Supernova, inventory, orders and administration.",
        slugs: ["habaluna"],
      },
      {
        period: "Aug - Dec 2024",
        title: "Full-stack engineer (freelance)",
        place: "Gym Victoria",
        text: "Multi-tenant gym management SaaS: data model, role-based authentication and CI/CD.",
        slugs: ["gym-victoria"],
      },
      {
        period: "Dec 2023 - Feb 2024",
        title: "Full-stack engineer (freelance)",
        place: "MK Tattoo Supply",
        text: "E-commerce platform with live inventory, orders and payments, delivered in eight weeks.",
        slugs: ["mk-tattoo-supply"],
      },
    ],
    educationLabel: "Education",
    education: {
      period: "Sep 2018 - Dec 2023",
      title: "B.Eng. in Computer Science",
      place: "Universidad de las Ciencias Informáticas (UCI), Havana",
    },
  },
  contact: {
    title: "I am currently considering new opportunities.",
    text: "I am most effective in teams that need an engineer able to take a problem from the user interface through to the banking integration. Please write to the address below.",
    write: "Contact",
    copy: "Copy address",
    copied: "Address copied",
    cvEn: "CV in English",
    cvEs: "CV in Spanish",
    availability: "Available for remote positions and relocation",
    location: "Based in Cuba, working remotely",
    elsewhere: "Profiles",
  },
  caseUi: {
    back: "All work",
    role: "Role",
    period: "Period",
    stack: "Technologies",
    layers: "Scope",
    visit: "Visit the live site",
    next: "Next case study",
    contactCta: "Discuss a similar product",
  },
  footer: { rights: "© 2026 Dasiel Torres", top: "Back to top", built: "Built with Next.js and Three.js" },
  notFound: {
    title: "Page not found",
    text: "The page you requested does not exist or has been moved.",
    back: "Return to the home page",
  },
};

export default en;
