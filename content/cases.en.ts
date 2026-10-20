import type { CaseStudy } from "./types";

/** Every statement here comes from the CV or from the previous case studies. Newest first. */
const cases: CaseStudy[] = [
  {
    slug: "supernova-gateway",
    name: "Supernova Payment Gateway",
    kind: "Payment gateway",
    tier: "main",
    role: "Software Engineer",
    invariant: "Every payment ends in a single, unambiguous outcome.",
    summary: "The Supernova payment gateway, integrated with banks and financial service providers.",
    contribution: "Development and maintenance of the integrations with banks and financial service providers.",
    challenge: "Turning partially failed operations into a definitive result, reconciled with the bank's records.",
    stack: [],
    seoDescription:
      "Case study: the Supernova payment gateway, integrated with banks and financial service providers, within the Supernova & ACR ecosystem.",
    sections: [
      {
        title: "Context",
        body: [
          "A payment gateway sits between the products that charge customers and the banks and financial institutions that move the funds. Supernova fulfils that role within the Supernova & ACR ecosystem.",
        ],
      },
      {
        title: "Key challenge: partial failures",
        body: [
          "Payments travel across networks that can fail midway. The gateway must resolve every attempt into exactly one outcome, paid or not paid, and keep its records consistent with those of the bank. Retries, timeouts and duplicate requests are expected conditions, not exceptions.",
        ],
      },
      {
        title: "Integrations",
        body: [
          "Each bank and financial service provider has its own protocol and its own failure modes. The objective is to encapsulate those differences behind a single, consistent interface for the products that process payments through the gateway.",
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
    invariant: "Each top-up is credited once, to the correct destination.",
    summary: "A platform for topping up classic cards and mobile phones in Cuba.",
    contribution: "Development of the top-up flows across the web, API and database layers.",
    challenge: "Guaranteeing a single credit even when confirmations are delayed or repeated.",
    stack: [],
    seoDescription:
      "Case study: ACR Pay, a platform for topping up classic cards and mobile phones in Cuba, part of the Supernova & ACR ecosystem.",
    sections: [
      {
        title: "Context",
        body: ["ACR Pay is a platform for topping up classic cards and mobile phones in Cuba, within the Supernova & ACR ecosystem."],
      },
      {
        title: "Two types of destination",
        body: [
          "Topping up a classic card and topping up a mobile line are distinct operations with distinct confirmation paths. The platform presents both as a single, simple action.",
        ],
      },
      {
        title: "Key challenge: funds in transit",
        body: [
          "A top-up is a transfer of funds in progress. If a confirmation is delayed or repeated, the credit must still be applied exactly once. Making retries safe is what preserves customer trust.",
        ],
      },
    ],
  },
  {
    slug: "acr-card",
    name: "ACR Card",
    kind: "Card issuing platform",
    tier: "main",
    role: "Software Engineer",
    invariant: "One request, one card.",
    summary: "A platform for requesting Visa and Mastercard cards, part of the Supernova & ACR ecosystem.",
    contribution: "Contribution to the Visa and Mastercard request flow, across the web interface, backend services and APIs.",
    challenge: "Ensuring every request reaches exactly one final state: approved, rejected or pending.",
    stack: [],
    seoDescription:
      "Case study: ACR Card, a platform for requesting Visa and Mastercard cards, part of the Supernova & ACR payments ecosystem.",
    sections: [
      {
        title: "Context",
        body: [
          "ACR Card is a platform for requesting Visa and Mastercard cards. It is part of the Supernova & ACR ecosystem, alongside the payment gateway, ACR Pay and the card management application.",
        ],
      },
      {
        title: "Product scope",
        body: [
          "The customer selects a card network, submits a request and tracks it until the card is issued. Behind that interface is a process with real consequences: an application that moves through well-defined states, personal data that must be handled with care and an outcome that can never be ambiguous.",
        ],
      },
      {
        title: "Key challenge: no request may be lost",
        body: [
          "Requests pass through several systems and any step may fail midway. The work consists of ensuring that every request ends in exactly one state, approved, rejected or pending, so that no customer is issued two cards and no request disappears unnoticed.",
        ],
      },
    ],
  },
  {
    slug: "acr-card-app",
    name: "ACR Card App",
    kind: "Card management application",
    tier: "main",
    role: "Software Engineer",
    invariant: "Each transfer is applied once, to the correct card.",
    summary: "A platform for managing ACR cards: transaction history and transfers between cards.",
    contribution: "Development of card management, the transaction history and transfers between cards.",
    challenge: "Updating two balances atomically, including when a request is retried.",
    stack: [],
    seoDescription:
      "Case study: the ACR Card application, a platform for managing ACR cards, reviewing transactions and transferring funds between cards.",
    sections: [
      {
        title: "Context",
        body: ["app.acr-card is where cardholders manage their cards: they review transactions, transfer funds between ACR cards and more."],
      },
      {
        title: "Product scope",
        body: [
          "In daily use it is a financial interface: a transaction history that must be accurate and fast, and transfers in which funds leave one card and arrive on another.",
        ],
      },
      {
        title: "Key challenge: two balances, one transfer",
        body: [
          "A transfer modifies two balances. Both changes must succeed together or not at all, even if the request is retried or the connection is lost. That requirement shapes the data model, the API and what the interface displays while an operation is in progress.",
        ],
      },
    ],
  },
  {
    slug: "habaluna",
    name: "Habaluna",
    kind: "E-commerce for Luna S.U.R.L",
    tier: "main",
    period: "Dec 2024 - Mar 2025",
    role: "Sole engineer, freelance",
    invariant: "Each order is paid once and backed by available stock.",
    summary: "An online store offering a varied product catalogue for Luna S.U.R.L, with payments processed through the Supernova gateway.",
    contribution: "End-to-end ownership: product decisions, architecture, UX/UI, backend and infrastructure.",
    challenge: "Keeping catalogue, cart, checkout, payments, inventory and orders consistent, as the sole engineer.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Redis", "Vercel", "Supernova gateway"],
    seoDescription:
      "Case study: Habaluna, an e-commerce platform for Luna S.U.R.L built end to end by a single engineer with Next.js, PostgreSQL, Prisma and Redis, with payments through the Supernova gateway.",
    sections: [
      {
        title: "Context",
        body: [
          "Habaluna is the online store of Luna S.U.R.L, offering a varied product catalogue. I was the sole engineer, responsible for product decisions, architecture, UX/UI, backend and infrastructure.",
        ],
      },
      {
        title: "The store",
        body: ["A Next.js App Router architecture backed by PostgreSQL through Prisma, with Redis in the stack: product catalogue, cart and checkout."],
      },
      {
        title: "Payments, inventory and orders",
        body: [
          "Online payments are processed through the Supernova payment gateway. Inventory and order management keep track of what has been sold and what must be delivered.",
        ],
      },
      {
        title: "Operated by the client",
        body: [
          "An administration panel allows the client to manage products, prices, inventory and orders without engineering support. I was also responsible for the Vercel deployment and database provisioning.",
        ],
      },
    ],
  },
  {
    slug: "gym-victoria",
    name: "Gym Victoria",
    kind: "Multi-tenant SaaS",
    tier: "earlier",
    period: "Aug - Dec 2024",
    role: "Full-stack engineer, freelance",
    invariant: "Referential integrity across every record.",
    summary: "A gym management SaaS for multiple locations, designed and built from the ground up: members, trainers and tiered plans.",
    contribution: "Designed and built from the ground up: schema, role-based authentication, interface and CI/CD.",
    challenge: "A relational model in which members, trainers, memberships and payments always remain consistent.",
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
    seoDescription:
      "Case study: Gym Victoria, a multi-tenant gym SaaS with role-based authentication, a relational schema for members, trainers, memberships and payments, and zero-downtime CI/CD.",
    sections: [
      {
        title: "Context",
        body: ["A gym SaaS supporting member registration, trainer assignment and tiered membership plans across multiple locations."],
      },
      {
        title: "Data model",
        body: [
          "I designed the complete relational schema, covering members, trainers, memberships and payments, with referential integrity, so that query bottlenecks and inconsistent states were addressed before reaching production.",
        ],
      },
      {
        title: "Authentication",
        body: [
          "Role-based access for administrators, trainers and members, with secure server-side session management, implemented directly rather than through an authentication library.",
        ],
      },
      {
        title: "Delivery",
        body: ["A Tailwind-optimised interface with page loads under two seconds, deployed to Vercel with automated zero-downtime CI/CD on every push."],
      },
    ],
  },
  {
    slug: "mk-tattoo-supply",
    name: "MK Tattoo Supply",
    kind: "E-commerce",
    tier: "earlier",
    period: "Dec 2023 - Feb 2024",
    role: "Full-stack engineer, freelance",
    invariant: "Each unit is sold only once.",
    summary: "An e-commerce platform with live inventory, order processing and payment integration, delivered to production in eight weeks.",
    contribution: "Built from the ground up and delivered to production in eight weeks.",
    challenge: "Preventing concurrent orders from selling the same unit twice.",
    stack: ["Next.js", "Strapi", "REST API"],
    seoDescription:
      "Case study: MK Tattoo Supply, a Next.js and Strapi e-commerce platform with real-time stock control that prevents overselling and a no-code administration panel for more than 200 SKUs.",
    sections: [
      {
        title: "Context",
        body: [
          "A full-stack e-commerce platform built on Next.js and Strapi (headless CMS), handling live inventory, order processing and a payment API integration. Delivered to production in eight weeks.",
        ],
      },
      {
        title: "Key challenge: overselling",
        body: [
          "With concurrent orders, a naive stock check sells the same unit twice. I implemented real-time stock control that prevents overselling, protecting both revenue and customer trust.",
        ],
      },
      {
        title: "Operated without engineers",
        body: ["I delivered a no-code administration panel that allows non-technical staff to manage more than 200 SKUs, orders and fulfilment independently."],
      },
    ],
  },
];

export default cases;
