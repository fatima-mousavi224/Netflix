// "use client";

// import LanguageSwitcher from '@/src/components/LanguageSwitcher';
// import Link from 'next/link';

// const AuthenticationPageFooter = () => {
//     return (
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
//             <Link href="#">Privacy</Link>
//           </p>
         
//         </div>

//         {/* 2 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Help Center</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Cookie Preferences</Link>
//           </p>
          
//         </div>

//         {/* 3 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Netflix Shop</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Corporate Information</Link>
//           </p>
          
//         </div>

//         {/* 4 */}
//         <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Terms of Use</Link>
//           </p>
//           <p className="underline underline-offset-4 hover:no-underline">
//             <Link href="#">Do Not Sell or Share My Personal Information</Link>
//           </p>
//         </div>
//       </div>
//       <div className="mt-2">
//         <p className="underline underline-offset-4 hover:no-underline md:pb-8 pb-6 md:text-reg-body text-reg-c1">
//             <Link href="#">Ad Choices</Link>
//           </p>
//         <LanguageSwitcher />
//       </div>
//     </section>
//   );

// }

// export default AuthenticationPageFooter



"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { Link } from "@/src/i18n/routing";

const AuthenticationPageFooter = () => {
  const t = useTranslations("Footer");

  return (
    <section className="bg-grey-850 text-grey-100 lg:px-40 md:px-20 px-8 md:py-18 py-8 gap-12">
      <p className="md:text-reg-body text-reg-c1 pb-5">
        {t("questionsCall")}{" "}
        <span className="underline underline-offset-4 hover:no-underline"> 1-844-505-2993</span>
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-9">
        {/* 1 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("fqa")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("privacy")}</Link>
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("helpCenter")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("cookiePreferences")}</Link>
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("netflixShop")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("corporateInformation")}</Link>
          </p>
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-3 md:text-reg-body text-reg-c1">
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("termsOfUse")}</Link>
          </p>
          <p className="underline underline-offset-4 hover:no-underline">
            <Link href="#">{t("doNotSell")}</Link>
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="underline underline-offset-4 hover:no-underline md:pb-8 pb-6 md:text-reg-body text-reg-c1">
          <Link href="#">{t("adChoices")}</Link>
        </p>
        <LanguageSwitcher />
      </div>
    </section>
  );
};

export default AuthenticationPageFooter;