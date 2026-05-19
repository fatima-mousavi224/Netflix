"use client";

import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

interface Profile {
  id: string;
  name: string;
  avatar: string;
}

interface ProfileContextType {
  activeProfile: Profile | null;
  savedProfiles: Profile[];
  selectProfile: (profile: Profile) => void;
  addAndSelectProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // ۱. خواندن دیتای اولیه کوکی در زمان تولد کامپوننت
  const [activeProfile, setActiveProfile] = useState<Profile | null>(() => {
    if (typeof window !== "undefined") {
      const savedActive = Cookies.get("active_profile");
      if (savedActive) {
        try {
          return JSON.parse(savedActive);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return null;
  });

  // ۲. خواندن دیتای اولیه لوکال‌استوریج در زمان تولد کامپوننت
  const [savedProfiles, setSavedProfiles] = useState<Profile[]>(() => {
    if (typeof window !== "undefined") {
      const localProfiles = localStorage.getItem("netflix_profiles_history");
      if (localProfiles) {
        try {
          return JSON.parse(localProfiles);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  // انتخاب یک پروفایل موجود
  const selectProfile = (profile: Profile) => {
    setActiveProfile(profile);
    Cookies.set("active_profile", JSON.stringify(profile), { expires: 30 });
  };

  // اضافه کردن پروفایل جدید به لیست و انتخاب آن
  const addAndSelectProfile = (newProfile: Profile) => {
    setSavedProfiles((prev) => {
      const exists = prev.some((p) => p.id === newProfile.id);
      if (exists) {
        const updated = prev.map((p) => p.id === newProfile.id ? newProfile : p);
        localStorage.setItem("netflix_profiles_history", JSON.stringify(updated));
        return updated;
      }
      const updatedList = [...prev, newProfile];
      localStorage.setItem("netflix_profiles_history", JSON.stringify(updatedList));
      return updatedList;
    });

    selectProfile(newProfile);
  };

  const clearProfile = () => {
    setActiveProfile(null);
    Cookies.remove("active_profile");
  };

  return (
    <ProfileContext.Provider 
      value={{ activeProfile, savedProfiles, selectProfile, addAndSelectProfile, clearProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}