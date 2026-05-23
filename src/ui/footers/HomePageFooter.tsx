// "use client";

// import { useTranslations } from "next-intl";
// import LanguageSwitcher from "@/src/components/LanguageSwitcher";
// import Image from "next/image";
// import { Link } from "@/src/i18n/routing";

// const HomePageFooter = () => {
//   const t = useTranslations("Footer");

//   return (
//     <section className="bg-primary-black text-grey-200 lg:px-40 md:px-20 px-8 md:pb-18 pb-8 gap-12">
//       <div className="flex gap-8 pb-6">
//         <Image
//           src="/icons/facebook.svg"
//           alt="social icons"
//           width={13}
//           height={13}
//           className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//         />
//         <Image
//           src="/icons/Instagram copy.svg"
//           alt="social icons"
//           width={24}
//           height={24}
//           className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//         />
//         <Image
//           src="/icons/tiweter.svg"
//           alt="social icons"
//           width={24}
//           height={24}
//           className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//         />
//         <Image
//           src="/icons/YouTube.svg"
//           alt="social icons"
//           width={28}
//           height={28}
//           className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//         />
//       </div>

//       <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">
//         {/* 1 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("audioDescription")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("investorRelations")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("privacy")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("contactUs")}</Link>
//           </p>
//         </div>

//         {/* 2 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("helpCenter")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("jobs")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("legalNotices")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("doNotSell")}</Link>
//           </p>
//         </div>

//         {/* 3 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("giftCards")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("netflixShop")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("cookiePreferences")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("adChoices")}</Link>
//           </p>
//         </div>

//         {/* 4 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("mediaCenter")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">{t("termsOfUse")}</Link>
//           </p>
//           <p className="hover:underline underline-offset-4 ">
//             <Link href="#">{t("corporateInformation")}</Link>
//           </p>
//         </div>
//       </div>

//       <div className="mt-3">
//         <button className="text-reg-body px-3 py-1 border border-grey-200 mb-4">{t("serviceCode")}</button>
//         <p className="text-grey-200 text-reg-c1">© 1405 - 2026 Netflix, Inc.</p>
//       </div>
//     </section>
//   );
// };

// export default HomePageFooter;

"use client";

import { useState } from "react"; // اضافه شد
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";

const HomePageFooter = () => {
  const t = useTranslations("Footer");

  // لاجیک دکمه سرویس کد
  const [serviceCode, setServiceCode] = useState(t("serviceCode"));
  const showServiceCode = () => {
    const code = Math.floor(Math.random() * 900000) + 100000;
    setServiceCode(String(code));
  };

  return (
    <section className="bg-primary-black text-grey-200 lg:px-40 md:px-20 px-8 md:pb-18 pb-8 gap-12">
      {/* بخش شبکه‌های اجتماعی با لینک‌های واقعی */}
      <div className="flex gap-8 pb-6">
        <a href="https://facebook.com" target="_blank" rel="nofollow">
          <Image
            src="/icons/facebook.svg"
            alt="facebook"
            width={13}
            height={13}
            className="transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          />
        </a>
        <a href="https://instagram.com" target="_blank" rel="nofollow">
          <Image
            src="/icons/Instagram copy.svg"
            alt="instagram"
            width={24}
            height={24}
            className="transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="nofollow">
          <Image
            src="/icons/tiweter.svg"
            alt="twitter"
            width={24}
            height={24}
            className="transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          />
        </a>
        <a href="https://youtube.com" target="_blank" rel="nofollow">
          <Image
            src="/icons/YouTube.svg"
            alt="youtube"
            width={28}
            height={28}
            className="transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          />
        </a>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("audioDescription")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <a
              href="https://ir.netflix.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("investorRelations")}
            </a>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/privacy">{t("privacy")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/contact">{t("contactUs")}</Link>
          </p>
        </div>

        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="/help">{t("helpCenter")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <a
              href="https://jobs.netflix.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              
              {t("jobs")}
            </a>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("legalNotices")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("doNotSell")}</Link>
          </p>
        </div>

        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("giftCards")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("netflixShop")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("cookiePreferences")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("adChoices")}</Link>
          </p>
        </div>

        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="/coming-soon">{t("mediaCenter")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="/terms">{t("termsOfUse")}</Link>
          </p>
          <p className="hover:underline underline-offset-4 ">
            <Link href="/coming-soon">{t("corporateInformation")}</Link>
          </p>
        </div>
      </div>

      <div className="mt-3">
        {/* استفاده از استیت برای دکمه */}
        <button
          onClick={showServiceCode}
          className="text-reg-body px-3 py-1 border border-grey-200 mb-4 hover:bg-white/10 transition-colors"
        >
          {serviceCode}
        </button>
        {/* سال داینامیک */}
        <p className="text-grey-200 text-reg-c1">
          © 1997 - {new Date().getFullYear()} Netflix, Inc.
        </p>
      </div>
    </section>
  );
};

export default HomePageFooter;
