import type { Dictionary } from "./types";
import cases from "./cases.es";

const es: Dictionary = {
  meta: {
    title: "Dasiel Torres | Desarrollador Full-Stack: TypeScript, Next.js, Node.js",
    description:
      "Dasiel Torres, desarrollador full-stack (TypeScript, React, Next.js, Node.js, NestJS) en remoto desde Cuba. Fintech, pasarela de pagos, tarjetas, e-commerce y SaaS.",
    ogTagline: "Software fiable para el momento en que se mueve el dinero.",
  },
  nav: {
    layers: "Especialidad",
    work: "Proyectos",
    record: "Experiencia",
    contact: "Contacto",
    cv: "CV",
    skip: "Saltar al contenido",
    menu: "Menú",
    close: "Cerrar",
    langLabel: "Idioma",
    home: "Dasiel Torres, inicio",
  },
  hero: {
    name: "Dasiel Torres",
    role: "Ingeniero de Software Full-Stack, Pagos y Fintech",
    statement: "Ingeniero full-stack especializado en sistemas de pago: interfaces, APIs, modelos de datos e integraciones bancarias.",
    status: "Disponible para posiciones en remoto",
    primary: "Ver proyectos seleccionados",
    canvasLabel: "Fichas brillantes que flotan, responden al cursor y se ordenan en cada producto durante el desplazamiento.",
    loading: "Cargando",
  },
  manifest: {
    lines: ["Cada pago es un compromiso.", "Debe completarse.", "Exactamente una vez."],
    body: "Mi trabajo se centra en productos donde se mueve dinero, desarrollados de principio a fin: desde la interfaz que utiliza el cliente hasta los sistemas bancarios del otro lado.",
  },
  layers: {
    title: "Especialización en todo el stack.",
    intro: "Las capas de un producto de software y el trabajo que he entregado en cada una de ellas.",
    toolsLabel: "Herramientas",
    items: [
      {
        id: "product",
        name: "Producto",
        claim: "Responsabilidad sobre las decisiones de producto y técnicas.",
        tools: ["Decisiones de producto", "UX/UI"],
        points: [
          { text: "Una pasarela de pagos, recargas, emisión de tarjetas y una aplicación de tarjetas que operan como un único ecosistema.", ref: "Supernova & ACR" },
          { text: "Producto, arquitectura y UX/UI de una tienda online, como único ingeniero.", ref: "Habaluna" },
        ],
      },
      {
        id: "interface",
        name: "Interfaz",
        claim: "Flujos claros y fiables para operaciones financieras.",
        tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        points: [
          { text: "Gestión de tarjetas: historial de transacciones y transferencias.", ref: "ACR Card App" },
          { text: "El flujo de solicitud de tarjetas Visa y Mastercard.", ref: "ACR Card" },
          { text: "Tiempos de carga inferiores a dos segundos.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "api",
        name: "API y lógica",
        claim: "Fronteras bien definidas que se mantienen a medida que el producto crece.",
        tools: ["Node.js", "NestJS", "REST", "Strapi"],
        points: [
          { text: "Integraciones con bancos y servicios financieros tras una única pasarela.", ref: "Supernova" },
          { text: "Autenticación por roles con sesiones en servidor, sin librería de autenticación.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "data",
        name: "Datos",
        claim: "Coherencia bajo carga concurrente.",
        tools: ["PostgreSQL", "Prisma", "Redis", "SQL"],
        points: [
          { text: "Control de stock en tiempo real que evita la sobreventa.", ref: "MK Tattoo Supply" },
          { text: "Gestión de inventario y pedidos para una tienda en producción.", ref: "Habaluna" },
          { text: "Un esquema relacional con integridad referencial.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "money",
        name: "Pagos",
        claim: "Sistemas en los que un error tiene un coste económico.",
        tools: ["Integraciones bancarias", "APIs de pago"],
        points: [
          { text: "Una pasarela de pagos con integraciones bancarias.", ref: "Supernova" },
          { text: "Recargas de tarjetas clásicas y teléfonos móviles.", ref: "ACR Pay" },
          { text: "Pagos de una tienda procesados a través de la pasarela Supernova.", ref: "Habaluna" },
        ],
      },
      {
        id: "delivery",
        name: "Entrega",
        claim: "Despliegue y operación fiables en producción.",
        tools: ["Vercel", "CI/CD", "Git", "GitHub"],
        points: [
          { text: "CI/CD sin interrupciones en cada push.", ref: "Gym Victoria" },
          { text: "Puesta en producción en ocho semanas.", ref: "MK Tattoo Supply" },
        ],
      },
    ],
  },
  work: {
    title: "Proyectos seleccionados",
    intro: "Cinco productos en orden cronológico inverso, cada uno definido por la garantía que debe cumplir.",
    cases,
    caseCta: "Leer el caso de estudio",
    live: "Sitio en producción",
    mustHold: "Garantía",
    myPart: "Contribución",
    hardPart: "Desafío principal",
    layersLabel: "Alcance",
    stackLabel: "Tecnologías",
    moreTitle: "Otros proyectos",
    also: [
      {
        name: "El Friñon",
        text: "E-commerce de piezas y accesorios, con roles de usuario, punto de venta y gestión de almacén.",
        url: "https://variedadeselfrinon.vercel.app",
      },
      {
        name: "MotoMarket",
        text: "Un marketplace para la compraventa de motocicletas en Cuba. Actualmente en desarrollo.",
        url: "https://motomarket-three.vercel.app",
      },
    ],
  },
  record: {
    title: "Experiencia profesional",
    intro: "En orden cronológico inverso.",
    stats: [
      { v: "2023", k: "Desarrollando software profesionalmente desde" },
      { v: "4", k: "Productos de pago en el ecosistema Supernova & ACR" },
      { v: "7", k: "Productos documentados como casos de estudio" },
    ],
    rows: [
      {
        period: "2026 - Actualidad",
        title: "Ingeniero de Software",
        place: "Supernova & ACR",
        text: "Pasarela de pagos, ACR Pay, ACR Card y la aplicación ACR Card. Interfaces web, servicios backend, APIs e integraciones bancarias.",
        slugs: ["supernova-gateway", "acr-pay", "acr-card", "acr-card-app"],
      },
      {
        period: "Dic 2024 - Mar 2025",
        title: "Ingeniero único (freelance)",
        place: "Habaluna, Luna S.U.R.L",
        text: "Una tienda online desarrollada de principio a fin: catálogo, carrito, pagos con Supernova, inventario, pedidos y administración.",
        slugs: ["habaluna"],
      },
      {
        period: "Ago - Dic 2024",
        title: "Ingeniero full-stack (freelance)",
        place: "Gym Victoria",
        text: "SaaS multi-tenant de gestión de gimnasios: modelo de datos, autenticación por roles y CI/CD.",
        slugs: ["gym-victoria"],
      },
      {
        period: "Dic 2023 - Feb 2024",
        title: "Ingeniero full-stack (freelance)",
        place: "MK Tattoo Supply",
        text: "Plataforma de e-commerce con inventario en tiempo real, pedidos y pagos, entregada en ocho semanas.",
        slugs: ["mk-tattoo-supply"],
      },
    ],
    educationLabel: "Formación",
    education: {
      period: "Sep 2018 - Dic 2023",
      title: "Ingeniero en Ciencias Informáticas",
      place: "Universidad de las Ciencias Informáticas (UCI), La Habana",
    },
  },
  contact: {
    title: "Actualmente valoro nuevas oportunidades.",
    text: "Aporto más valor en equipos que necesitan un ingeniero capaz de llevar un problema desde la interfaz de usuario hasta la integración bancaria. Puede escribirme a la dirección indicada a continuación.",
    write: "Contacto",
    copy: "Copiar dirección",
    copied: "Dirección copiada",
    cvEn: "CV en inglés",
    cvEs: "CV en español",
    availability: "Disponible para posiciones en remoto y reubicación",
    location: "Radicado en Cuba, trabajando en remoto",
    elsewhere: "Perfiles",
  },
  caseUi: {
    back: "Todos los proyectos",
    role: "Rol",
    period: "Periodo",
    stack: "Tecnologías",
    layers: "Alcance",
    visit: "Visitar el sitio",
    next: "Siguiente caso de estudio",
    contactCta: "Conversar sobre un producto similar",
  },
  footer: { rights: "© 2026 Dasiel Torres", top: "Volver arriba", built: "Desarrollado con Next.js y Three.js" },
  notFound: {
    title: "Página no encontrada",
    text: "La página solicitada no existe o ha sido trasladada.",
    back: "Volver a la página de inicio",
  },
};

export default es;
