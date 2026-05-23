"use client";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, EyeOff, Lock } from "lucide-react";
import HomePageHeader from "@/src/ui/header/HomePageHeader";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const highlights = [
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: t("dataProtection"),
      desc: t("dataProtectionDesc"),
    },
    {
      icon: <EyeOff className="text-blue-500" />,
      title: t("noSelling"),
      desc: t("noSellingDesc"),
    },
    {
      icon: <Lock className="text-amber-500" />,
      title: t("control"),
      desc: t("controlDesc"),
    },
  ];

  return (
    <div>
      <HomePageHeader />
      <div
        className="min-h-screen bg-black text-white p-10 md:px-40"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-zinc-500 mb-12">{t("intro")}</p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-zinc-800 rounded-full">{h.icon}</div>
              <h3 className="font-bold mb-2">{h.title}</h3>
              <p className="text-sm text-zinc-500">{h.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl space-y-8 text-zinc-400">
          <h2 className="text-2xl font-bold text-white">{t("howWeUse")}</h2>
          <p className="leading-7">{t("howWeUseDesc")}</p>

          <h2 className="text-2xl font-bold text-white">{t("cookies")}</h2>
          <p className="leading-7">{t("cookiesDesc")}</p>

          <div
            className={`bg-zinc-900/50 p-6 border-red-600 rounded-md ${isRTL ? "border-r-4" : "border-l-4"}`}
          >
            <p className="text-sm italic">{t("note")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
