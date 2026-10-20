import type { CaseStudy } from "./types";

/** Cada afirmación procede del CV o de los casos de estudio anteriores. Del más reciente al más antiguo. */
const cases: CaseStudy[] = [
  {
    slug: "supernova-gateway",
    name: "Pasarela de pagos Supernova",
    kind: "Pasarela de pagos",
    tier: "main",
    role: "Ingeniero de Software",
    invariant: "Cada pago concluye con un único resultado, sin ambigüedad.",
    summary: "La pasarela de pagos de Supernova, integrada con bancos y proveedores de servicios financieros.",
    contribution: "Desarrollo y mantenimiento de las integraciones con bancos y proveedores de servicios financieros.",
    challenge: "Convertir operaciones fallidas a medias en un resultado definitivo, conciliado con los registros del banco.",
    stack: [],
    seoDescription:
      "Caso de estudio: la pasarela de pagos Supernova, integrada con bancos y proveedores de servicios financieros, en el ecosistema Supernova & ACR.",
    sections: [
      {
        title: "Contexto",
        body: [
          "Una pasarela de pagos se sitúa entre los productos que cobran a sus clientes y los bancos e instituciones financieras que mueven los fondos. Supernova cumple esa función dentro del ecosistema Supernova & ACR.",
        ],
      },
      {
        title: "Desafío principal: fallos parciales",
        body: [
          "Los pagos atraviesan redes que pueden fallar a mitad de la operación. La pasarela debe resolver cada intento en un único resultado, pagado o no pagado, y mantener sus registros en concordancia con los del banco. Los reintentos, los tiempos de espera y las solicitudes duplicadas son condiciones previstas, no excepciones.",
        ],
      },
      {
        title: "Integraciones",
        body: [
          "Cada banco y proveedor de servicios financieros tiene su propio protocolo y sus propios modos de fallo. El objetivo es encapsular esas diferencias tras una interfaz única y coherente para los productos que procesan pagos a través de la pasarela.",
        ],
      },
    ],
  },
  {
    slug: "acr-pay",
    name: "ACR Pay",
    kind: "Plataforma de recargas",
    tier: "main",
    role: "Ingeniero de Software",
    invariant: "Cada recarga se acredita una sola vez, en el destino correcto.",
    summary: "Una plataforma para recargar tarjetas clásicas y teléfonos móviles en Cuba.",
    contribution: "Desarrollo de los flujos de recarga en las capas web, API y base de datos.",
    challenge: "Garantizar un único crédito aunque las confirmaciones se retrasen o se repitan.",
    stack: [],
    seoDescription:
      "Caso de estudio: ACR Pay, plataforma para recargar tarjetas clásicas y teléfonos móviles en Cuba, parte del ecosistema Supernova & ACR.",
    sections: [
      {
        title: "Contexto",
        body: ["ACR Pay es una plataforma para recargar tarjetas clásicas y teléfonos móviles en Cuba, dentro del ecosistema Supernova & ACR."],
      },
      {
        title: "Dos tipos de destino",
        body: [
          "Recargar una tarjeta clásica y recargar una línea móvil son operaciones distintas, con procesos de confirmación distintos. La plataforma presenta ambas como una única acción sencilla.",
        ],
      },
      {
        title: "Desafío principal: fondos en tránsito",
        body: [
          "Una recarga es una transferencia de fondos en curso. Si una confirmación se retrasa o se repite, el crédito debe aplicarse exactamente una vez. Hacer seguros los reintentos es lo que preserva la confianza del cliente.",
        ],
      },
    ],
  },
  {
    slug: "acr-card",
    name: "ACR Card",
    kind: "Plataforma de emisión de tarjetas",
    tier: "main",
    role: "Ingeniero de Software",
    invariant: "Una solicitud, una tarjeta.",
    summary: "Una plataforma para solicitar tarjetas Visa y Mastercard, parte del ecosistema Supernova & ACR.",
    contribution: "Contribución al flujo de solicitud de tarjetas Visa y Mastercard: interfaz web, servicios backend y APIs.",
    challenge: "Asegurar que cada solicitud alcance un único estado final: aprobada, rechazada o pendiente.",
    stack: [],
    seoDescription:
      "Caso de estudio: ACR Card, plataforma para solicitar tarjetas Visa y Mastercard, parte del ecosistema de pagos Supernova & ACR.",
    sections: [
      {
        title: "Contexto",
        body: [
          "ACR Card es una plataforma para solicitar tarjetas Visa y Mastercard. Forma parte del ecosistema Supernova & ACR, junto a la pasarela de pagos, ACR Pay y la aplicación de gestión de tarjetas.",
        ],
      },
      {
        title: "Alcance del producto",
        body: [
          "El cliente selecciona la red de la tarjeta, envía su solicitud y le da seguimiento hasta la emisión. Detrás de esa interfaz hay un proceso con consecuencias reales: una solicitud que transita por estados bien definidos, datos personales que deben tratarse con rigor y un resultado que nunca puede ser ambiguo.",
        ],
      },
      {
        title: "Desafío principal: ninguna solicitud puede perderse",
        body: [
          "Las solicitudes atraviesan varios sistemas y cualquier paso puede fallar a mitad del proceso. El trabajo consiste en garantizar que cada solicitud concluya en un único estado, aprobada, rechazada o pendiente, de modo que ningún cliente reciba dos tarjetas y ninguna solicitud desaparezca sin dejar rastro.",
        ],
      },
    ],
  },
  {
    slug: "acr-card-app",
    name: "ACR Card App",
    kind: "Aplicación de gestión de tarjetas",
    tier: "main",
    role: "Ingeniero de Software",
    invariant: "Cada transferencia se aplica una sola vez, a la tarjeta correcta.",
    summary: "Una plataforma para gestionar tarjetas ACR: historial de transacciones y transferencias entre tarjetas.",
    contribution: "Desarrollo de la gestión de tarjetas, el historial de transacciones y las transferencias entre tarjetas.",
    challenge: "Actualizar dos saldos de forma atómica, también cuando una solicitud se reintenta.",
    stack: [],
    seoDescription:
      "Caso de estudio: la aplicación ACR Card, plataforma para gestionar tarjetas ACR, consultar transacciones y transferir fondos entre tarjetas.",
    sections: [
      {
        title: "Contexto",
        body: ["app.acr-card es el espacio donde los titulares gestionan sus tarjetas: consultan transacciones, transfieren fondos entre tarjetas ACR y más."],
      },
      {
        title: "Alcance del producto",
        body: [
          "En el uso diario es una interfaz financiera: un historial de transacciones que debe ser preciso y rápido, y transferencias en las que los fondos salen de una tarjeta y llegan a otra.",
        ],
      },
      {
        title: "Desafío principal: dos saldos, una transferencia",
        body: [
          "Una transferencia modifica dos saldos. Ambos cambios deben completarse juntos o no completarse, aunque la solicitud se reintente o se pierda la conexión. Ese requisito determina el modelo de datos, la API y lo que la interfaz muestra mientras la operación está en curso.",
        ],
      },
    ],
  },
  {
    slug: "habaluna",
    name: "Habaluna",
    kind: "E-commerce para Luna S.U.R.L",
    tier: "main",
    period: "Dic 2024 - Mar 2025",
    role: "Ingeniero único, freelance",
    invariant: "Cada pedido se cobra una sola vez y cuenta con stock disponible.",
    summary: "Una tienda online con un catálogo de productos variados para Luna S.U.R.L, con pagos procesados a través de la pasarela Supernova.",
    contribution: "Responsabilidad integral: decisiones de producto, arquitectura, UX/UI, backend e infraestructura.",
    challenge: "Mantener coherentes catálogo, carrito, checkout, pagos, inventario y pedidos, como único ingeniero.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Redis", "Vercel", "Pasarela Supernova"],
    seoDescription:
      "Caso de estudio: Habaluna, e-commerce para Luna S.U.R.L desarrollado de principio a fin por un solo ingeniero con Next.js, PostgreSQL, Prisma y Redis, con pagos a través de la pasarela Supernova.",
    sections: [
      {
        title: "Contexto",
        body: [
          "Habaluna es la tienda online de Luna S.U.R.L, con un catálogo de productos variados. Fui el único ingeniero, responsable de las decisiones de producto, la arquitectura, el UX/UI, el backend y la infraestructura.",
        ],
      },
      {
        title: "La tienda",
        body: ["Una arquitectura Next.js App Router sobre PostgreSQL mediante Prisma, con Redis en el stack: catálogo de productos, carrito y checkout."],
      },
      {
        title: "Pagos, inventario y pedidos",
        body: [
          "Los pagos online se procesan a través de la pasarela de pagos Supernova. La gestión de inventario y de pedidos controla lo que se ha vendido y lo que debe entregarse.",
        ],
      },
      {
        title: "Operada por el cliente",
        body: [
          "Un panel de administración permite al cliente gestionar productos, precios, inventario y pedidos sin soporte de ingeniería. También fui responsable del despliegue en Vercel y del aprovisionamiento de la base de datos.",
        ],
      },
    ],
  },
  {
    slug: "gym-victoria",
    name: "Gym Victoria",
    kind: "SaaS multi-tenant",
    tier: "earlier",
    period: "Ago - Dic 2024",
    role: "Ingeniero full-stack, freelance",
    invariant: "Integridad referencial en cada registro.",
    summary: "Un SaaS de gestión de gimnasios con múltiples sedes, diseñado y desarrollado desde cero: socios, entrenadores y planes por niveles.",
    contribution: "Diseño y desarrollo desde cero: esquema, autenticación por roles, interfaz y CI/CD.",
    challenge: "Un modelo relacional en el que socios, entrenadores, membresías y pagos se mantienen siempre coherentes.",
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
    seoDescription:
      "Caso de estudio: Gym Victoria, SaaS multi-tenant para gimnasios con autenticación por roles, esquema relacional de socios, entrenadores, membresías y pagos, y CI/CD sin interrupciones.",
    sections: [
      {
        title: "Contexto",
        body: ["Un SaaS para gimnasios que permite el registro de socios, la asignación de entrenadores y planes de membresía por niveles en múltiples sedes."],
      },
      {
        title: "Modelo de datos",
        body: [
          "Diseñé el esquema relacional completo, que abarca socios, entrenadores, membresías y pagos, con integridad referencial, de modo que los cuellos de botella y los estados inconsistentes se resolvieron antes de llegar a producción.",
        ],
      },
      {
        title: "Autenticación",
        body: [
          "Acceso por roles para administradores, entrenadores y socios, con gestión segura de sesiones en el servidor, implementada directamente y no mediante una librería de autenticación.",
        ],
      },
      {
        title: "Entrega",
        body: ["Una interfaz optimizada con Tailwind y tiempos de carga inferiores a dos segundos, desplegada en Vercel con CI/CD automatizado y sin interrupciones en cada push."],
      },
    ],
  },
  {
    slug: "mk-tattoo-supply",
    name: "MK Tattoo Supply",
    kind: "E-commerce",
    tier: "earlier",
    period: "Dic 2023 - Feb 2024",
    role: "Ingeniero full-stack, freelance",
    invariant: "Cada unidad se vende una sola vez.",
    summary:
      "Una plataforma de e-commerce con inventario en tiempo real, procesamiento de pedidos e integración de pagos, puesta en producción en ocho semanas.",
    contribution: "Desarrollada desde cero y puesta en producción en ocho semanas.",
    challenge: "Evitar que pedidos concurrentes vendan dos veces la misma unidad.",
    stack: ["Next.js", "Strapi", "REST API"],
    seoDescription:
      "Caso de estudio: MK Tattoo Supply, e-commerce con Next.js y Strapi, con control de stock en tiempo real que evita la sobreventa y un panel de administración sin código para más de 200 SKUs.",
    sections: [
      {
        title: "Contexto",
        body: [
          "Una plataforma de e-commerce full-stack sobre Next.js y Strapi (CMS headless) que gestiona inventario en tiempo real, procesamiento de pedidos y la integración de una API de pagos. Puesta en producción en ocho semanas.",
        ],
      },
      {
        title: "Desafío principal: la sobreventa",
        body: [
          "Con pedidos concurrentes, una comprobación de stock ingenua vende dos veces la misma unidad. Implementé un control de stock en tiempo real que evita la sobreventa y protege tanto los ingresos como la confianza de los clientes.",
        ],
      },
      {
        title: "Operada sin ingenieros",
        body: ["Entregué un panel de administración sin código que permite al personal no técnico gestionar de forma autónoma más de 200 SKUs, pedidos y entregas."],
      },
    ],
  },
];

export default cases;
