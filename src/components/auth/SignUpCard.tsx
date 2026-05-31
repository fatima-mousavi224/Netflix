"use client"

import { useActionState } from "react";
import { useTranslations } from "next-intl"; 
import { Link } from "@/src/i18n/routing";
import { signup } from "@/src/app/actions/auth";

const SignUpCard = () => {
    const t = useTranslations("Signup"); // 2. Initialize translations
    const [state, formAction, isPending] = useActionState(signup, null);
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-zinc-800">
          <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
          
          <form action={formAction} className="flex flex-col gap-4">
            {state?.message && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
                {state.message}
              </div>
            )}
  
            <div className="flex flex-col gap-1">
              <input 
                name="name" 
                type="text" 
                placeholder={t("namePlaceholder")} 
                className="p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-red-600 outline-none transition"
              />
            </div>
  
            <div className="flex flex-col gap-1">
              <input 
                name="email" 
                type="email" 
                placeholder={t("emailPlaceholder")} 
                required
                className="p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-red-600 outline-none transition"
              />
            </div>
  
            <div className="flex flex-col gap-1">
              <input 
                name="password" 
                type="password" 
                placeholder={t("passwordPlaceholder")} 
                required
                className="p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-red-600 outline-none transition"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-red-600 py-3 rounded font-bold mt-4 hover:bg-red-700 active:scale-95 disabled:bg-zinc-600 disabled:cursor-not-allowed transition"
            >
              {isPending ? t("pending") : t("button")}
            </button>
          </form>
  
          <p className="text-zinc-400 mt-8 text-center text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/signin" className="text-white hover:underline">
              {t("signInLink")}
            </Link>
          </p>
        </div>

      </div>
    );
  
}

export default SignUpCard
