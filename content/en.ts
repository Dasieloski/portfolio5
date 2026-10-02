import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Dasiel Torres — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer based in Cuba, working remotely. Booking platforms, e-commerce, SaaS and payment products — from the database to the interface to the deploy.",
    ogTagline: "Whole products, end to end.",
  },
  nav: {
    work: "Work",
    stack: "Layers",
    lab: "Lab",
    contact: "Contact",
    hire: "Hire me",
    skip: "Skip to content",
    langLabel: "Language",
  },
  hero: {
    eyebrow: "Full-Stack Software Engineer",
    line1: "Whole products,",
    line2: "end to end.",
    lede: "From the problem to the database, the interface, the payment and the deploy. Based in Cuba, working remotely.",
    primary: "Start a conversation",
    secondary: "See the work",
    location: "Based in Cuba, working remotely",
  },
  work: {
    title: "Selected work",
    intro: "Real products, real users, real money moving through them.",
    featured: {
      name: "Supernova & ACR",
      kind: "Payments · Fintech",
      period: "Most recent",
      role: "Software Engineer",
      text: "Product work across Supernova as a payment gateway, ACR Pay, ACR Card and the ACR Card app — including integrations with banks and financial services. Details are shared in conversation.",
      tags: ["Payment gateway", "Cards", "Bank integrations"],
      cta: "Ask me about it",
    },
    cases: [
      {
        slug: "habaluna",
        name: "Habaluna",
        kind: "Tourism booking platform",
        period: "Dec 2024 – Mar 2025",
        role: "Solo engineer",
        url: "https://habaluna.com",
        summary:
          "A live booking platform for Cuba's tourism sector, built and run end to end by one engineer.",
        stack: ["Next.js", "React", "PostgreSQL", "Prisma", "Strapi", "Vercel"],
        seoDescription:
          "Case study: Habaluna, a tourism booking platform for the Cuban market — real-time availability, mobile-first booking and an operator back office, built solo.",
        sections: [
          {
            title: "Context",
            body: [
              "Habaluna is a live booking platform serving Cuba's tourism sector: a public catalog, a booking and payment flow, and a back office for the operators who list and run the offers.",
            ],
          },
          {
            title: "My responsibility",
            body: [
              "I was the only engineer. Product decisions, architecture, UX/UI, backend and infrastructure were all mine, from the first schema to the production environment.",
            ],
          },
          {
            title: "Architecture",
            body: [
              "Next.js 14 App Router mixing React Server Components and Client Components, PostgreSQL through Prisma, and Strapi as a headless CMS. The split is deliberate: booking logic is dynamic and transactional, while operator-managed content lives in the CMS, so each side changes without touching the other.",
            ],
          },
          {
            title: "The hard part: availability",
            body: [
              "Two people can request the same dates at the same moment. I built a real-time availability engine with atomic conflict detection, so concurrent reservation requests can't produce a double booking — without making the response slow.",
            ],
          },
          {
            title: "Experience & operations",
            body: [
              "Mobile-first from catalog browsing to booking to payment. A full back office lets operators manage listings, availability and pricing without engineering involvement.",
              "I handled the deployment pipeline too: Vercel for frontend and API routes, database provisioning, environment management and production monitoring from day one.",
            ],
          },
        ],
      },
      {
        slug: "gym-victoria",
        name: "Gym Victoria",
        kind: "Multi-tenant SaaS",
        period: "Aug – Dec 2024",
        role: "Full-stack engineer · freelance",
        summary:
          "A multi-location gym management SaaS designed and built from zero: members, trainers and tiered plans.",
        stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
        seoDescription:
          "Case study: Gym Victoria, a multi-tenant gym SaaS with role-based auth, a relational schema for members, trainers, memberships and payments, and zero-downtime CI/CD.",
        sections: [
          {
            title: "Context",
            body: [
              "A gym SaaS that supports member registration, trainer assignment and tiered membership plans across multiple locations.",
            ],
          },
          {
            title: "Data model",
            body: [
              "I designed the full relational schema — members, trainers, memberships, payments — with referential integrity, so query bottlenecks and inconsistent states were designed out before reaching production.",
            ],
          },
          {
            title: "Auth without shortcuts",
            body: [
              "Role-based access for admin, trainer and member, with secure server-side session management. I implemented it directly instead of reaching for an auth library.",
            ],
          },
          {
            title: "Delivery",
            body: [
              "A Tailwind-optimized interface with sub-2-second page loads, deployed to Vercel with automated zero-downtime CI/CD on every push.",
            ],
          },
        ],
      },
      {
        slug: "mk-tattoo-supply",
        name: "MK Tattoo Supply",
        kind: "E-commerce",
        period: "Dec 2023 – Feb 2024",
        role: "Full-stack engineer · freelance",
        summary:
          "An e-commerce platform with live inventory, order processing and payment integration — from zero to production in eight weeks.",
        stack: ["Next.js", "Strapi", "REST API"],
        seoDescription:
          "Case study: MK Tattoo Supply, a Next.js and Strapi e-commerce platform with real-time stock control that prevents overselling and a no-code admin for 200+ SKUs.",
        sections: [
          {
            title: "Context",
            body: [
              "A full-stack e-commerce platform on Next.js and Strapi (headless CMS) handling live inventory, order processing and a payment API integration. From nothing to production in eight weeks.",
            ],
          },
          {
            title: "The hard part: overselling",
            body: [
              "With concurrent orders, naive stock checks sell the same unit twice. I engineered real-time stock control that prevents overselling, protecting both revenue and customer trust.",
            ],
          },
          {
            title: "Operating it without engineers",
            body: [
              "I delivered a no-code admin dashboard so non-technical staff can manage 200+ SKUs, orders and fulfillment on their own.",
            ],
          },
        ],
      },
    ],
    caseCta: "Read case study",
    alsoTitle: "Also shipped",
    also: [
      {
        name: "El Friñon",
        text: "E-commerce for parts and accessories, with multiple roles, a point of sale and warehouse management.",
        url: "https://variedadeselfrinon.vercel.app",
      },
      {
        name: "MotoMarket",
        text: "Marketplace for buying and selling motorcycles in Cuba. In development.",
        url: "https://motomarket-three.vercel.app",
      },
    ],
  },
  stack: {
    title: "Anatomy of a product",
    hint: "Pick a dot to see where, and how.",
    empty: "Nothing yet. Pick a dot.",
    recent: "Most recent",
    intro:
      "Breadth isn't a list of logos. It's the layers a product needs to work, and where I've had to get each one right.",
    layers: [
      {
        id: "product",
        name: "Product",
        claim: "I own the decisions, not just the tickets.",
        points: [
          { text: "Product decisions, architecture and UX/UI as the sole engineer on a live booking platform.", ref: "Habaluna" },
          { text: "Back-office tools that let non-technical staff run operations without engineering — including 200+ SKUs.", ref: "MK Tattoo Supply" },
        ],
      },
      {
        id: "interface",
        name: "Interface",
        claim: "Mobile-first flows, from catalog to checkout.",
        points: [
          { text: "Catalog, booking and payment flows designed mobile-first, end to end.", ref: "Habaluna" },
          { text: "React Server Components and Client Components used where each one fits.", ref: "Habaluna" },
          { text: "Sub-2-second page loads on a Tailwind-optimized interface.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "api",
        name: "API & logic",
        claim: "Boundaries that stay clean as things grow.",
        points: [
          { text: "Booking logic separated from operator-managed content with a headless CMS.", ref: "Habaluna" },
          { text: "Role-based auth (admin, trainer, member) with server-side sessions, built without an auth library.", ref: "Gym Victoria" },
          { text: "REST APIs with Node.js, NestJS and Strapi.", ref: "Across projects" },
        ],
      },
      {
        id: "data",
        name: "Data",
        claim: "Correct under concurrency.",
        points: [
          { text: "Availability engine with atomic conflict detection: no double bookings under concurrent requests.", ref: "Habaluna" },
          { text: "Real-time stock control that prevents overselling.", ref: "MK Tattoo Supply" },
          { text: "Relational schema with referential integrity for members, trainers, memberships and payments (PostgreSQL, Prisma).", ref: "Gym Victoria" },
        ],
      },
      {
        id: "money",
        name: "Money",
        claim: "Where a bug costs real money.",
        points: [
          { text: "Payment API integration in a live e-commerce platform.", ref: "MK Tattoo Supply" },
          { text: "Payment processing inside a booking flow.", ref: "Habaluna" },
          { text: "Payment products: Supernova as a gateway, ACR Pay, ACR Card and its app, with bank and financial-service integrations.", ref: "Supernova & ACR" },
        ],
      },
      {
        id: "delivery",
        name: "Delivery",
        claim: "Shipped, and kept running.",
        points: [
          { text: "Deployments, database provisioning, environment management and production monitoring from day one.", ref: "Habaluna" },
          { text: "Automated zero-downtime CI/CD on every push.", ref: "Gym Victoria" },
        ],
      },
    ],
  },
  path: {
    title: "Path",
    about: [
      "I started professionally in 2023 and have worked across the whole stack ever since: frontend, backend, architecture, APIs, databases, integrations and product.",
      "I'm a computer science engineer (UCI). I like the problems where several disciplines meet — and being the person who can follow them wherever they lead.",
    ],
    rows: [
      {
        period: "Most recent",
        title: "Software Engineer",
        place: "Supernova & ACR ecosystem",
        text: "Payment gateway, ACR Pay, ACR Card and the ACR Card app. Real money, bank and financial-service integrations.",
      },
      {
        period: "Dec 2024 – Mar 2025",
        title: "Solo engineer",
        place: "Habaluna",
        text: "Tourism booking platform: product, architecture, UX/UI, backend and infrastructure.",
      },
      {
        period: "Aug – Dec 2024",
        title: "Full-stack engineer (freelance)",
        place: "Gym Victoria",
        text: "Multi-tenant gym SaaS: schema, role-based auth, CI/CD.",
      },
      {
        period: "Dec 2023 – Feb 2024",
        title: "Full-stack engineer (freelance)",
        place: "MK Tattoo Supply",
        text: "E-commerce with live inventory, orders and payments, in eight weeks.",
      },
    ],
    educationLabel: "Education",
    education: {
      period: "Sep 2018 – Dec 2023",
      title: "B.Eng. in Computer Science",
      place: "Universidad de Ciencias Informáticas (UCI), Havana",
    },
  },
  lab: {
    title: "Lab",
    intro: "Small experiments, kept apart from the professional work.",
    items: [
      {
        name: "Sudoku Web App",
        period: "Jul – Aug 2024",
        text: "Interactive Sudoku with a procedural board generator and a real-time validation engine. Responsive, built with React and Tailwind.",
        href: "https://github.com/Dasieloski",
      },
      {
        name: "This site",
        period: "2026",
        text: "Next.js, plain CSS and SVG. The scroll transitions are CSS scroll-driven animations, with no animation library.",
      },
    ],
  },
  contact: {
    title: "Let's build something.",
    text: "I'm open to remote roles and relocation. If there's a product that needs someone who can follow the problem across the stack, write to me.",
    copy: "Copy email",
    copied: "Copied",
    cv: "Download CV (PDF)",
    availability: "Open to remote & relocation",
    location: "Based in Cuba, working remotely",
  },
  vis: {
    note: "Conceptual illustration of the problem, not a screenshot.",
    pay: {
      title: "A payment, end to end",
      amount: "Amount",
      nodes: [
        { label: "App", text: "A person confirms a payment.", status: "Confirm payment" },
        { label: "API", text: "The request is authenticated and validated.", status: "Validating" },
        { label: "Gateway", text: "It is routed through the payment gateway.", status: "Routing" },
        { label: "Bank", text: "A bank or financial service authorizes it.", status: "Authorizing" },
        { label: "Ledger", text: "The outcome is recorded.", status: "Recording" },
        { label: "Card & wallet", text: "The balance reflects the result.", status: "Done" },
      ],
    },
    avail: {
      title: "Two guests, same dates",
      run: "Send both at once",
      reset: "Reset",
      a: "Request A",
      b: "Request B",
      idle: "Two guests ask for the same dates at the same moment.",
      land: "Both requests arrive together.",
      lock: "The availability engine checks atomically.",
      won: "Request A is confirmed.",
      lost: "Request B gets a conflict. No double booking.",
    },
    stock: {
      title: "One unit left",
      run: "Order the last unit twice",
      reset: "Reset",
      skus: "SKUs",
      idle: "One unit left. Two orders arrive together.",
      lock: "Stock is checked atomically.",
      done: "Order A is placed. Order B sees it sold out. No overselling.",
    },
    schema: {
      title: "The schema",
      hint: "Hover a table to follow its relations.",
      roles: "Role-based access",
      nodes: { location: "Locations", members: "Members", trainers: "Trainers", memberships: "Memberships", payments: "Payments" },
      edges: { assigned: "assigned to", holds: "holds", settles: "settled by", tenant: "belongs to" },
    },
  },
  caseUi: {
    back: "All work",
    role: "Role",
    period: "Period",
    stack: "Layers",
    visit: "Visit the live site",
    next: "Next case study",
    breadcrumbHome: "Home",
    contactCta: "Talk about a project like this",
    architecture: "Architecture",
    visualLabel: "Interactive illustration",
  },
  footer: { rights: "© 2026 Dasiel Torres", top: "Back to top" },
  notFound: {
    title: "Page not found",
    text: "That page doesn't exist — but the work does.",
    back: "Back to home",
  },
};

export default en;
