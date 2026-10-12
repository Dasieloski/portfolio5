import type { Locale } from "@/lib/site";

/**
 * Each project is drawn as a schematic of the rule it has to hold. Structure (this file, top) is language
 * neutral; words (bottom) come only from what the case studies already state. No screenshots exist for these
 * products, so nothing here pretends to be product UI.
 */
export type DNode = {
  id: string;
  col: number;
  row: number;
  /** Rows / columns spanned. */
  rs?: number;
  cs?: number;
  /** Step at which the node switches on. */
  at: number;
  /** Step from which the node is shown as "not chosen". */
  dimAt?: number;
  /** Balance level (0..1) per step, drawn as a bar. */
  bar?: number[];
  /** Notes that appear at a given step (keys into the text table). */
  notes?: { at: number; key: string }[];
};
export type DLink = { col: number; row: number; at: number };
export type DiagramCfg = { cols: string; rows: number; steps: number; nodes: DNode[]; links: DLink[] };

export const DIAGRAMS: Record<string, DiagramCfg> = {
  "acr-card": {
    cols: "1fr 2.2rem 1.1fr 2.2rem 1.1fr",
    rows: 3,
    steps: 4,
    nodes: [
      { id: "request", col: 0, row: 0, rs: 3, at: 0 },
      { id: "sysA", col: 2, row: 0, at: 1 },
      { id: "sysB", col: 2, row: 1, at: 1, notes: [{ at: 1, key: "halfway" }] },
      { id: "sysC", col: 2, row: 2, at: 1 },
      { id: "approved", col: 4, row: 0, at: 2, notes: [{ at: 3, key: "one" }] },
      { id: "rejected", col: 4, row: 1, at: 2, dimAt: 2 },
      { id: "pending", col: 4, row: 2, at: 2, dimAt: 2 },
    ],
    links: [
      { col: 1, row: 0, at: 1 },
      { col: 1, row: 1, at: 1 },
      { col: 1, row: 2, at: 1 },
      { col: 3, row: 0, at: 2 },
      { col: 3, row: 1, at: 2 },
      { col: 3, row: 2, at: 2 },
    ],
  },
  "acr-card-app": {
    cols: "1fr 3rem 1fr",
    rows: 2,
    steps: 4,
    nodes: [
      { id: "cardA", col: 0, row: 0, at: 0, bar: [0.78, 0.78, 0.38, 0.38] },
      { id: "cardB", col: 2, row: 0, at: 0, bar: [0.3, 0.3, 0.7, 0.7] },
      { id: "unit", col: 0, row: 1, cs: 3, at: 2, notes: [{ at: 3, key: "retry" }] },
    ],
    links: [{ col: 1, row: 0, at: 1 }],
  },
  "supernova-gateway": {
    cols: "1fr 2rem 1.1fr 2rem 1fr",
    rows: 3,
    steps: 4,
    nodes: [
      { id: "p1", col: 0, row: 0, at: 0 },
      { id: "p2", col: 0, row: 1, at: 0 },
      { id: "p3", col: 0, row: 2, at: 0 },
      { id: "gate", col: 2, row: 0, rs: 3, at: 1, notes: [{ at: 3, key: "one" }] },
      { id: "b1", col: 4, row: 0, at: 2 },
      { id: "b2", col: 4, row: 1, at: 2 },
      { id: "b3", col: 4, row: 2, at: 2 },
    ],
    links: [
      { col: 1, row: 0, at: 1 },
      { col: 1, row: 1, at: 1 },
      { col: 1, row: 2, at: 1 },
      { col: 3, row: 0, at: 2 },
      { col: 3, row: 1, at: 2 },
      { col: 3, row: 2, at: 2 },
    ],
  },
  "acr-pay": {
    cols: "1fr 2rem 1fr 2rem 1fr",
    rows: 2,
    steps: 4,
    nodes: [
      { id: "action", col: 0, row: 0, rs: 2, at: 0 },
      { id: "card", col: 2, row: 0, at: 1 },
      { id: "phone", col: 2, row: 1, at: 1 },
      { id: "credit", col: 4, row: 0, rs: 2, at: 2, notes: [{ at: 3, key: "once" }] },
    ],
    links: [
      { col: 1, row: 0, at: 1 },
      { col: 1, row: 1, at: 1 },
      { col: 3, row: 0, at: 2 },
      { col: 3, row: 1, at: 2 },
    ],
  },
  "gym-victoria": {
    cols: "1fr 1.4rem 1fr 1.4rem 1fr 1.4rem 1fr",
    rows: 3,
    steps: 4,
    nodes: [
      { id: "location", col: 0, row: 0, rs: 2, at: 0 },
      { id: "members", col: 2, row: 0, at: 1 },
      { id: "trainers", col: 2, row: 1, at: 1, notes: [{ at: 1, key: "assigned" }] },
      { id: "memberships", col: 4, row: 0, rs: 2, at: 2 },
      { id: "payments", col: 6, row: 0, rs: 2, at: 3 },
      { id: "roles", col: 0, row: 2, cs: 7, at: 3 },
    ],
    links: [
      { col: 1, row: 0, at: 1 },
      { col: 1, row: 1, at: 1 },
      { col: 3, row: 0, at: 2 },
      { col: 3, row: 1, at: 2 },
      { col: 5, row: 0, at: 3 },
      { col: 5, row: 1, at: 3 },
    ],
  },
  "mk-tattoo-supply": {
    cols: "1fr 2rem 1fr 2rem 1fr",
    rows: 2,
    steps: 4,
    nodes: [
      { id: "orderA", col: 0, row: 0, at: 1 },
      { id: "orderB", col: 0, row: 1, at: 1 },
      { id: "stock", col: 2, row: 0, rs: 2, at: 0, notes: [{ at: 2, key: "atomic" }] },
      { id: "placed", col: 4, row: 0, at: 3 },
      { id: "soldout", col: 4, row: 1, at: 3, dimAt: 3 },
    ],
    links: [
      { col: 1, row: 0, at: 1 },
      { col: 1, row: 1, at: 1 },
      { col: 3, row: 0, at: 3 },
      { col: 3, row: 1, at: 3 },
    ],
  },
};

