
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import EmailForm from "./EmailForm"; 

const FAQSection = () => {
  const t = useTranslations("FAQ");
  const tHero = useTranslations("Hero");
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    { id: 1, q: t("q1"), a: t("a1") },
    { id: 2, q: t("q2"), a: t("a2") },
    { id: 3, q: t("q3"), a: t("a3") },
    { id: 4, q: t("q4"), a: t("a4") },
    { id: 5, q: t("q5"), a: t("a5") },
    { id: 6, q: t("q6"), a: t("a6") },
  ];

  return (
    <section className="w-full lg:px-40 md:px-20 px-8 py-16 bg-primary-black border-b-6 border-grey-800 text-white selection:bg-red-600">
      <div className="max-w-212.5 mx-auto flex flex-col items-center">
        
        <h2 className="text-2xl md:text-[40px] font-bold text-center mb-8 tracking-tight">
          {t("title")}
        </h2>

        <div className="w-full flex flex-col gap-2 mb-14">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.id} className="w-full">
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-3 bg-grey-700 hover:bg-grey-400 transition-colors duration-150 text-left rtl:text-right text-med-sb md:text-med-body font-normal cursor-pointer select-none"
                >
                  <span>{item.q}</span>
                  <Plus 
                    size={26} 
                    className={`transform transition-transform duration-200 ease-in-out shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out text-left rtl:text-right bg-[#2d2d2d] ${
                    isOpen 
                      ? "grid-rows-[1fr] opacity-100 p-6 mt-0.5" 
                      : "grid-rows-[0fr] opacity-0 p-0 overflow-hidden mt-0"
                  }`}
                >
                  <div className="overflow-hidden text-med-sb md:text-med-body leading-relaxed text-gray-200 whitespace-pre-line">
                    <div className={isOpen ? "block" : "hidden"}>
                      {item.a}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="w-full text-center flex flex-col items-center gap-4">
          <p className="text-med-sb md:text-med-body font-normal px-4 max-w-175">
            {tHero("description")}
          </p>
          <div className="w-full">
            <EmailForm />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;