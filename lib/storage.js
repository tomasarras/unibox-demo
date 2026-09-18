const KEY = "unibox_state_v1";

function defaultState() {
  return { readConversationIds: [], extraMessages: {} };
}

export function loadState() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {
      readConversationIds: Array.isArray(parsed.readConversationIds)
        ? parsed.readConversationIds
        : [],
      extraMessages:
        parsed.extraMessages && typeof parsed.extraMessages === "object"
          ? parsed.extraMessages
          : {},
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}
