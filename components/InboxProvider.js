"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  generateInbox,
  getAllMessages,
  lastMessageOf,
  makeId,
  pickAutoReply,
} from "@/lib/data";
import { loadState, saveState } from "@/lib/storage";
import { randomDelay } from "@/lib/delay";

const InboxContext = createContext(null);

export function InboxProvider({ children }) {
  const [inbox, setInbox] = useState(null);
  const [userState, setUserState] = useState(null);
  const [typingConversationId, setTypingConversationId] = useState(null);

  useEffect(() => {
    randomDelay().then(() => {
      setInbox(generateInbox());
      setUserState(loadState());
    });
  }, []);

  useEffect(() => {
    if (userState) saveState(userState);
  }, [userState]);

  const contactsById = useMemo(() => {
    if (!inbox) return {};
    const map = {};
    for (const c of inbox.contacts) map[c.id] = c;
    return map;
  }, [inbox]);

  const getConversation = useCallback(
    (id) => inbox?.conversations.find((c) => c.id === id) || null,
    [inbox]
  );

  const getMessages = useCallback(
    (conversationId) => {
      const conversation = getConversation(conversationId);
      if (!conversation) return [];
      return getAllMessages(conversation, userState?.extraMessages?.[conversationId]);
    },
    [getConversation, userState]
  );

  const getUnreadCount = useCallback(
    (conversationId) => {
      if (userState?.readConversationIds.includes(conversationId)) return 0;
      return getConversation(conversationId)?.seedUnreadCount || 0;
    },
    [getConversation, userState]
  );

  const markRead = useCallback((conversationId) => {
    setUserState((prev) => {
      if (!prev || prev.readConversationIds.includes(conversationId)) return prev;
      return { ...prev, readConversationIds: [...prev.readConversationIds, conversationId] };
    });
  }, []);

  const sendMessage = useCallback((conversationId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const message = { id: makeId("msg"), sender: "me", text: trimmed, at: new Date().toISOString() };
    setUserState((prev) => ({
      ...prev,
      extraMessages: {
        ...prev.extraMessages,
        [conversationId]: [...(prev.extraMessages[conversationId] || []), message],
      },
    }));

    setTypingConversationId(conversationId);
    randomDelay(2600, 1200).then(() => {
      const reply = {
        id: makeId("msg"),
        sender: "them",
        text: pickAutoReply(`${conversationId}-${message.id}`),
        at: new Date().toISOString(),
      };
      setUserState((prev) => ({
        ...prev,
        extraMessages: {
          ...prev.extraMessages,
          [conversationId]: [...(prev.extraMessages[conversationId] || []), reply],
        },
      }));
      setTypingConversationId((cur) => (cur === conversationId ? null : cur));
    });
  }, []);

  const enrichedConversations = useMemo(() => {
    if (!inbox) return [];
    return inbox.conversations
      .map((conversation) => {
        const extra = userState?.extraMessages?.[conversation.id];
        const lastMessage = lastMessageOf(conversation, extra);
        const contact = contactsById[conversation.contactId];
        const unreadCount = userState?.readConversationIds.includes(conversation.id)
          ? 0
          : conversation.seedUnreadCount;
        return { conversation, contact, lastMessage, unreadCount };
      })
      .sort((a, b) => new Date(b.lastMessage?.at || 0) - new Date(a.lastMessage?.at || 0));
  }, [inbox, userState, contactsById]);

  const loading = !inbox || !userState;

  const value = {
    loading,
    contactsById,
    enrichedConversations,
    typingConversationId,
    getConversation,
    getMessages,
    getUnreadCount,
    markRead,
    sendMessage,
  };

  return <InboxContext.Provider value={value}>{children}</InboxContext.Provider>;
}

export function useInbox() {
  return useContext(InboxContext);
}