export type DiagramText = { steps: string[]; nodes: Record<string, string>; notes: Record<string, string> };
type Table = Record<string, DiagramText>;

const en: Table = {
  "acr-card": {
    steps: [
      "A person chooses a card network and submits a request.",
      "The request crosses several systems, and any step can fail halfway.",
      "It ends in exactly one state: approved, rejected or pending.",
      "Nobody is issued two cards. Nobody waits on a request that disappeared.",
    ],
    nodes: { request: "Request", sysA: "System A", sysB: "System B", sysC: "System C", approved: "Approved", rejected: "Rejected", pending: "Pending" },
    notes: { halfway: "can fail halfway", one: "exactly one" },
  },
  "acr-card-app": {
    steps: [
      "Two cards. One transfer.",
      "A transfer changes two balances.",
      "Both changes happen together or not at all.",
      "A retried request or a dropped connection cannot apply it twice.",
    ],
    nodes: { cardA: "Card A", cardB: "Card B", unit: "One unit of work" },
    notes: { retry: "a retry changes nothing" },
  },
  "supernova-gateway": {
    steps: [
      "Products that want to charge someone.",
      "The gateway sits between them and the money.",
      "Banks and financial services, each with its own protocol.",
      "Retries, timeouts and duplicates are the normal case. Every attempt becomes one outcome: paid or not paid.",
    ],
    nodes: { p1: "Product A", p2: "Product B", p3: "Product C", gate: "Gateway", b1: "Bank A", b2: "Financial service", b3: "Bank B" },
    notes: { one: "retries, timeouts, duplicates: one outcome" },
  },
  "acr-pay": {
    steps: [
      "One action: top up.",
      "Two kinds of target: a classic card or a mobile line.",
      "Different operations, different confirmation paths.",
      "A slow or repeated confirmation still credits exactly once.",
    ],
    nodes: { action: "Top up", card: "Classic card", phone: "Mobile line", credit: "Credit" },
    notes: { once: "credited once" },
  },
  "gym-victoria": {
    steps: [
      "Locations are the tenant everything belongs to.",
      "Members belong to a location. Trainers are assigned to members.",
      "Members hold memberships.",
      "Memberships are settled by payments, with referential integrity throughout.",
    ],
    nodes: {
      location: "Locations",
      members: "Members",
      trainers: "Trainers",
      memberships: "Memberships",
      payments: "Payments",
      roles: "Role-based access: admin, trainer, member",
    },
    notes: { assigned: "assigned to members" },
  },
  "mk-tattoo-supply": {
    steps: [
      "One unit left.",
      "Two orders arrive together.",
      "Stock is checked atomically.",
      "Order A is placed. Order B sees it sold out. No overselling.",
    ],
    nodes: { orderA: "Order A", orderB: "Order B", stock: "Stock: 1 unit", placed: "Placed", soldout: "Sold out" },
    notes: { atomic: "checked atomically" },
  },
};

