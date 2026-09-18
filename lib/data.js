import { createRng, pick, randInt } from "./prng";

// Everything below is fictional seed content for a portfolio demo — no
// backend, no real people, no real messaging platforms. Channel ids and
// colors are invented; the gradients echo the general color families of
// well-known chat apps (so the rail reads instantly as "social / chat /
// messenger / email") without reproducing any real logo artwork.

export const CHANNELS = [
  {
    id: "directo",
    iconKey: "camera",
    color: "#c2185b",
    bg: "linear-gradient(135deg, #f7b733 0%, #e1306c 45%, #7b2ff7 100%)",
  },
  { id: "chatverde", iconKey: "phone", color: "#16a34a", bg: "#22c55e" },
  {
    id: "mensajes",
    iconKey: "zap",
    color: "#4f46e5",
    bg: "linear-gradient(135deg, #00b2ff 0%, #7b61ff 55%, #ff5c8d 100%)",
  },
  { id: "correo", iconKey: "mail", color: "#ea580c", bg: "#f97316" },
];

const AVATAR_COLORS = [
  "#f472b6",
  "#38bdf8",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
  "#22d3ee",
  "#facc15",
];

const FIRST_NAMES = [
  "Julieta",
  "Martín",
  "Camila",
  "Lucas",
  "Sofía",
  "Diego",
  "Valentina",
  "Mateo",
  "Renata",
  "Tomás",
  "Agustina",
  "Bruno",
  "Carla",
  "Franco",
  "Emma",
  "Iván",
  "Lucía",
  "Nicolás",
  "Paula",
  "Simón",
  "Ana",
  "Pedro",
  "Rocío",
  "Gonzalo",
];

const LAST_NAMES = [
  "Fernández",
  "Gómez",
  "Rodríguez",
  "Silva",
  "Torres",
  "Vidal",
  "Romero",
  "Castro",
  "Molina",
  "Ortiz",
  "Herrera",
  "Suárez",
  "Navarro",
  "Reyes",
  "Campos",
];

// "them" = a customer writing in; "me" = the business's support/sales agent.
const THEM_OPENERS = [
  "Hola! ¿El pedido #4821 ya salió?",
  "¿Tienen stock de la talla M?",
  "Quería consultar por la garantía de mi compra",
  "¿Puedo cambiar la dirección de envío?",
  "El producto llegó con un defecto, ¿cómo lo gestiono?",
  "¿Cuál es el tiempo de entrega a Córdoba?",
  "¿Aceptan pagos con Mercado Pago?",
  "Necesito la factura de mi última compra",
  "¿A partir de qué monto el envío es gratis?",
  "Buenas! ¿Están abiertos hoy?",
  "¿Puedo retirar el pedido por el local?",
  "Gracias por la respuesta tan rápida",
  "¿Cómo hago para cambiar un producto?",
  "¿El descuento del 20% sigue vigente?",
  "¿Me confirman el horario de atención?",
  "¿Tienen este modelo en otro color?",
  "¿Cuánto tarda en llegar el reembolso?",
  "Hola, quería hacer una consulta antes de comprar",
];

const ME_REPLIES = [
  "¡Hola! Sí, tu pedido ya está en camino 🚚",
  "Tenemos stock, ¿querés que te lo reserve?",
  "Claro, te paso los datos de la garantía",
  "Sí, podemos actualizar la dirección sin problema",
  "Lamentamos el inconveniente, te ayudamos con el cambio",
  "La entrega a Córdoba demora entre 3 y 5 días hábiles",
  "Sí, aceptamos Mercado Pago y tarjeta",
  "Te enviamos la factura por este mismo medio",
  "El envío es gratis a partir de $50.000",
  "Sí, estamos abiertos hasta las 19hs",
  "Podés retirarlo en nuestro local de Palermo",
  "¡Gracias a vos por escribirnos!",
  "Te paso el link para gestionar el cambio",
  "Sí, el descuento sigue activo hasta fin de mes",
  "Atendemos de lunes a sábado de 9 a 19hs",
  "Sí, tenemos en negro y en gris",
  "El reembolso se acredita en 5 a 7 días hábiles",
  "¡Contanos! Estamos para ayudarte",
];

const AUTO_REPLIES = [
  "Perfecto, muchas gracias!",
  "Genial, quedo atento/a",
  "Dale, gracias por la info",
  "Ok, muchas gracias por la ayuda",
  "Excelente, así lo hago",
  "Gracias, muy buena atención!",
  "Perfecto, entonces espero el pedido",
  "Genial, gracias por responder tan rápido",
  "Ok, quedo pendiente entonces",
];

function toISO(date) {
  return date.toISOString();
}

export function generateInbox() {
  const rng = createRng("unibox-inbox-v1");
  const now = new Date();

  const contacts = [];
  const usedNames = new Set();
  for (let i = 0; i < 24; i++) {
    let name;
    do {
      name = `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_NAMES)}`;
    } while (usedNames.has(name));
    usedNames.add(name);

    contacts.push({
      id: `contact_${i}`,
      name,
      color: pick(rng, AVATAR_COLORS),
      channelId: CHANNELS[i % CHANNELS.length].id,
    });
  }

  const conversations = contacts.map((contact, i) => {
    const messageCount = randInt(rng, 4, 9);
    const hoursAgoLast = i < 5 ? randInt(rng, 0, 5) : randInt(rng, 8, 160);
    const lastAt = new Date(now.getTime() - hoursAgoLast * 60 * 60 * 1000);

    const messages = [];
    let cursor = new Date(lastAt.getTime() - (messageCount - 1) * randInt(rng, 6, 40) * 60 * 1000);
    for (let m = 0; m < messageCount; m++) {
      const sender = m % 2 === 0 ? "them" : "me";
      const text = sender === "them" ? pick(rng, THEM_OPENERS) : pick(rng, ME_REPLIES);
      messages.push({
        id: `msg_${i}_${m}`,
        sender,
        text,
        at: toISO(cursor),
      });
      cursor = new Date(cursor.getTime() + randInt(rng, 6, 40) * 60 * 1000);
    }
    // Make sure the thread actually ends at lastAt.
    messages[messages.length - 1].at = toISO(lastAt);

    const unreadCount = i < 8 ? pick(rng, [0, 0, 1, 1, 2, 3]) : 0;

    return {
      id: `conv_${i}`,
      contactId: contact.id,
      channelId: contact.channelId,
      seedUnreadCount: unreadCount,
      seedMessages: messages,
    };
  });

  return { contacts, conversations };
}

export function getAllMessages(conversation, extraMessages) {
  return [...conversation.seedMessages, ...(extraMessages || [])];
}

export function lastMessageOf(conversation, extraMessages) {
  const all = getAllMessages(conversation, extraMessages);
  return all[all.length - 1] || null;
}

export function pickAutoReply(rngSeed) {
  const rng = createRng(rngSeed);
  return pick(rng, AUTO_REPLIES);
}

export function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
