import type { Dictionary } from "./types";

const es: Dictionary = {
  meta: {
    title: "Dasiel Torres — Ingeniero de Software Full-Stack",
    description:
      "Ingeniero de Software Full-Stack radicado en Cuba, trabajando en remoto. Plataformas de reservas, e-commerce, SaaS y productos de pagos: de la base de datos a la interfaz y al despliegue.",
    ogTagline: "Productos completos, de punta a punta.",
  },
  hud: { intro: "Intro" },
  nav: {
    work: "Trabajo",
    stack: "Stack",
    path: "Trayectoria",
    lab: "Lab",
    contact: "Contacto",
    hire: "Contrátame",
    skip: "Saltar al contenido",
    langLabel: "Idioma",
  },
  hero: {
    eyebrow: "Ingeniero de Software Full-Stack · Radicado en Cuba, trabajando en remoto",
    line1: "Productos completos,",
    line2: "de punta a punta.",
    lede: "Llevo un producto desde el problema hasta la base de datos, la interfaz, el pago y el despliegue, y trabajo donde el problema lo necesite.",
    primary: "Escríbeme",
    secondary: "Ver el trabajo",
    nowLabel: "Últimamente",
    now: "Productos de pagos: Supernova como pasarela de pago, ACR Pay, ACR Card y la aplicación ACR Card.",
    layersLabel: "Dónde trabajo",
  },
  work: {
    title: "Trabajo seleccionado",
    intro: "Productos reales, usuarios reales y dinero real circulando por ellos.",
    featured: {
      name: "Supernova & ACR",
      kind: "Pagos · Fintech",
      period: "Más reciente",
      role: "Ingeniero de Software",
      text: "Trabajo de producto en Supernova como pasarela de pago, ACR Pay, ACR Card y la aplicación ACR Card, incluyendo integraciones con bancos y servicios financieros. Los detalles se comparten en conversación.",
      tags: ["Pasarela de pago", "Tarjetas", "Integraciones bancarias"],
      cta: "Pregúntame por ello",
    },
    cases: [
      {
        slug: "habaluna",
        name: "Habaluna",
        kind: "Plataforma de reservas turísticas",
        period: "Dic 2024 – Mar 2025",
        role: "Ingeniero único",
        url: "https://habaluna.com",
        summary:
          "Una plataforma de reservas en producción para el sector turístico de Cuba, construida y operada de principio a fin por un solo ingeniero.",
        stack: ["Next.js", "React", "PostgreSQL", "Prisma", "Strapi", "Vercel"],
        seoDescription:
          "Caso de estudio: Habaluna, plataforma de reservas turísticas para el mercado cubano: disponibilidad en tiempo real, reservas mobile-first y back office para operadores, construida en solitario.",
        sections: [
          {
            title: "Contexto",
            body: [
              "Habaluna es una plataforma de reservas en producción para el sector turístico de Cuba: un catálogo público, un flujo de reserva y pago, y un back office para los operadores que publican y gestionan las ofertas.",
            ],
          },
          {
            title: "Mi responsabilidad",
            body: [
              "Fui el único ingeniero. Las decisiones de producto, la arquitectura, el UX/UI, el backend y la infraestructura fueron mías, desde el primer esquema hasta el entorno de producción.",
            ],
          },
          {
            title: "Arquitectura",
            body: [
              "Next.js 14 App Router combinando React Server Components y Client Components, PostgreSQL con Prisma y Strapi como CMS headless. La separación es deliberada: la lógica de reservas es dinámica y transaccional, y el contenido gestionado por operadores vive en el CMS, así cada lado cambia sin tocar al otro.",
            ],
          },
          {
            title: "Lo difícil: la disponibilidad",
            body: [
              "Dos personas pueden pedir las mismas fechas en el mismo instante. Construí un motor de disponibilidad en tiempo real con detección atómica de conflictos, de modo que las reservas concurrentes no puedan producir una doble reserva, sin volver lenta la respuesta.",
            ],
          },
          {
            title: "Experiencia y operación",
            body: [
              "Mobile-first desde la navegación del catálogo hasta la reserva y el pago. Un back office completo permite a los operadores gestionar ofertas, disponibilidad y precios sin intervención de ingeniería.",
              "También me encargué del pipeline de despliegue: Vercel para frontend y rutas API, aprovisionamiento de base de datos, gestión de entornos y monitorización en producción desde el primer día.",
            ],
          },
        ],
      },
      {
        slug: "gym-victoria",
        name: "Gym Victoria",
        kind: "SaaS multi-tenant",
        period: "Ago – Dic 2024",
        role: "Ingeniero full-stack · freelance",
        summary:
          "Un SaaS de gestión de gimnasios con varias sedes, diseñado y construido desde cero: socios, entrenadores y planes por niveles.",
        stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
        seoDescription:
          "Caso de estudio: Gym Victoria, SaaS multi-tenant para gimnasios con autenticación por roles, esquema relacional de socios, entrenadores, membresías y pagos, y CI/CD sin downtime.",
        sections: [
          {
            title: "Contexto",
            body: [
              "Un SaaS para gimnasios que soporta el registro de socios, la asignación de entrenadores y planes de membresía por niveles en múltiples sedes.",
            ],
          },
          {
            title: "Modelo de datos",
            body: [
              "Diseñé el esquema relacional completo (socios, entrenadores, membresías, pagos) con integridad referencial, de modo que los cuellos de botella y los estados inconsistentes se evitaron antes de llegar a producción.",
            ],
          },
          {
            title: "Autenticación sin atajos",
            body: [
              "Acceso por roles (admin, entrenador, socio) con gestión segura de sesiones en el servidor. Lo implementé directamente en lugar de recurrir a una librería de autenticación.",
            ],
          },
          {
            title: "Entrega",
            body: [
              "Una interfaz optimizada con Tailwind y cargas de página por debajo de los 2 segundos, desplegada en Vercel con CI/CD automático y sin downtime en cada push.",
            ],
          },
        ],
      },
      {
        slug: "mk-tattoo-supply",
        name: "MK Tattoo Supply",
        kind: "E-commerce",
        period: "Dic 2023 – Feb 2024",
        role: "Ingeniero full-stack · freelance",
        summary:
          "Una plataforma de e-commerce con inventario en vivo, procesamiento de pedidos e integración de pagos: de cero a producción en ocho semanas.",
        stack: ["Next.js", "Strapi", "REST API"],
        seoDescription:
          "Caso de estudio: MK Tattoo Supply, e-commerce con Next.js y Strapi con control de stock en tiempo real que evita la sobreventa y un panel de administración sin código para más de 200 SKUs.",
        sections: [
          {
            title: "Contexto",
            body: [
              "Una plataforma de e-commerce full-stack con Next.js y Strapi (CMS headless) que gestiona inventario en vivo, procesamiento de pedidos y la integración de una API de pagos. De cero a producción en ocho semanas.",
            ],
          },
          {
            title: "Lo difícil: la sobreventa",
            body: [
              "Con pedidos concurrentes, una comprobación de stock ingenua vende dos veces la misma unidad. Diseñé un control de stock en tiempo real que evita la sobreventa, protegiendo los ingresos y la confianza de los clientes.",
            ],
          },
          {
            title: "Operarlo sin ingenieros",
            body: [
              "Entregué un panel de administración sin código para que el personal no técnico gestione por su cuenta más de 200 SKUs, pedidos y cumplimiento.",
            ],
          },
        ],
      },
    ],
    caseCta: "Leer el caso de estudio",
    alsoTitle: "También construido",
    also: [
      {
        name: "El Friñon",
        text: "E-commerce de piezas y accesorios, con múltiples roles, punto de venta y gestión de almacén.",
        url: "https://variedadeselfrinon.vercel.app",
      },
      {
        name: "MotoMarket",
        text: "Marketplace para la compra y venta de motos en Cuba. En desarrollo.",
        url: "https://motomarket-three.vercel.app",
      },
    ],
  },
  stack: {
    title: "Anatomía de un producto",
    intro:
      "La amplitud no es una lista de logos. Son las capas que un producto necesita para funcionar, y dónde he tenido que resolver bien cada una.",
    layers: [
      {
        id: "product",
        name: "Producto",
        claim: "Me hago cargo de las decisiones, no solo de los tickets.",
        points: [
          { text: "Decisiones de producto, arquitectura y UX/UI como único ingeniero de una plataforma de reservas en producción.", ref: "Habaluna" },
          { text: "Herramientas de back office que permiten al personal no técnico operar sin ingeniería, incluyendo más de 200 SKUs.", ref: "MK Tattoo Supply" },
        ],
      },
      {
        id: "interface",
        name: "Interfaz",
        claim: "Flujos mobile-first, del catálogo al pago.",
        points: [
          { text: "Flujos de catálogo, reserva y pago diseñados mobile-first de punta a punta.", ref: "Habaluna" },
          { text: "React Server Components y Client Components usados donde corresponde a cada uno.", ref: "Habaluna" },
          { text: "Cargas de página por debajo de 2 segundos en una interfaz optimizada con Tailwind.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "api",
        name: "API y lógica",
        claim: "Fronteras limpias a medida que el sistema crece.",
        points: [
          { text: "Lógica de reservas separada del contenido gestionado por operadores mediante un CMS headless.", ref: "Habaluna" },
          { text: "Autenticación por roles (admin, entrenador, socio) con sesiones en el servidor, sin librería de auth.", ref: "Gym Victoria" },
          { text: "APIs REST con Node.js, NestJS y Strapi.", ref: "Varios proyectos" },
        ],
      },
      {
        id: "data",
        name: "Datos",
        claim: "Correctos bajo concurrencia.",
        points: [
          { text: "Motor de disponibilidad con detección atómica de conflictos: sin dobles reservas con peticiones concurrentes.", ref: "Habaluna" },
          { text: "Control de stock en tiempo real que evita la sobreventa.", ref: "MK Tattoo Supply" },
          { text: "Esquema relacional con integridad referencial para socios, entrenadores, membresías y pagos (PostgreSQL, Prisma).", ref: "Gym Victoria" },
        ],
      },
      {
        id: "money",
        name: "Dinero",
        claim: "Donde un bug cuesta dinero de verdad.",
        points: [
          { text: "Integración de una API de pagos en un e-commerce en producción.", ref: "MK Tattoo Supply" },
          { text: "Procesamiento de pagos dentro de un flujo de reservas.", ref: "Habaluna" },
          { text: "Productos de pagos: Supernova como pasarela, ACR Pay, ACR Card y su aplicación, con integraciones con bancos y servicios financieros.", ref: "Supernova & ACR" },
        ],
      },
      {
        id: "delivery",
        name: "Entrega",
        claim: "Lanzado, y funcionando.",
        points: [
          { text: "Despliegues, aprovisionamiento de base de datos, gestión de entornos y monitorización en producción desde el primer día.", ref: "Habaluna" },
          { text: "CI/CD automático y sin downtime en cada push.", ref: "Gym Victoria" },
        ],
      },
    ],
  },
  path: {
    title: "Trayectoria",
    about: [
      "Empecé profesionalmente en 2023 y desde entonces he trabajado a lo largo de todo el stack: frontend, backend, arquitectura, APIs, bases de datos, integraciones y producto.",
      "Soy ingeniero en Ciencias Informáticas (UCI). Me gustan los problemas donde se cruzan varias disciplinas, y ser quien puede seguirlos hasta donde lleven.",
    ],
    rows: [
      {
        period: "Más reciente",
        title: "Ingeniero de Software",
        place: "Ecosistema Supernova & ACR",
        text: "Pasarela de pago, ACR Pay, ACR Card y la aplicación ACR Card. Dinero real, integraciones con bancos y servicios financieros.",
      },
      {
        period: "Dic 2024 – Mar 2025",
        title: "Ingeniero único",
        place: "Habaluna",
        text: "Plataforma de reservas turísticas: producto, arquitectura, UX/UI, backend e infraestructura.",
      },
      {
        period: "Ago – Dic 2024",
        title: "Ingeniero full-stack (freelance)",
        place: "Gym Victoria",
        text: "SaaS multi-tenant para gimnasios: esquema, autenticación por roles, CI/CD.",
      },
      {
        period: "Dic 2023 – Feb 2024",
        title: "Ingeniero full-stack (freelance)",
        place: "MK Tattoo Supply",
        text: "E-commerce con inventario en vivo, pedidos y pagos, en ocho semanas.",
      },
    ],
    educationLabel: "Formación",
    education: {
      period: "Sep 2018 – Dic 2023",
      title: "Ingeniero en Ciencias Informáticas",
      place: "Universidad de Ciencias Informáticas (UCI), La Habana",
    },
  },
  lab: {
    title: "Lab",
    intro: "Pequeños experimentos, separados del trabajo profesional.",
    items: [
      {
        name: "Sudoku Web App",
        period: "Jul – Ago 2024",
        text: "Sudoku interactivo con generador procedural de tableros y motor de validación en tiempo real. Responsive, con React y Tailwind.",
        href: "https://github.com/Dasieloski",
      },
      {
        name: "Esta web",
        period: "2026",
        text: "Tipografía del titular que reacciona al puntero mediante ejes de fuente variable, revelados guiados por scroll en CSS puro y ninguna librería de animación.",
      },
    ],
  },
  contact: {
    title: "Construyamos algo.",
    text: "Estoy abierto a roles remotos y reubicación. Si hay un producto que necesita a alguien capaz de seguir el problema a través del stack, escríbeme.",
    copy: "Copiar correo",
    copied: "Copiado",
    cv: "Descargar CV (PDF, inglés)",
    availability: "Abierto a remoto y reubicación",
    location: "Radicado en Cuba, trabajando en remoto",
  },
  vis: {
    note: "Ilustración conceptual del problema, no una captura.",
    scrollHint: "Desplázate para explorar",
    pay: {
      title: "Un pago, de punta a punta",
      run: "Enviar un pago",
      busy: "En camino…",
      nodes: [
        { label: "App", text: "Una persona confirma un pago." },
        { label: "API", text: "La petición se autentica y se valida." },
        { label: "Pasarela", text: "Se enruta por la pasarela de pago." },
        { label: "Banco", text: "Un banco o servicio financiero lo autoriza." },
        { label: "Libro", text: "El resultado queda registrado." },
        { label: "Tarjeta y wallet", text: "El saldo refleja el resultado." },
      ],
    },
    avail: {
      title: "Dos huéspedes, mismas fechas",
      run: "Enviar las dos a la vez",
      reset: "Reiniciar",
      a: "Petición A",
      b: "Petición B",
      idle: "Dos huéspedes piden las mismas fechas en el mismo instante.",
      land: "Las dos peticiones llegan juntas.",
      lock: "El motor de disponibilidad comprueba de forma atómica.",
      won: "La petición A queda confirmada.",
      lost: "La petición B recibe un conflicto. Sin doble reserva.",
    },
    stock: {
      title: "Queda una unidad",
      run: "Pedir dos veces la última unidad",
      reset: "Reiniciar",
      skus: "SKUs",
      idle: "Queda una unidad. Llegan dos pedidos a la vez.",
      lock: "El stock se comprueba de forma atómica.",
      done: "El pedido A se registra. El B la ve agotada. Sin sobreventa.",
    },
    schema: {
      title: "El esquema",
      hint: "Pasa el cursor por una tabla para seguir sus relaciones.",
      roles: "Acceso por roles",
      nodes: { location: "Sedes", members: "Socios", trainers: "Entrenadores", memberships: "Membresías", payments: "Pagos" },
      edges: { assigned: "asignado a", holds: "tiene", settles: "se liquida con", tenant: "pertenece a" },
    },
    axes: { title: "La tipografía como instrumento", width: "Ancho", weight: "Peso", sample: "Producto" },
  },
  caseUi: {
    back: "Todo el trabajo",
    role: "Rol",
    period: "Periodo",
    stack: "Stack",
    visit: "Visitar el sitio",
    next: "Siguiente caso",
    breadcrumbHome: "Inicio",
    contactCta: "Hablemos de un proyecto como este",
    architecture: "Arquitectura",
    visualLabel: "Ilustración interactiva",
  },
  footer: { rights: "© 2026 Dasiel Torres", top: "Volver arriba" },
  notFound: {
    title: "Página no encontrada",
    text: "Esa página no existe, pero el trabajo sí.",
    back: "Volver al inicio",
  },
};

export default es;
