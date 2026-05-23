"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import HomePageHeader from "@/src/ui/header/HomePageHeader";

export default function TermsPage() {
  const t = useTranslations("Terms");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sections = [
    {
      id: "membership",
      title: t("membershipTitle"),
      content: t("membershipContent"),
    },
    { id: "billing", title: t("billingTitle"), content: t("billingContent") },
    { id: "service", title: t("serviceTitle"), content: t("serviceContent") },
    {
      id: "passwords",
      title: t("passwordsTitle"),
      content: t("passwordsContent"),
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <HomePageHeader />
      <div
        className="min-h-screen bg-grey-900 text-white p-10 md:px-40 flex gap-10"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <aside
          className={`hidden lg:block w-64 sticky top-10 h-fit space-y-4 ${isRTL ? "border-r pr-4" : "border-l pl-4"} border-zinc-700`}
        >
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">
            {t("tableOfContents")}
          </p>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`block w-full transition text-sm ${isRTL ? "text-right" : "text-left"} text-zinc-400 hover:text-red-600`}
            >
              {s.title}
            </button>
          ))}
        </aside>

        <main className="flex-1 max-w-3xl">
          <h1 className="text-4xl font-bold mb-10">{t("title")}</h1>
          <p className="text-zinc-400 mb-8 italic">{t("lastUpdated")}</p>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-10">
                <h2 className="text-2xl font-bold mb-4 text-zinc-200">
                  {s.title}
                </h2>
                <p className="text-zinc-400 leading-7 text-justify">
                  {s.content}
                </p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
