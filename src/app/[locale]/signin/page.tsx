
import BackgroundSignIn from "@/src/components/auth/BackgroundSignIn";
import SignInCard from "@/src/components/auth/SignInCard";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const t = useTranslations("Auth"); // بعداً می‌توانید کلیدهای ترجمه را در فایلهای JSON اضافه کنید

  return (
      <main className="relative min-h-screen text-primary-white">
      {/* پس‌زمینه تاریک شده */}
      <BackgroundSignIn />
      
      {/* بقیه محتوای صفحه، هدر، متون و دکمه‌ها روی سایه قرار می‌گیرند */}
      <div className="relative z-10 lg:px-40 md:px-20 px-8">
        <SignInCard />
      </div>
    </main>
  );
}