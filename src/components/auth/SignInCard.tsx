/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { XCircle } from "lucide-react"; // آیکون ارور مطابق کامپوننت شما
import { createSignInSchema, SignInFormValues } from "../signIn.schema";
import AuthenticationPageFooter from "@/src/ui/footers/AuthenticationPageFooter";

const SignInCard = () => {
  const t = useTranslations("Auth");
  const [isLoading, setIsLoading] = useState(false);

  const signInSchema = createSignInSchema(t);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema) as any,
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  });

  // تماشا کردن مقدار فیلدها برای مدیریت انیمیشن بالا ماندن لیبل هنگام وجود متن
  const watchEmail = watch("emailOrPhone");
  const watchPassword = watch("password");

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    setIsLoading(true);
    try {
      console.log("ورود با موفقیت انجام شد. داده‌ها:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // تابع فرضی برای هندل کردن لاگین با گوگل
const handleGoogleLogin = async () => {
  try {
    // استفاده مستقیم از تابع اصلی signIn
    await signIn("google", { callbackUrl: "/" });
  } catch (error) {
    console.error("خطا در ارتباط با سرور گوگل:", error);
  }
};  return (
   <div className="w-full"> 
   <div className="w-full max-w-115 bg-black/60 backdrop-blur-[2px] px-8 py-8 my-16 md:px-16 md:py-8 text-white rounded-sm border border-white/10 mx-auto">
  <h1 className="text-med-t1 font-bold mb-7">
    {t("signIn")}
  </h1>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-3"
  >
    {/* EMAIL */}
    <div className="flex flex-col gap-1">
      <div className="relative h-12">
        <input
          {...register("emailOrPhone")}
          id="emailOrPhone"
          type="text"
          placeholder=" "
          className={`peer w-full h-full rounded-sm
          bg-[#111111]/90
          border
          px-4 pt-5 pb-2
          text-sm text-white
          outline-none
          transition-all duration-200
          ${
            errors.emailOrPhone
              ? "border-secondary-red-200"
              : "border-grey-200"
          }
          focus:border-white`}
        />

        <label
          htmlFor="emailOrPhone"
          className={`
          absolute left-4
          transition-all duration-200
          pointer-events-none
          ${
            watchEmail
              ? "top-2 text-[9px] text-neutral-400"
              : "top-1/2 -translate-y-1/2 text-[15px] text-neutral-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px]"
          }
        `}
        >
          {t("emailOrPhone")}
        </label>
      </div>

      {errors.emailOrPhone && (
        <div className="flex items-center gap-1 text-[#e50914] text-[13px]">
          <XCircle size={14} />
          <span>{errors.emailOrPhone.message}</span>
        </div>
      )}
    </div>

    {/* PASSWORD */}
    <div className="flex flex-col gap-1">
      <div className="relative h-12">
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder=" "
          className={`peer w-full h-full rounded-sm
          bg-[#111111]/90
          border
          px-4 pt-5 pb-2
          text-sm text-white
          outline-none
          transition-all duration-200
          ${
            errors.password
              ? "border-secondary-red-200"
              : "border-grey-200"
          }
          focus:border-white`}
        />

        <label
          htmlFor="password"
          className={`
          absolute left-4
          transition-all duration-200
          pointer-events-none
          ${
            watchPassword
              ? "top-2 text-[9px] text-neutral-400"
              : "top-1/2 -translate-y-1/2 text-med-sb text-grey-50 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px]"
          }
        `}
        >
          {t("password")}
        </label>
      </div>

      {errors.password && (
        <div className="flex items-center gap-1 text-secondary-red-200 text-[13px]">
          <XCircle size={14} />
          <span>{errors.password.message}</span>
        </div>
      )}
    </div>

    {/* SIGN IN */}
    <button
      type="submit"
      disabled={isLoading}
      className="
      mt-2
      h-10
      rounded-sm
      bg-primary-red
      hover:bg-secondary-red-200
      transition-colors
      font-semibold
      text-sm
      cursor-pointer
      disabled:opacity-60
    "
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
      ) : (
        t("signIn")
      )}
    </button>

    {/* OR */}
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-white/15"></div>
      <span className="text-[13px] text-neutral-400 uppercase">
        OR
      </span>
      <div className="h-px flex-1 bg-white/15"></div>
    </div>

    {/* GOOGLE */}
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="
      h-10
      rounded-sm
      bg-[#333333]/70
      hover:bg-[#444]
      transition-colors
      text-sm
      font-medium
      flex items-center justify-center gap-3
      cursor-pointer
    "
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>

     {t("googleLogin")}
    </button>

    {/* FORGOT */}
    <button
      type="button"
      className="
      text-[14px]
      text-neutral-300
      hover:underline
      mt-1
    "
    >
      {t("forgot")}
    </button>

    {/* REMEMBER */}
    <div className="flex items-center gap-2 mt-1">
      <input
        {...register("rememberMe")}
        type="checkbox"
        id="remember"
        className="
        w-4 h-4
        rounded
        border-white/30
        bg-transparent
      "
      />

      <label
        htmlFor="remember"
        className="text-[13px] text-neutral-400"
      >
        {t("rememberMe")}
      </label>
    </div>

    {/* FOOTER */}
    <div className="mt-3 space-y-2">
      <p className="text-[15px] text-neutral-400">
        {t("newToNetflix")}{" "}
        <span className="text-white hover:underline cursor-pointer">
          {t("signUpNow")}
        </span>
      </p>

      <p className="text-[12px] leading-4 text-neutral-500">
        {t("captchaText")}{" "}
        <span className="text-[#448ef4] hover:underline cursor-pointer">
          {t("learnMore")}
        </span>
      </p>
    </div>
  </form>
</div>
<AuthenticationPageFooter />
</div>
  );
};

export default SignInCard;