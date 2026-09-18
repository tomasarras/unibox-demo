const LOCALES = { es: "es-AR", en: "en-US" };

export function formatMessageTime(iso, lang = "es") {
  const d = new Date(iso);
  return d.toLocaleTimeString(LOCALES[lang] || LOCALES.es, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatConversationTime(iso, lang = "es", t) {
  const d = new Date(iso);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfThat = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startOfToday - startOfThat) / 86400000);

  if (diffDays === 0) return formatMessageTime(iso, lang);
  if (diffDays === 1) return t("yesterday");
  if (diffDays > 1 && diffDays < 7) {
    return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, { weekday: "short" });
  }
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, { day: "2-digit", month: "short" });
}
