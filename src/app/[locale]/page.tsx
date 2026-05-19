
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProfile } from "@/src/context/ProfileContext";
import { useLocale } from "next-intl";
import LandingPage from "@/src/components/home/Page";
import HomePageAcount from "@/src/components/acountPage/HomePageAcount";


export default function IndexPage() {
  const router = useRouter();
  const locale = useLocale();
  const { data: session, status } = useSession();
  const { activeProfile } = useProfile();

  useEffect(() => {
    if (status === "authenticated" && !activeProfile) {
      router.push(`/${locale}/profiles`);
    }
  }, [status, activeProfile, router, locale]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse">Loading netflex...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <LandingPage />;
  }

  if (status === "authenticated" && activeProfile) {
    return (
       <div>
         <HomePageAcount />
       </div>
    );
  }

  return null;
}