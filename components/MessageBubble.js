import { formatMessageTime } from "@/lib/format";
import { useLanguage } from "@/components/LanguageProvider";

export default function MessageBubble({ message }) {
  const { lang } = useLanguage();
  const mine = message.sender === "me";

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
          mine
            ? "rounded-br-sm bg-cyan-600 text-white"
            : "rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-200"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <p className={`mt-1 text-right text-[10px] ${mine ? "text-cyan-100" : "text-slate-400"}`}>
          {formatMessageTime(message.at, lang)}
        </p>
      </div>
    </div>
  );
}
