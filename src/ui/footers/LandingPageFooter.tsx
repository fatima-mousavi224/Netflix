// "use client";

// import LanguageSwitcher from "@/src/components/LanguageSwitcher";
// import Link from "next/link";

// const LandingPageFooter = () => {
//   return (
//     <section className="bg-grey-850 text-grey-100 lg:px-40 md:px-20 px-8 md:py-18 py-8 gap-12">
//       <p className="md:text-reg-body text-reg-c1 pb-5">
//         Questions? Call{" "}
//         <span className="underline underline-offset-4 hover:no-underline"> 1-844-505-2993</span>
//       </p>
//       <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">

//         {/* 1 */}

//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">FQA</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Investor Relations</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Buy Gift Cards</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Cookie Preferences</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Legal Notices</Link>
//           </p>
//         </div>

//         {/* 2 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Help Center</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Jobs</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Ways to Watch</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Corporate Information</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Only on Netflix</Link>
//           </p>
//         </div>

//         {/* 3 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Account</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Netflix Shop</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Terms of Use</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Contact Us</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Do Not Sell or Share Personal Information</Link>
//           </p>
//         </div>

//         {/* 4 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Media Center</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Redeem Gift Cards</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Privacy</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Speed Test</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Ad Choices</Link>
//           </p>
//         </div>
//       </div>
//       <div className="mt-4">
//         <LanguageSwitcher />
//       </div>
//     </section>
//   );
// };

// export default LandingPageFooter;

"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/src/components/LanguageSwitcher";
import { Link } from "@/src/i18n/routing";

const LandingPageFooter = () => {
  const t = useTranslations("Footer");

  return (
    <section className="bg-primary-black text-grey-100 lg:px-40 md:px-20 px-8 md:py-18 py-8 gap-12">
      <p className="md:text-reg-body text-reg-c1 pb-5">
        {t("questionsCall")}{" "}
        <span className="underline underline-offset-4 hover:no-underline">
          {" "}
          1-844-505-2993
        </span>
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">
        {/* 1 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/help">{t("fqa")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <a
              href="https://ir.netflix.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("investorRelations")}
            </a>{" "}
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("buyGiftCards")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("cookiePreferences")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("legalNotices")}</Link>
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/help">{t("helpCenter")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <a
              href="https://jobs.netflix.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("jobs")}
            </a>{" "}
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("waysToWatch")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("corporateInformation")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("onlyOnNetflix")}</Link>
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/profiles">{t("account")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("netflixShop")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/terms">{t("termsOfUse")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/contact">{t("contactUs")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("doNotSell")}</Link>
          </p>
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("mediaCenter")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("redeemGiftCards")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/privacy">{t("privacy")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("speedTest")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="/coming-soon">{t("adChoices")}</Link>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <LanguageSwitcher />
      </div>
    </section>
  );
};

export default LandingPageFooter;
