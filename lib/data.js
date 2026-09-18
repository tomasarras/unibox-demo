import { createRng, pick, randInt } from "./prng";

// Everything below is fictional seed content for a portfolio demo — no
// backend, no real people, no real messaging platforms. Channel ids/colors
// are invented and don't represent any real product's branding.

export const CHANNELS = [
  { id: "directo", iconKey: "camera", color: "#db2777" },
  { id: "chatverde", iconKey: "message", color: "#16a34a" },
  { id: "mensajes", iconKey: "send", color: "#2563eb" },
  { id: "correo", iconKey: "mail", color: "#ea580c" },
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

const THEM_OPENERS = [
  "Hola! ¿Cómo va todo?",
  "¿Seguimos para el finde?",
  "Te mandé el archivo, avisame si te llega",
  "¿Viste lo de ayer?",
  "Perdón la demora en responder",
  "¿Nos juntamos esta semana?",
  "Todo bien por acá, ¿y vos?",
  "Justo te iba a escribir",
  "¿Podés mandarme la dirección?",
  "¿A qué hora nos vemos?",
  "Un gusto hablar con vos",
  "Cualquier cosa avisame",
  "¿Cómo va el proyecto?",
  "Te quería consultar algo",
  "¿Llegaste bien?",
  "Mil gracias por la ayuda",
  "¿Tenés un rato para hablar?",
  "Buenas! ¿Alguna novedad?",
];

const ME_REPLIES = [
  "Todo bien! ¿Y por allá?",
  "Sí, dale, ahí estoy",
  "Gracias, después te cuento",
  "Perfecto",
  "Buenísimo, nos vemos",
  "Ya te aviso",
  "Recién lo vi, disculpá",
  "Genial, contá conmigo",
  "Va a estar bueno",
  "Dale, quedamos así entonces",
  "Sin problema",
  "Ahora lo reviso",
  "Gracias por avisar",
  "Sí, todo en orden por acá",
  "Cuando quieras coordinamos",
];

const AUTO_REPLIES = [
  "Genial, gracias por avisar!",
  "Dale, ahí lo reviso",
  "Perfecto",
  "Buenísimo, nos vemos",
  "Ok, te confirmo en un rato",
  "Gracias! Te escribo después",
  "Recibido",
  "Dale, contá conmigo",
  "Genial, hablamos entonces",
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
