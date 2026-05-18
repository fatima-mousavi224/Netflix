// "use client";

// import LanguageSwitcher from "@/src/components/LanguageSwitcher";
// import Image from "next/image";
// import Link from "next/link";

// const HomePageFooter = () => {
//   return (
//     <section className="bg-grey-850 text-grey-200 lg:px-40 md:px-20 px-8 md:py-18 py-8 gap-12">
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

//       {/* ----------------------- */}
//       <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">
//         {/* 1 */}

//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Audio Description</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Investor Relations</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Privacy</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Contact Us</Link>
//           </p>
//         </div>

//         {/* 2 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Help Center</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Jobs</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Legal Notices</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Do Not Sell or Share My Personal Information</Link>
//           </p>
//         </div>

//         {/* 3 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Gift Cards</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Netflix Shop</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Cookie Preferences</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Ad Choices</Link>
//           </p>
//         </div>

//         {/* 4 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Media Center</Link>
//           </p>
//           <p className="hover:underline underline-offset-4">
//             <Link href="#">Terms of Use</Link>
//           </p>
//           <p className="hover:underline underline-offset-4 ">
//             <Link href="#">Corporate Information</Link>
//           </p>
//         </div>
//       </div>
//       <div className="mt-3">
//        <button className="text-reg-body px-3 py-1 border border-grey-200 mb-4">Service Code</button>
//        <p className="text-grey-200 text-reg-c1">© 1405 - 2026 Netflix, Inc.</p>
//       </div>
//     </section>
//   );
// };

// export default HomePageFooter;


"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/src/components/LanguageSwitcher";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";

const HomePageFooter = () => {
  const t = useTranslations("Footer");

  return (
    <section className="bg-grey-850 text-grey-200 lg:px-40 md:px-20 px-8 md:py-18 py-8 gap-12">
      <div className="flex gap-8 pb-6">
        <Image
          src="/icons/facebook.svg"
          alt="social icons"
          width={13}
          height={13}
          className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        />
        <Image
          src="/icons/Instagram copy.svg"
          alt="social icons"
          width={24}
          height={24}
          className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        />
        <Image
          src="/icons/tiweter.svg"
          alt="social icons"
          width={24}
          height={24}
          className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        />
        <Image
          src="/icons/YouTube.svg"
          alt="social icons"
          width={28}
          height={28}
          className=" transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        />
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">
        {/* 1 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("audioDescription")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("investorRelations")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("privacy")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("contactUs")}</Link>
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("helpCenter")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("jobs")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("legalNotices")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("doNotSell")}</Link>
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("giftCards")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("netflixShop")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("cookiePreferences")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("adChoices")}</Link>
          </p>
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("mediaCenter")}</Link>
          </p>
          <p className="hover:underline underline-offset-4">
            <Link href="#">{t("termsOfUse")}</Link>
          </p>
          <p className="hover:underline underline-offset-4 ">
            <Link href="#">{t("corporateInformation")}</Link>
          </p>
        </div>
      </div>
      
      <div className="mt-3">
        <button className="text-reg-body px-3 py-1 border border-grey-200 mb-4">{t("serviceCode")}</button>
        <p className="text-grey-200 text-reg-c1">© 1405 - 2026 Netflix, Inc.</p>
      </div>
    </section>
  );
};

export default HomePageFooter;
