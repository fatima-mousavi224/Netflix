"use client";

import React, { useState } from "react";
import {  ChevronDown,Menu, LogOut, Users } from "lucide-react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/src/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useProfile } from "@/src/context/ProfileContext";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/src/ui/sheet";
import { NavSearch } from "./NavSearch";
import { NavNotifications } from "./NavNotifications";

const HomePageHeader = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const { activeProfile } = useProfile();

  const [showDropdown, setShowDropdown] = useState(false);

  const LinkItems = [
    { name: t("home"), href: "/" },
    { name: t("tvShows"), href: "/tv-shows" },
    { name: t("movies"), href: "/movies" },
    { name: t("newPopular"), href: "/new-popular" },
    { name: t("myList"), href: "/my-list" },
    { name: t("browseLanguages"), href: "/browse" },
  ];

  return (
    <section className="bg-black/50 lg:px-22.5 md:px-16 px-6 md:py-6 py-4 relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Image
            src="/netFlexLogo.png"
            alt="website logo"
            width={93}
            height={25}
            className="object-contain"
          />

          <div className="hidden md:flex gap-5 text-primary-white text-reg-sb">
            {LinkItems.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`transition-colors duration-200 hover:text-primary-white cursor-pointer ${
                      isActive
                        ? "text-primary-white font-semibold"
                        : "text-grey-10"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-5 text-primary-white">
          <NavSearch />
          <NavNotifications />
          <div
            className="relative flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="relative w-6.25 h-6.25 rounded overflow-hidden bg-red-600 flex items-center justify-center text-[10px] font-bold">
              {activeProfile?.avatar ? (
                <Image
                  src={activeProfile.avatar}
                  alt={activeProfile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>{activeProfile?.name?.[0] || "U"}</span>
              )}
            </div>

            <ChevronDown
              size={15}
              className={`text-grey-10 group-hover:text-primary-white transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />

            {showDropdown && (
              <div className="z-50 absolute top-full right-0 mt-2 w-44 bg-black/95 border border-grey-800 rounded shadow-xl flex flex-col py-2 text-sm animate-fade-in">
                <button
                  onClick={() => router.push("/profiles")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-grey-800/50 text-grey-10 hover:text-primary-white transition-colors w-full text-left"
                >
                  <Users size={16} />
                  <span>Switch Profile</span>
                </button>

                <div className="border-t border-grey-800 my-1"></div>

                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}/signin` })}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-600/20 text-primary-red transition-colors w-full text-left font-medium"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden block">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center p-1 text-primary-white focus:outline-none">
                  <Menu size={24} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-grey-850 border-grey-800 text-primary-white w-62.5 p-6"
              >
                <SheetTitle className="sr-only">
                  Mobile Navigation Menu
                </SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  <Image
                    src="/netFlexLogo.png"
                    alt="website logo"
                    width={93}
                    height={25}
                    className="mb-4 object-contain"
                  />
                  <nav className="flex flex-col gap-4 text-reg-md text-grey-10">
                    {LinkItems.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link key={link.name} href={link.href}>
                          <span
                            className={`block py-2 transition-colors duration-200 hover:text-primary-white ${
                              isActive
                                ? "text-primary-white font-bold border-l-2 border-primary-red pl-2"
                                : ""
                            }`}
                          >
                            {link.name}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageHeader;

