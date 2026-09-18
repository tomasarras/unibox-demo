"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Composer({ onSend }) {
  const { t } = useLanguage();
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("message_placeholder")}
        className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <SendHorizontal size={16} />
      </button>
    </form>
  );
}
