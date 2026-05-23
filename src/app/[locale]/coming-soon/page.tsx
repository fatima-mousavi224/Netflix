"use client";
import HomePageHeader from "@/src/ui/header/HomePageHeader";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function ComingSoon() {
  const t = useTranslations("ComingSoon");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <HomePageHeader />
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tighter text-red-600">
          {t("title")}
        </h1>
        <p className="text-zinc-400 text-lg max-w-md">
          {t("description")}
        </p>
        <Link 
          href={`/${locale}`} 
          className="mt-8 px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
        >
          {t("button")}
        </Link>
      </div>
    </div>
  );
}