"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ChannelRail from "@/components/ChannelRail";
import ListPane from "@/components/ListPane";
import { useInbox } from "@/components/InboxProvider";

export default function InboxShell({ children }) {
  const pathname = usePathname();
  const { enrichedConversations } = useInbox();
  const [selectedChannel, setSelectedChannel] = useState(null);

  const isThreadRoute = pathname.startsWith("/c/");
  const activeConversationId = isThreadRoute ? pathname.split("/c/")[1] : null;

  const unreadChannelIds = useMemo(() => {
    const set = new Set();
    for (const entry of enrichedConversations) {
      if (entry.unreadCount > 0) set.add(entry.conversation.channelId);
    }
    return set;
  }, [enrichedConversations]);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className={`${isThreadRoute ? "hidden md:flex" : "flex"}`}>
        <ChannelRail
          selected={selectedChannel}
          onSelect={setSelectedChannel}
          unreadChannelIds={unreadChannelIds}
        />
      </div>

      <div className={`${isThreadRoute ? "hidden md:flex" : "flex"} w-full md:w-auto`}>
        <ListPane selectedChannel={selectedChannel} activeConversationId={activeConversationId} />
      </div>

      <div className={`${isThreadRoute ? "flex" : "hidden md:flex"} min-w-0 flex-1`}>{children}</div>
    </div>
  );
}
