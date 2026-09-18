import { Inbox } from "lucide-react";
import ChannelIcon from "@/components/ChannelIcon";
import { CHANNELS } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";

export default function ChannelRail({ selected, onSelect, unreadChannelIds }) {
  const { t } = useLanguage();

  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-2 border-r border-slate-800 bg-slate-900 py-4">
      <button
        type="button"
        onClick={() => onSelect(null)}
        title={t("channel_all")}
        className="flex w-full flex-col items-center gap-1 px-1 py-1"
      >
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
            selected === null ? "bg-cyan-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          <Inbox size={18} />
        </span>
        <span className={`text-[9px] font-medium leading-none ${selected === null ? "text-cyan-400" : "text-slate-500"}`}>
          {t("channel_all")}
        </span>
      </button>

      <div className="my-1 h-px w-8 bg-slate-800" />

      <p className="px-1 text-center text-[8px] font-semibold uppercase leading-tight tracking-wide text-slate-600">
        {t("channel_rail_label")}
      </p>

      {CHANNELS.map((channel) => {
        const active = selected === channel.id;
        return (
          <button
            key={channel.id}
            type="button"
            onClick={() => onSelect(channel.id)}
            title={t(`channel_${channel.id}`)}
            className="relative flex w-full flex-col items-center gap-1 px-1 py-1"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl transition"
              style={{
                background: active ? channel.bg : "transparent",
                color: active ? "#fff" : "#94a3b8",
              }}
            >
              <ChannelIcon iconKey={channel.iconKey} size={18} />
            </span>
            <span
              className="max-w-full truncate text-[9px] font-medium leading-none"
              style={{ color: active ? channel.color : "#64748b" }}
            >
              {t(`channel_${channel.id}`)}
            </span>
            {unreadChannelIds.has(channel.id) && !active && (
              <span
                className="absolute right-2 top-0.5 h-2 w-2 rounded-full ring-2 ring-slate-900"
                style={{ background: channel.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
