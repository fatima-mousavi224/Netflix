"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import HomePageHeader from "@/src/ui/header/HomePageHeader";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div>
      <HomePageHeader />
      <div
        className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-md bg-zinc-900 p-8 rounded-lg shadow-xl border border-zinc-800">
          <h1 className="text-3xl font-bold mb-6 text-center">{t("title")}</h1>

          {sent ? (
            <div className="bg-emerald-500/20 text-emerald-500 p-4 rounded-md mb-6 text-center border border-emerald-500/50">
              {t("success")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  className="w-full p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-red-600 outline-none transition"
                />
              </div>
              <div className="space-y-1">
                <textarea
                  placeholder={t("messagePlaceholder")}
                  required
                  className="w-full p-3 bg-zinc-800 rounded border border-zinc-700 h-32 focus:border-red-600 outline-none transition resize-none"
                />
              </div>
              <button className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/20">
                {t("sendButton")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
