"use client";

import { useMemo, useState } from "react";
import { MessageSquareText, Search } from "lucide-react";
import ConversationListItem from "@/components/ConversationListItem";
import LanguageToggle from "@/components/LanguageToggle";
import { Skeleton } from "@/components/Skeleton";
import { useInbox } from "@/components/InboxProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function ListPane({ selectedChannel, activeConversationId }) {
  const { t } = useLanguage();
  const { loading, enrichedConversations } = useInbox();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = enrichedConversations;
    if (selectedChannel) list = list.filter((e) => e.conversation.channelId === selectedChannel);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (e) =>
          e.contact.name.toLowerCase().includes(q) ||
          e.lastMessage?.text.toLowerCase().includes(q)
      );
    }
    return list;
  }, [enrichedConversations, selectedChannel, search]);

  return (
    <div className="flex h-full w-full flex-col border-r border-slate-200 bg-white md:w-80 lg:w-96">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white">
          <MessageSquareText size={17} />
        </span>
        <p className="text-sm font-bold text-slate-900">{t("brand_name")}</p>
        <div className="ml-auto">
          <LanguageToggle />
        </div>
      </div>

      <div className="border-b border-slate-100 p-3">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-1 p-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-400">{t("no_conversations")}</p>
        ) : (
          filtered.map((entry) => (
            <ConversationListItem
              key={entry.conversation.id}
              entry={entry}
              active={entry.conversation.id === activeConversationId}
            />
          ))
        )}
      </div>
    </div>
  );
}
