"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Avatar from "@/components/Avatar";
import ChannelIcon from "@/components/ChannelIcon";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import Composer from "@/components/Composer";
import { Skeleton } from "@/components/Skeleton";
import { useInbox } from "@/components/InboxProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { CHANNELS } from "@/lib/data";

export default function ThreadPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const {
    loading,
    contactsById,
    getConversation,
    getMessages,
    markRead,
    sendMessage,
    typingConversationId,
  } = useInbox();
  const bottomRef = useRef(null);

  const conversation = !loading ? getConversation(id) : null;
  const messages = !loading ? getMessages(id) : [];
  const isTyping = typingConversationId === id;

  useEffect(() => {
    if (conversation) markRead(id);
  }, [conversation, id, markRead]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, isTyping]);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col bg-slate-50">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex-1 space-y-3 p-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="ml-auto h-10 w-2/3" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
        <p className="text-sm text-slate-500">{t("contact_not_found")}</p>
        <Link href="/" className="text-sm font-semibold text-cyan-700 hover:underline">
          {t("back_to_list")}
        </Link>
      </div>
    );
  }

  const contact = contactsById[conversation.contactId];
  const channel = CHANNELS.find((c) => c.id === conversation.channelId);

  return (
    <div className="flex h-full w-full flex-col bg-slate-50">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-3 py-2.5">
        <Link href="/" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden">
          <ChevronLeft size={20} />
        </Link>
        <div className="relative shrink-0">
          <Avatar name={contact.name} color={contact.color} size={38} />
          <span
            className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-white"
            style={{ background: channel.color }}
          >
            <ChannelIcon iconKey={channel.iconKey} size={9} className="text-white" />
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{contact.name}</p>
          <p className="truncate text-xs text-slate-400">{t(`channel_${channel.id}`)}</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <Composer onSend={(text) => sendMessage(id, text)} />
    </div>
  );
}
