/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "@/src/i18n/routing";

export default function ResetPasswordPage() {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = searchParams.get("token");

  const onSubmit = async (data: any) => {
    if (!token) {
      setMessage(t("invalidToken"));
      return;
    }

    setIsLoading(true);
    setMessage(t("loading"));

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          password: data.password 
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(t("resetSuccess"));
        // Redirect to sign in after 3 seconds so they can read the success message
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      } else {
        setMessage(result.error === "Invalid or expired token" ? t("invalidToken") : "Error");
      }
    } catch (error) {
      setMessage("Server connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black bg-[url('/images/hero-bg.jpg')] bg-cover bg-no-repeat bg-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md rounded-md bg-black/80 px-8 py-16 shadow-xl border border-white/10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white mb-4">
            {t("resetPasswordTitle")}
          </h1>

          <div className="flex flex-col gap-1">
            <input
              {...register("password", { 
                required: true, 
                minLength: 4, 
                maxLength: 60 
              })}
              type="password"
              placeholder={t("newPasswordPlaceholder")}
              disabled={isLoading}
              className={`w-full rounded bg-[#333] p-4 text-white outline-none placeholder:text-gray-500 focus:bg-[#454545] ${
                errors.password ? "border-b-2 border-orange-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-xs text-orange-500 mt-1">
                {t("passwordError")}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("loading") : t("updatePasswordBtn")}
          </button>

          {message && (
            <div className={`mt-4 rounded p-3 text-center text-sm ${
              message === t("resetSuccess") 
                ? "bg-green-500/20 text-green-400" 
                : "bg-orange-500/20 text-orange-400"
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}