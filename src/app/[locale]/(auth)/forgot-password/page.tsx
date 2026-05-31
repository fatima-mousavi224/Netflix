/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth");
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
  setMessage(t("loading") || "Processing..."); // Visual feedback
  
  try {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });

    const result = await res.json();

    if (res.ok) {
      setMessage(t("checkEmailSuccess"));
    } else {
      setMessage(result.error === "User not found" ? t("userNotFound") : "Server Error");
    }
  } catch (error) {
    setMessage("Connection failed. Please try again.");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-black/75 rounded-md w-96 border border-white/10">
        <h1 className="text-2xl font-bold mb-4">{t("forgotPasswordTitle") || "Forgot Password"}</h1>
        <p className="text-sm text-gray-400 mb-4">{t("forgotPasswordDesc") || "Enter your email to reset your password."}</p>
        
        <input
          {...register("email")}
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 rounded bg-[#333] border-none outline-none"
          required
        />
        
        <button type="submit" className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700">
          {t("sendEmail") || "Email Me"}
        </button>
        
        {message && <p className="mt-4 text-sm text-yellow-500 text-center">{message}</p>}
      </form>
    </div>
  );
}