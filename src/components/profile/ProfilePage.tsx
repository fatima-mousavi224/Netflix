/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useProfile } from "@/src/context/ProfileContext";
import { useLocale } from "next-intl";

export default function ProfilesPage() {
  const router = useRouter();
  const { savedProfiles, selectProfile, addAndSelectProfile } = useProfile();
  const { data: session, status } = useSession();
  const locale = useLocale(); 

  // به محض اینکه کاربر با اکانت جدید لاگین کرد، آن را به لیست LocalStorage اضافه می‌کنیم
  useEffect(() => {
    if (session?.user) {
      const googleProfile = {
        id: session.user.email || "main_user", // از ایمیل به عنوان کلید یکتا استفاده می‌کنیم
        name: session.user.name || "Netflix User",
        avatar: session.user.image || "",
      };
      addAndSelectProfile(googleProfile);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse">Loading profiles...</p>
      </div>
    );
  }

  // اگر هیچ کاربری لاگین نبود، لیست قبلی‌ها را نشان می‌دهیم ولی برای ورود جدید دکمه می‌گذاریم
  const handleProfileClick = (profile: { id: string; name: string; avatar: string }) => {
    // اگر کاربر روی اکانت جاری خودش کلیک کرد
    if (session?.user && profile.id === session.user.email) {
      selectProfile(profile);
      router.push("/");
    } else {
      // اگر روی اکانت دیگری کلیک کرد، ابتدا باید سشن قبلی خارج شود تا با اکانت جدید لاگین کند
      alert(`Account changed to ${profile.name}. Please log in again with this account.`);
      signOut({ callbackUrl: `/${locale}/signin` });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white select-none" suppressHydrationWarning>
      <div className="flex flex-col items-center justify-center">
        
        <h1 className="text-3xl md:text-5xl font-medium tracking-wide mb-14 text-center">
          Who's watching?
        </h1>

        {/* نمایش لیست تمام جیمیل‌هایی که تا به حال وارد شده‌اند */}
        <div className="flex flex-wrap items-center justify-center gap-8 max-w-250 px-4">
          {savedProfiles.map((profile) => {
            const isCurrentActive = session?.user?.email === profile.id;
            
            return (
              <div
                key={profile.id}
                onClick={() => handleProfileClick(profile)}
                className="group flex flex-col items-center justify-center cursor-pointer w-30 md:w-37.5 relative"
              >
                {/* باکس تصویر پروفایل جیمیل */}
                <div className="relative w-full aspect-square rounded-sm overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 ease-out shadow-lg bg-gray-900">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      sizes="(max-w-768px) 120px, 150px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-red-600">
                      {profile.name[0]}
                    </div>
                  )}
                  
                  {/* یک نشانه کوچک برای اکانتی که در حال حاضر لاگین است */}
                  {isCurrentActive && (
                    <div className="absolute top-1 right-1 bg-green-500 w-3 h-3 rounded-full border border-black animate-ping" />
                  )}
                </div>

                {/* نام کاربر */}
                <span className="mt-4 text-gray-400 text-base md:text-lg group-hover:text-white transition-colors duration-200 block text-center truncate w-full font-medium">
                  {profile.name}
                </span>
                <span className="text-[10px] text-gray-500 truncate w-full text-center">
                  {isCurrentActive ? "Active Now" : "Click to Switch"}
                </span>
              </div>
            );
          })}

          {/* دکمه افزودن اکانت جدید (ورود با یک جیمیل دیگر) */}
          <div 
            onClick={() => signOut({ callbackUrl: `/${locale}/signin` })}
            className="group flex flex-col items-center justify-center cursor-pointer w-30 md:w-37.5"
          >
            <div className="w-full aspect-square rounded-sm border-2 border-dashed border-gray-600 group-hover:border-white group-hover:bg-gray-800/30 flex items-center justify-center transition-all duration-200">
              <span className="text-gray-500 group-hover:text-white text-4xl font-light">+</span>
            </div>
            <span className="mt-4 text-gray-400 text-base md:text-lg group-hover:text-white transition-colors duration-200">
              Add Account
            </span>
            <span className="text-[10px] text-gray-600">Login with another Gmail</span>
          </div>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem("netflix_profiles_history");
            window.location.reload();
          }}
          className="mt-16 border border-gray-700 text-gray-600 hover:border-red-600 hover:text-red-600 px-4 py-1.5 text-xs tracking-wider transition-colors duration-200 bg-transparent rounded-sm cursor-pointer"
        >
          Clear History
        </button>

      </div>
    </div>
  );
}