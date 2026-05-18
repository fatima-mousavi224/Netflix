"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const EmailForm = () => {
  const t = useTranslations("HeroForm");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Email submitted:", email);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row items-stretch justify-center gap-2 w-full max-w-150 mx-auto px-4"
    >
      {/* بخش اینپوت با لیبل شناور ظریف و اندازه بهینه */}
      <div className="relative flex-1 min-w-62.5">
        <input
          type="email"
          id="hero-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder=" " 
          className="peer w-full h-12.5 bg-black/50 text-white border border-gray-500/60 rounded px-4 pt-4 pb-1 text-base outline-none focus:border-white focus:ring-[1.5px] focus:ring-white transition-all duration-150"
        />
        
        {/* لیبل شناور منطبق با عکس دکمه فوکوس */}
        <label
          htmlFor="hero-email"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none transition-all duration-150 
          peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-gray-300 peer-focus:font-medium
          peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-300
          rtl:left-auto rtl:right-4"
        >
          {t("emailPlaceholder")}
        </label>
      </div>

      {/* دکمه Get Started هم‌اندازه با ارتفاع اینپوت */}
      <button
        type="submit"
        className="flex items-center justify-center gap-1.5 h-12.5 bg-primary-red hover:bg-red-700 active:bg-red-800 text-white font-medium text-lg rounded px-6 transition-colors duration-150 cursor-pointer whitespace-nowrap"
      >
        <span>{t("getStarted")}</span>
        <ChevronRight size={22} className="rtl:rotate-180" />
      </button>
    </form>
  );
};

export default EmailForm;