const es: Table = {
  "acr-card": {
    steps: [
      "Una persona elige una red de tarjetas y envía una solicitud.",
      "La solicitud cruza varios sistemas y cualquier paso puede fallar a medias.",
      "Termina en exactamente un estado: aprobada, rechazada o pendiente.",
      "A nadie se le emiten dos tarjetas. Nadie espera una solicitud que desapareció.",
    ],
    nodes: { request: "Solicitud", sysA: "Sistema A", sysB: "Sistema B", sysC: "Sistema C", approved: "Aprobada", rejected: "Rechazada", pending: "Pendiente" },
    notes: { halfway: "puede fallar a medias", one: "exactamente una" },
  },
  "acr-card-app": {
    steps: [
      "Dos tarjetas. Una transferencia.",
      "Una transferencia cambia dos saldos.",
      "Los dos cambios ocurren juntos o no ocurren.",
      "Una petición repetida o una conexión caída no pueden aplicarla dos veces.",
    ],
    nodes: { cardA: "Tarjeta A", cardB: "Tarjeta B", unit: "Una unidad de trabajo" },
    notes: { retry: "un reintento no cambia nada" },
  },
  "supernova-gateway": {
    steps: [
      "Productos que quieren cobrar a alguien.",
      "La pasarela se sitúa entre ellos y el dinero.",
      "Bancos y servicios financieros, cada uno con su propio protocolo.",
      "Reintentos, timeouts y duplicados son lo normal. Cada intento se convierte en un resultado: pagado o no pagado.",
    ],
    nodes: { p1: "Producto A", p2: "Producto B", p3: "Producto C", gate: "Pasarela", b1: "Banco A", b2: "Servicio financiero", b3: "Banco B" },
    notes: { one: "reintentos, timeouts, duplicados: un resultado" },
  },
  "acr-pay": {
    steps: [
      "Una acción: recargar.",
      "Dos tipos de destino: una tarjeta clásica o una línea móvil.",
      "Operaciones distintas, caminos de confirmación distintos.",
      "Una confirmación lenta o repetida acredita exactamente una vez.",
    ],
    nodes: { action: "Recargar", card: "Tarjeta clásica", phone: "Línea móvil", credit: "Crédito" },
    notes: { once: "acreditado una vez" },
  },
  "gym-victoria": {
    steps: [
      "Las sedes son el inquilino al que pertenece todo.",
      "Los socios pertenecen a una sede. Los entrenadores se asignan a socios.",
      "Los socios tienen membresías.",
      "Las membresías se saldan con pagos, con integridad referencial en todo el esquema.",
    ],
    nodes: {
      location: "Sedes",
      members: "Socios",
      trainers: "Entrenadores",
      memberships: "Membresías",
      payments: "Pagos",
      roles: "Acceso por roles: admin, entrenador, socio",
    },
    notes: { assigned: "asignados a socios" },
  },
  "mk-tattoo-supply": {
    steps: [
      "Queda una unidad.",
      "Llegan dos pedidos a la vez.",
      "El stock se comprueba de forma atómica.",
      "El pedido A se confirma. El pedido B lo ve agotado. Sin sobreventa.",
    ],
    nodes: { orderA: "Pedido A", orderB: "Pedido B", stock: "Stock: 1 unidad", placed: "Confirmado", soldout: "Agotado" },
    notes: { atomic: "comprobado de forma atómica" },
  },
};

export const diagramText = (lang: Locale, slug: string): DiagramText | undefined => (lang === "es" ? es : en)[slug];

export const DIAGRAM_NOTE: Record<Locale, string> = {
  en: "A diagram of the rule this system has to hold. Not a screenshot.",
  es: "Un diagrama de la regla que este sistema debe cumplir. No es una captura.",
};
