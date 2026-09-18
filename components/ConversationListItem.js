import Link from "next/link";
import Avatar from "@/components/Avatar";
import ChannelIcon from "@/components/ChannelIcon";
import { CHANNELS } from "@/lib/data";
import { formatConversationTime } from "@/lib/format";
import { useLanguage } from "@/components/LanguageProvider";

export default function ConversationListItem({ entry, active }) {
  const { t, lang } = useLanguage();
  const { conversation, contact, lastMessage, unreadCount } = entry;
  const channel = CHANNELS.find((c) => c.id === conversation.channelId);
  const unread = unreadCount > 0;

  return (
    <Link
      href={`/c/${conversation.id}`}
      className={`flex items-start gap-3 border-b border-slate-100 px-3 py-3 transition ${
        active ? "bg-cyan-50" : "hover:bg-slate-50"
      }`}
    >
      <div className="relative shrink-0">
        <Avatar name={contact.name} color={contact.color} size={44} />
        <span
          className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white"
          style={{ background: channel.color }}
        >
          <ChannelIcon iconKey={channel.iconKey} size={11} className="text-white" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className={`truncate text-sm ${unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
            {contact.name}
          </p>
          <span className={`shrink-0 text-[11px] ${unread ? "font-semibold text-cyan-700" : "text-slate-400"}`}>
            {lastMessage ? formatConversationTime(lastMessage.at, lang, t) : ""}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className={`truncate text-xs ${unread ? "font-medium text-slate-600" : "text-slate-400"}`}>
            {lastMessage?.sender === "me" ? t("you_prefix") : ""}
            {lastMessage?.text}
          </p>
          {unread && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-cyan-600 px-1.5 text-[11px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
