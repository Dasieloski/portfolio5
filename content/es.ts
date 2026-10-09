import type { Dictionary } from "./types";

const es: Dictionary = {
  meta: {
    title: "Dasiel Torres — Ingeniero de Software Full-Stack",
    description:
      "Ingeniero de Software Full-Stack radicado en Cuba, trabajando en remoto. Pasarela de pagos, plataformas de tarjetas y recargas, e-commerce y SaaS: de la base de datos a la interfaz y al despliegue.",
    ogTagline: "Productos completos, de punta a punta.",
  },
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
    role: "Ingeniero de Software Full-Stack",
    eyebrow: "Ingeniero de Software Full-Stack · Radicado en Cuba, trabajando en remoto",
    line1: "Productos completos,",
    line2: "de punta a punta.",
    lede: "Del problema a la base de datos, la interfaz, el pago y el despliegue.",
    primary: "Escríbeme",
    secondary: "Ver el trabajo",
    scroll: "Desliza",
    since: "Desde 2023",
  },
  intro: {
    kicker: "Perfil",
    statement:
      "Construyo el producto completo: la interfaz que la gente toca, la API detrás, la base de datos que debe mantenerse correcta y las integraciones donde se mueve el dinero.",
    emphasis: ["producto completo", "se mueve el dinero"],
  },
  work: {
    title: "Cuatro productos,",
    titleEm: "cuatro cosas que no pueden romperse.",
    intro: "Productos de pagos con usuarios reales, del más reciente al más antiguo.",
    cases: [
      {
        slug: "acr-card",
        name: "ACR Card",
        kind: "Plataforma de emisión de tarjetas",
        tier: "main",
        role: "Ingeniero de Software",
        invariant: "Una solicitud, una tarjeta.",
        summary: "Una plataforma para solicitar tarjetas Visa y Mastercard, parte del ecosistema Supernova & ACR.",
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
            title: "Qué hace el producto",
            body: [
              "Una persona elige la red de la tarjeta, envía su solicitud y la sigue hasta que la tarjeta existe. Detrás de esa pantalla hay un flujo con consecuencias reales: una solicitud que pasa por estados claros, datos personales que hay que tratar con cuidado y un resultado que nunca puede ser ambiguo.",
            ],
          },
          {
            title: "Lo difícil: una solicitud que no se puede perder",
            body: [
              "Las solicitudes atraviesan varios sistemas y cualquier paso puede fallar a medias. El trabajo consiste en que cada solicitud termine en un único estado —aprobada, rechazada o pendiente— para que nadie reciba dos tarjetas y nadie espere una solicitud que desapareció en silencio.",
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
        invariant: "Una transferencia llega una vez, a la tarjeta correcta.",
        summary: "Una plataforma para gestionar tarjetas ACR: ver transacciones y mover dinero entre tarjetas.",
        stack: [],
        seoDescription:
          "Caso de estudio: la aplicación ACR Card, plataforma para gestionar tarjetas ACR, ver transacciones y transferir dinero entre tarjetas.",
        sections: [
          {
            title: "Contexto",
            body: [
              "app.acr-card es donde los titulares gestionan sus tarjetas: consultan transacciones, transfieren entre tarjetas ACR y más.",
            ],
          },
          {
            title: "Qué hace el producto",
            body: [
              "En el día a día es una interfaz financiera: un historial de transacciones que debe ser preciso y rápido, y transferencias donde el dinero sale de una tarjeta y llega a otra.",
            ],
          },
          {
            title: "Lo difícil: dos saldos, una transferencia",
            body: [
              "Una transferencia cambia dos saldos. Los dos cambios deben ocurrir juntos o no ocurrir, aunque la petición se repita o se corte la conexión. Esa regla condiciona el modelo de datos, la API y lo que muestra la interfaz mientras espera.",
            ],
          },
        ],
      },
      {
        slug: "supernova-gateway",
        name: "Pasarela de pagos Supernova",
        kind: "Pasarela de pagos",
        tier: "main",
        role: "Ingeniero de Software",
        invariant: "Todo pago termina en un resultado claro.",
        summary: "La pasarela de pagos de Supernova, con integraciones con bancos y servicios financieros.",
        stack: [],
        seoDescription:
          "Caso de estudio: la pasarela de pagos Supernova, con integraciones con bancos y servicios financieros, en el ecosistema Supernova & ACR.",
        sections: [
          {
            title: "Contexto",
            body: [
              "Una pasarela de pagos se sitúa entre el producto que quiere cobrar y los bancos y servicios financieros que mueven el dinero. Supernova es esa pasarela y forma parte del ecosistema Supernova & ACR.",
            ],
          },
          {
            title: "Lo difícil: pagos que fallan a medias",
            body: [
              "Los pagos cruzan redes que fallan a medias. Una pasarela tiene que convertir cada intento en un único resultado —pagado o no pagado— y mantener sus registros de acuerdo con los del banco. Reintentos, tiempos de espera y duplicados son el caso normal, no la excepción.",
            ],
          },
          {
            title: "Integraciones",
            body: [
              "Cada banco o servicio financiero tiene su propio protocolo y sus propios fallos. El trabajo es mantener esas diferencias detrás de una interfaz limpia para los productos que cobran a través de la pasarela.",
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
        invariant: "Una recarga se acredita una vez, en el destino correcto.",
        summary: "Una plataforma para recargar tarjetas clásicas y teléfonos móviles en Cuba.",
        stack: [],
        seoDescription:
          "Caso de estudio: ACR Pay, plataforma para recargar tarjetas clásicas y teléfonos móviles en Cuba, parte del ecosistema Supernova & ACR.",
        sections: [
          {
            title: "Contexto",
            body: [
              "ACR Pay es una plataforma para recargar tarjetas clásicas y teléfonos móviles en Cuba, dentro del ecosistema Supernova & ACR.",
            ],
          },
          {
            title: "Dos tipos de destino",
            body: [
              "Recargar una tarjeta clásica y recargar una línea móvil son operaciones distintas, con caminos de confirmación distintos. La plataforma las presenta como una única acción sencilla.",
            ],
          },
          {
            title: "Lo difícil: dinero en movimiento",
            body: [
              "Una recarga es dinero en movimiento: si una confirmación tarda o se repite, el crédito debe llegar exactamente una vez. Hacer los reintentos seguros es lo que mantiene la confianza.",
            ],
          },
        ],
      },
      {
        slug: "gym-victoria",
        name: "Gym Victoria",
        kind: "SaaS multi-tenant",
        tier: "earlier",
        period: "Ago – Dic 2024",
        role: "Ingeniero full-stack · freelance",
        invariant: "Sin registros huérfanos.",
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
              "Una interfaz optimizada con Tailwind y cargas de página por debajo de los 2 segundos, desplegada en Vercel con CI/CD sin downtime en cada push.",
            ],
          },
        ],
      },
      {
        slug: "mk-tattoo-supply",
        name: "MK Tattoo Supply",
        kind: "E-commerce",
        tier: "earlier",
        period: "Dic 2023 – Feb 2024",
        role: "Ingeniero full-stack · freelance",
        invariant: "Una unidad, una venta.",
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
    earlierTitle: "Trabajo anterior",
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
    intro: "Las capas que necesita un producto, y dónde he tenido que resolver bien cada una.",
    hint: "Desliza para desmontarlo",
    layersLabel: "Capas de un producto",
    layers: [
      {
        id: "product",
        name: "Producto",
        claim: "Me hago cargo de las decisiones, no solo de los tickets.",
        points: [
          { text: "Pasarela, recargas, emisión de tarjetas y una app de tarjetas, funcionando como un solo ecosistema.", ref: "Supernova & ACR" },
          { text: "Panel para que personal no técnico gestione 200+ SKUs.", ref: "MK Tattoo Supply" },
        ],
      },
      {
        id: "interface",
        name: "Interfaz",
        claim: "Flujos claros donde las personas manejan su dinero.",
        points: [
          { text: "Gestión de tarjetas: transacciones y transferencias.", ref: "ACR Card App" },
          { text: "El flujo para solicitar una Visa o una Mastercard.", ref: "ACR Card" },
          { text: "Páginas que cargan en menos de dos segundos.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "api",
        name: "API y lógica",
        claim: "Fronteras limpias a medida que el sistema crece.",
        points: [
          { text: "Integraciones con bancos y servicios financieros detrás de una sola pasarela.", ref: "Supernova" },
          { text: "Autenticación por roles con sesiones en el servidor.", ref: "Gym Victoria" },
          { text: "APIs REST con Node.js, NestJS y Strapi.", ref: "Varios proyectos" },
        ],
      },
      {
        id: "data",
        name: "Datos",
        claim: "Correctos bajo concurrencia.",
        points: [
          { text: "Stock en tiempo real: sin sobreventa.", ref: "MK Tattoo Supply" },
          { text: "Esquema relacional con integridad referencial.", ref: "Gym Victoria" },
        ],
      },
      {
        id: "money",
        name: "Dinero",
        claim: "Donde un bug cuesta dinero de verdad.",
        points: [
          { text: "Una pasarela de pagos con integraciones bancarias.", ref: "Supernova" },
          { text: "Recargas de tarjetas clásicas y teléfonos móviles.", ref: "ACR Pay" },
          { text: "Transferencias entre tarjetas.", ref: "ACR Card App" },
          { text: "Una API de pagos en una tienda en producción.", ref: "MK Tattoo Supply" },
        ],
      },
      {
        id: "delivery",
        name: "Entrega",
        claim: "Lanzado, y funcionando.",
        points: [
          { text: "CI/CD sin downtime en cada push.", ref: "Gym Victoria" },
          { text: "De cero a producción en ocho semanas.", ref: "MK Tattoo Supply" },
        ],
      },
    ],
  },
  path: {
    title: "Trayectoria",
    profile: {
      title: "De un vistazo",
      rows: [
        { k: "Rol", v: "Ingeniero de Software Full-Stack" },
        { k: "Ubicación", v: "Cuba, trabajando en remoto" },
        { k: "Experiencia", v: "Trabajo profesional desde 2023" },
        { k: "Enfoque", v: "Frontend, backend, APIs, bases de datos, integraciones, pagos y fintech" },
        { k: "Trabajo reciente", v: "Pasarela de pagos Supernova, ACR Pay, ACR Card y la aplicación ACR Card" },
      ],
    },
    about: [
      "Trabajando en todo el stack desde 2023: frontend, backend, datos, integraciones y producto. Ingeniero en Ciencias Informáticas (UCI).",
    ],
    rows: [
      {
        period: "2026 – actualidad",
        title: "Ingeniero de Software",
        place: "Ecosistema Supernova & ACR",
        text: "Pasarela de pago, ACR Pay, ACR Card y la aplicación ACR Card. Dinero real, integraciones con bancos y servicios financieros.",
        caseSlugs: ["supernova-gateway", "acr-pay", "acr-card", "acr-card-app"],
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
        text: "Tipografía de fuente variable con la que se puede jugar, revelados guiados por scroll en CSS puro, una tarjeta de pago en WebGL con un shader de holograma propio y secuencias de scroll con GSAP. Carga diferida; la página funciona sin nada de eso.",
      },
    ],
  },
  contact: {
    title: "Construyamos algo.",
    text: "Estoy abierto a roles remotos y reubicación. Si hay un producto que necesita a alguien capaz de seguir el problema a través del stack, escríbeme.",
    copy: "Copiar correo",
    copied: "Copiado",
    cvEn: "Descargar CV (PDF, inglés)",
    cvEs: "Descargar CV (PDF, español)",
    availability: "Abierto a remoto y reubicación",
    location: "Radicado en Cuba, trabajando en remoto",
  },
  vis: {
    note: "Ilustración conceptual del problema, no una captura.",
    gateway: {
      title: "Una pasarela, muchas rutas",
      run: "Enviar un pago",
      busy: "Enrutando…",
      idle: "Los pagos entran desde muchos sitios y salen hacia muchos bancos.",
      done: "Autorizado una vez y registrado una vez.",
      from: ["Producto A", "Producto B", "Producto C"],
      gateway: "Pasarela",
      to: ["Banco A", "Servicio financiero", "Banco B"],
    },
    topup: {
      title: "Una recarga",
      run: "Recargar",
      busy: "Acreditando…",
      reset: "Reiniciar",
      idle: "Elige un destino y recárgalo.",
      done: "Acreditada una vez. El saldo lo refleja.",
      card: "Tarjeta clásica",
      phone: "Línea móvil",
    },
    issue: {
      title: "Una solicitud de tarjeta",
      run: "Solicitar tarjeta",
      busy: "En revisión…",
      reset: "Reiniciar",
      idle: "Elige una red y solicita una tarjeta.",
      done: "Emitida. Una solicitud, una tarjeta.",
      steps: ["Solicitud", "Revisión", "Emitida"],
      visa: "Visa",
      mastercard: "Mastercard",
    },
    app: {
      title: "Entre dos tarjetas",
      run: "Transferir",
      busy: "Moviendo…",
      reset: "Reiniciar",
      idle: "Dos tarjetas. Una transferencia.",
      done: "Los dos saldos cambiaron juntos.",
      a: "Tarjeta A",
      b: "Tarjeta B",
      list: "Transacciones",
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
    mustHold: "Debe cumplirse",
  },
  footer: { rights: "© 2026 Dasiel Torres", top: "Volver arriba" },
  notFound: {
    title: "Página no encontrada",
    text: "Esa página no existe, pero el trabajo sí.",
    back: "Volver al inicio",
  },
};

export default es;
