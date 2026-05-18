import { useTranslations } from "next-intl";
import Image from "next/image";

const Secction2 = () => {
  const t = useTranslations("Features");
  return (
    <section className="w-full lg:px-40 md:px-20 px-8 py-16 bg-primary-black overflow-hidden border border-b-6 border-grey-800">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* image part */}
        <div className="lg:w-[55%] w-full">
          <Image
            src="/images/screenPart2.png"
            alt="section2 image"
            className="object-contain w-full"
            width={500}
            height={500}
          />
        </div>

        {/* ----------------- */}
        <div className="lg:w-[46%] w-full">
          <h1 className="text-primary-white md:text-[46px] text-med-xl font-bold">
            {t("s2Title")}
          </h1>
          <p className="text-primary-white font-normal md:text-reg-h2/7 text-reg-sb/6 pt-4">
            {t("s2Desc")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Secction2;
