// Lightweight client-side i18n: flat dictionary, `es`/`en` per key (or a
// function for pluralized/interpolated strings). No routing involved — see
// LanguageProvider. Contact names and message text are fictional seed
// content and stay untranslated, like the other portfolio demos.
export const dict = {
  brand_name: { es: "Unibox", en: "Unibox" },
  brand_tagline: {
    es: "Bandeja de entrada unificada para atención al cliente · demo de portfolio",
    en: "Unified customer-support inbox · portfolio demo",
  },

  channel_rail_label: { es: "Canales", en: "Channels" },
  channel_all: { es: "Todos", en: "All" },
  channel_directo: { es: "Directo", en: "Direct" },
  channel_chatverde: { es: "Chat Verde", en: "Green Chat" },
  channel_mensajes: { es: "Mensajes", en: "Messages" },
  channel_correo: { es: "Correo", en: "Mail" },

  search_placeholder: { es: "Buscar conversaciones…", en: "Search conversations…" },
  no_conversations: { es: "No hay conversaciones.", en: "No conversations." },

  empty_state_title: { es: "Elegí una conversación", en: "Select a conversation" },
  empty_state_body: {
    es: "Unibox es un proyecto de portfolio: una bandeja de entrada ficticia pensada para el equipo de atención al cliente de un negocio, que simula unificar los mensajes de redes, chat y correo en un solo lugar. Los clientes y mensajes son inventados y se guardan solo en este navegador.",
    en: "Unibox is a portfolio project: a fictional inbox built for a business's support team, simulating the unification of social, chat and email messages in one place. Customers and messages are made up and saved only in this browser.",
  },

  you_prefix: { es: "Vos: ", en: "You: " },
  message_placeholder: { es: "Responder al cliente…", en: "Reply to customer…" },
  typing_indicator: { es: "escribiendo…", en: "typing…" },
  yesterday: { es: "Ayer", en: "Yesterday" },
  back_to_list: { es: "Volver", en: "Back" },
  contact_not_found: { es: "No encontramos esta conversación.", en: "We couldn't find this conversation." },

  footer_made_by: { es: "Hecho por", en: "Made by" },
  footer_code_at: { es: "código en", en: "code on" },
};
