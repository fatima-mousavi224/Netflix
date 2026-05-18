import LandingPageHeader from "@/src/ui/header/LandingPageHeader"
import HeroBackground from "./HeroBackground"
import { useTranslations } from "next-intl";
import EmailForm from "./EmailForm";

const HeroSection = () => {
    const t = useTranslations("Hero");
  return (
    <main className="relative min-h-screen text-primary-white">
      {/* پس‌زمینه تاریک شده */}
      <HeroBackground />
      
      {/* بقیه محتوای صفحه، هدر، متون و دکمه‌ها روی سایه قرار می‌گیرند */}
      <div className="relative z-10 lg:px-40 md:px-20 px-8">
        <LandingPageHeader />
        <div className="md:mt-40 mt-52">
            <h1 className="text-primary-white md:text-bold-t1 text-med-xl font-semibold text-center">{t("title")}</h1>
            <p className="text-primary-white md:text-med-t3 text-med-h1 font-normal text-center pt-3.5">{t("subtitle")}</p>
            <p className="text-primary-white md:text-med-h2 text-med-sb font-normal text-center pt-4">{t("description")}</p>
        
        {/* email part  */}
        <div className="md:pt-3.5 pt-4">
         <EmailForm />
        </div>
        </div>
      </div>
    </main>
  )
}

export default HeroSection
