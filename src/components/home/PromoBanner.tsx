"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const PromoBanner = () => {
  const t = useTranslations("PromoBanner");

  return (
    <div className="w-full mx-auto">
      <div className="relative flex items-center justify-center w-full lg:px-40 md:px-20 px-8 py-6 overflow-hidden bg-linear-to-r from-[#000814] via-[#451025] to-[#000814]">
        
        <div className="absolute left-0 top-0 w-1/3 h-full bg-[#0d1b2a]/40 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-6 max-w-162.5 mx-auto z-10 text-left rtl:text-right">
          
          <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <Image src="/images/popcurn.png" alt="popcuren image" fill />
          </div>

          {/* ۲. بخش متون بنر */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-bold text-sm md:text-xl tracking-wide">
              {t("title")}
            </h3>
            <p className="text-gray-300 font-normal text-sm md:text-base">
              {t("subtitle")}
            </p>
            
            {/* لینک Learn More اکشن و جذاب */}
            <Link
              href="#"
              className="inline-flex items-center gap-0.5 text-[#4481eb] hover:text-blue-400 font-semibold text-sm md:text-base mt-2 group w-fit transition-colors"
            >
              <span>{t("learnMore")}</span>
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PromoBanner;