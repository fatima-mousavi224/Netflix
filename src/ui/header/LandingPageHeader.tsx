import LanguageSwitcher from "@/src/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from '@/src/i18n/routing';
const LandingPageHeader = () => {
  const t = useTranslations("Navbar");
  return (
    <section className=" md:py-8 py-4">
      <div className="flex justify-between">
        <Image
          src="/netFlexLogo.png"
          alt="website logo"
          width={146}
          height={40}
          className="hidden md:block"
        />
        <Image
          src="/netFlexLogo.png"
          alt="website logo"
          width={80}
          height={30}
            className="block md:hidden"
        />
        <div className="flex items-center md:gap-6 gap-2">
         <LanguageSwitcher />   
         <Link href="/signin">
         <button className="text-primary-white bg-primary-red hover:bg-secondary-red-200 text-reg-sb py-1 md:px-4 px-3 rounded-sm">{t("signIn")}</button>
         </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHeader;
