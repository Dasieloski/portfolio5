import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Dasiel Torres — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer based in Cuba, working remotely. Payment gateway, card and top-up platforms, e-commerce and SaaS — from the database to the interface to the deploy.",
    ogTagline: "Whole products, end to end.",
  },
  nav: {
    work: "Work",
    stack: "Stack",
    path: "Path",
    lab: "Lab",
    contact: "Contact",
    hire: "Hire me",
    skip: "Skip to content",
    langLabel: "Language",
  },
  hero: {
    role: "Full-Stack Software Engineer",
    eyebrow: "Full-Stack Software Engineer · Based in Cuba, working remotely",
    line1: "Whole products,",
    line2: "end to end.",
    lede: "From the problem to the database, the interface, the payment and the deploy.",
    primary: "Start a conversation",
    secondary: "See the work",
  },
  work: {
    title: "Four products,",
    titleEm: "four things that can’t break.",
    intro: "Payments products with real users, newest first.",
    cases: [
      {
        slug: "acr-card",
        name: "ACR Card",
        kind: "Card issuing platform",
        tier: "main",
        role: "Software Engineer",
        invariant: "One request, one card.",
        summary: "A platform where people request Visa and Mastercard cards, part of the Supernova & ACR ecosystem.",
        stack: [],
        seoDescription:
          "Case study: ACR Card, a platform to request Visa and Mastercard cards, part of the Supernova & ACR payments ecosystem.",
        sections: [
          {
            title: "Context",
            body: [
              "ACR Card is a platform to request Visa and Mastercard cards. It sits in the Supernova & ACR ecosystem, next to the payment gateway, ACR Pay and the card management app.",
            ],
          },
          {
            title: "What the product does",
            body: [
              "A person chooses a card network, submits a request and follows it until the card exists. Behind that single screen is a flow with real consequences: an application that moves through clear states, personal data that has to be handled with care, and an outcome that must never be ambiguous.",
            ],
          },
          {
            title: "The hard part: a request that can't get lost",
            body: [
              "Requests cross several systems and any step can fail halfway. The work is making every request end in exactly one state — approved, rejected or pending — so nobody is issued two cards and nobody waits on a request that silently disappeared.",
            ],
          },
        ],
      },
      {
        slug: "acr-card-app",
        name: "ACR Card App",
        kind: "Card management app",
        tier: "main",
        role: "Software Engineer",
        invariant: "A transfer lands once, on the right card.",
        summary: "A platform to manage ACR cards: review transactions and move money between cards.",
        stack: [],
        seoDescription:
          "Case study: the ACR Card app, a platform to manage ACR cards, review transactions and transfer money between cards.",
        sections: [
          {
            title: "Context",
            body: [
              "app.acr-card is where cardholders manage their cards: review transactions, transfer between ACR cards and more.",
            ],
          },
          {
            title: "What the product does",
            body: [
              "Day to day it is a financial interface: a transaction history that has to be accurate and fast, and transfers where money leaves one card and arrives on another.",
            ],
          },
          {
            title: "The hard part: two balances, one transfer",
            body: [
              "A transfer changes two balances. Both changes must happen together or not at all, even if a request is retried or the connection drops. That rule shapes the data model, the API and what the interface shows while it waits.",
            ],
          },
        ],
      },
      {
        slug: "supernova-gateway",
        name: "Supernova Payment Gateway",
        kind: "Payment gateway",
        tier: "main",
        role: "Software Engineer",
        invariant: "Every payment ends in one clear outcome.",
        summary: "Supernova's payment gateway, with integrations to banks and financial services.",
        stack: [],
        seoDescription:
          "Case study: the Supernova payment gateway, with integrations to banks and financial services, in the Supernova & ACR ecosystem.",
        sections: [
          {
            title: "Context",
            body: [
              "A payment gateway sits between a product that wants to charge someone and the banks and financial services that move the money. Supernova is that gateway, and it is part of the Supernova & ACR ecosystem.",
            ],
          },
          {
            title: "The hard part: payments that fail halfway",
            body: [
              "Payments cross networks that fail halfway. A gateway has to turn every attempt into exactly one outcome — paid or not paid — and keep its records in agreement with the bank's. Retries, timeouts and duplicates are the normal case, not the exception.",
            ],
          },
          {
            title: "Integrations",
            body: [
              "Each bank or financial service has its own protocol and its own failure modes. The job is keeping those differences behind one clean interface for the products that charge through the gateway.",
            ],
          },
        ],
      },
      {
        slug: "acr-pay",
        name: "ACR Pay",
        kind: "Top-up platform",
        tier: "main",
        role: "Software Engineer",
        invariant: "A top-up is credited once, to the right target.",
        summary: "A platform to top up classic cards and mobile phones in Cuba.",
        stack: [],
        seoDescription:
          "Case study: ACR Pay, a platform to top up classic cards and mobile phones in Cuba, part of the Supernova & ACR ecosystem.",
        sections: [
          {
            title: "Context",
            body: [
              "ACR Pay is a platform to top up classic cards and mobile phones in Cuba, inside the Supernova & ACR ecosystem.",
            ],
          },
          {
            title: "Two kinds of target",
            body: [
              "Topping up a classic card and topping up a phone line are different operations with different confirmation paths. The platform presents them as one simple action.",
            ],
          },
          {
            title: "The hard part: money in motion",
            body: [
              "A top-up is money in motion: if a confirmation is slow or repeated, the credit must still land exactly once. Making retries safe is what keeps people's trust.",
            ],
          },
        ],
      },
      {
        slug: "gym-victoria",
        name: "Gym Victoria",
        kind: "Multi-tenant SaaS",
        tier: "earlier",
        period: "Aug – Dec 2024",
        role: "Full-stack engineer · freelance",
        invariant: "No orphan records.",
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
        tier: "earlier",
        period: "Dec 2023 – Feb 2024",
        role: "Full-stack engineer · freelance",
        invariant: "One unit, sold once.",
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
    earlierTitle: "Earlier work",
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
    intro: "The layers a product needs, and where I've had to get each one right.",
    layers: [
      {
        id: "product",
        name: "Product",
        claim: "I own the decisions, not just the tickets.",
        points: [
          { text: "Gateway, top-ups, card issuing and a card app, working as one ecosystem.", ref: "Supernova & ACR" },
          { text: "Admin tools so non-technical staff run 200+ SKUs.", ref: "MK Tattoo Supply" },
        ],
      },
      {
        id: "interface",
        name: "Interface",
        claim: "Clear flows where people handle their money.",
        points: [
          { text: "Card management: transactions and transfers.", ref: "ACR Card App" },
          { text: "The flow to request a Visa or Mastercard.", ref: "ACR Card" },
          { text: "Pages that load in under two seconds.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "api",
        name: "API & logic",
        claim: "Boundaries that stay clean as things grow.",
        points: [
          { text: "Bank and financial-service integrations behind one gateway.", ref: "Supernova" },
          { text: "Role-based auth with server-side sessions.", ref: "Gym Victoria" },
          { text: "REST APIs with Node.js, NestJS and Strapi.", ref: "Across projects" },
        ],
      },
      {
        id: "data",
        name: "Data",
        claim: "Correct under concurrency.",
        points: [
          { text: "Real-time stock control: no overselling.", ref: "MK Tattoo Supply" },
          { text: "Relational schema with referential integrity.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "money",
        name: "Money",
        claim: "Where a bug costs real money.",
        points: [
          { text: "A payment gateway with bank integrations.", ref: "Supernova" },
          { text: "Top-ups for classic cards and mobile phones.", ref: "ACR Pay" },
          { text: "Transfers between cards.", ref: "ACR Card App" },
          { text: "A payment API inside a live store.", ref: "MK Tattoo Supply" },
        ],
      },
      {
        id: "delivery",
        name: "Delivery",
        claim: "Shipped, and kept running.",
        points: [
          { text: "Zero-downtime CI/CD on every push.", ref: "Gym Victoria" },
          { text: "From zero to production in eight weeks.", ref: "MK Tattoo Supply" },
        ],
      },
    ],
  },
  path: {
    title: "Path",
    profile: {
      title: "At a glance",
      rows: [
        { k: "Role", v: "Full-Stack Software Engineer" },
        { k: "Based in", v: "Cuba, working remotely" },
        { k: "Experience", v: "Professional work since 2023" },
        { k: "Focus", v: "Frontend, backend, APIs, databases, integrations, payments and fintech" },
        { k: "Recent work", v: "Supernova payment gateway, ACR Pay, ACR Card and the ACR Card app" },
      ],
    },
    about: [
      "Working across the whole stack since 2023: frontend, backend, data, integrations and product. Computer science engineer (UCI).",
    ],
    rows: [
      {
        period: "Most recent",
        title: "Software Engineer",
        place: "Supernova & ACR ecosystem",
        text: "Payment gateway, ACR Pay, ACR Card and the ACR Card app. Real money, bank and financial-service integrations.",
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
        text: "Variable-font type you can play with, scroll-driven reveals in plain CSS, one 3D payment card, and no animation libraries.",
      },
    ],
  },
  contact: {
    title: "Let's build something.",
    text: "I'm open to remote roles and relocation. If there's a product that needs someone who can follow the problem across the stack, write to me.",
    copy: "Copy email",
    copied: "Copied",
    cvEn: "Download CV (PDF, English)",
    cvEs: "Download CV (PDF, Spanish)",
    availability: "Open to remote & relocation",
    location: "Based in Cuba, working remotely",
  },
  vis: {
    note: "Conceptual illustration of the problem, not a screenshot.",
    gateway: {
      title: "One gateway, many routes",
      run: "Send a payment",
      busy: "Routing…",
      idle: "Payments come in from many places and leave to many banks.",
      done: "Authorized once and recorded once.",
      from: ["Product A", "Product B", "Product C"],
      gateway: "Gateway",
      to: ["Bank A", "Financial service", "Bank B"],
    },
    topup: {
      title: "A top-up",
      run: "Top up",
      busy: "Crediting…",
      reset: "Reset",
      idle: "Pick a target and top it up.",
      done: "Credited once. The balance shows it.",
      card: "Classic card",
      phone: "Mobile line",
    },
    issue: {
      title: "A card request",
      run: "Request card",
      busy: "In review…",
      reset: "Reset",
      idle: "Pick a network and request a card.",
      done: "Issued. One request, one card.",
      steps: ["Request", "Review", "Issued"],
      visa: "Visa",
      mastercard: "Mastercard",
    },
    app: {
      title: "Between two cards",
      run: "Transfer",
      busy: "Moving…",
      reset: "Reset",
      idle: "Two cards. One transfer.",
      done: "Both balances changed together.",
      a: "Card A",
      b: "Card B",
      list: "Transactions",
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
    axes: { title: "Type, as an instrument", width: "Width", weight: "Weight", sample: "Product" },
  },
  caseUi: {
    back: "All work",
    role: "Role",
    period: "Period",
    stack: "Stack",
    visit: "Visit the live site",
    next: "Next case study",
    breadcrumbHome: "Home",
    contactCta: "Talk about a project like this",
    architecture: "Architecture",
    visualLabel: "Interactive illustration",
    mustHold: "Must hold",
  },
  footer: { rights: "© 2026 Dasiel Torres", top: "Back to top" },
  notFound: {
    title: "Page not found",
    text: "That page doesn't exist — but the work does.",
    back: "Back to home",
  },
};

export default en;
