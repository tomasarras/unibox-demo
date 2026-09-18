import { Inbox } from "lucide-react";
import ChannelIcon from "@/components/ChannelIcon";
import { CHANNELS } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";

export default function ChannelRail({ selected, onSelect, unreadChannelIds }) {
  const { t } = useLanguage();

  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-slate-800 bg-slate-900 py-4">
      <button
        type="button"
        onClick={() => onSelect(null)}
        title={t("channel_all")}
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
          selected === null ? "bg-cyan-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
      >
        <Inbox size={18} />
      </button>

      <div className="my-1 h-px w-8 bg-slate-800" />

      {CHANNELS.map((channel) => {
        const active = selected === channel.id;
        return (
          <button
            key={channel.id}
            type="button"
            onClick={() => onSelect(channel.id)}
            title={t(`channel_${channel.id}`)}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl transition"
            style={{
              background: active ? channel.color : "transparent",
              color: active ? "#fff" : "#94a3b8",
            }}
          >
            <ChannelIcon iconKey={channel.iconKey} size={18} />
            {unreadChannelIds.has(channel.id) && !active && (
              <span
                className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2 ring-slate-900"
                style={{ background: channel.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
