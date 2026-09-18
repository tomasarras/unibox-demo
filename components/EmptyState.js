"use client";

import { MessageSquareText } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function EmptyState() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 px-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
        <MessageSquareText size={26} />
      </span>
      <h1 className="mt-4 text-lg font-bold text-slate-800">{t("empty_state_title")}</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{t("empty_state_body")}</p>
      <p className="mt-6 text-xs text-slate-400">
        {t("footer_made_by")}{" "}
        <a
          href="https://tomasarras.com.ar"
          className="underline hover:text-slate-600"
          target="_blank"
          rel="noreferrer"
        >
          Tomás Arras
        </a>{" "}
        · {t("footer_code_at")}{" "}
        <a
          href="https://github.com/tomasarras/unibox-demo"
          className="underline hover:text-slate-600"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
