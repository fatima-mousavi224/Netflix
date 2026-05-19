// // import { Bell, ChevronDown, Search } from "lucide-react";
// // import Image from "next/image";
// // import Link from "next/link";
// // const HomePageHeader = () => {
// //   const LinkItems = [
// //     { name: "Home", href: "#" },
// //     { name: "TV Shows", href: "#" },
// //     { name: "Movies", href: "#" },
// //     { name: "New & Popular", href: "#" },
// //     { name: "My List", href: "#" },
// //     { name: "Browse by Languages", href: "#" },
// //   ];
// //   return (
// //     <section className="bg-grey-850 lg:px-22.5 md:px-16 px-6 md:py-8 py-4">
// //       <div className="flex justify-between items-center">
// //         <div className="flex gap-8 items-center">
// //           <Image
// //             src="/netFlexLogo.png"
// //             alt="website logo"
// //             width={93}
// //             height={25}
// //           />
// //           <div className="flex gap-5 text-grey-10 text-reg-sb">
// //             {LinkItems.map((link) => (
// //               <Link key={link.name} href={link.href}>
// //                 <span>{link.name}</span>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //         {/* right side content */}
// //         <div className="flex items-center gap-5">
// //           <Search size={18} />
// //           <Bell size={18} />
// //           <div className="flex items-center gap-2">
// //             <Image
// //               src="/images/profileImage.png"
// //               alt="Profile Image"
// //               width={25}
// //               height={25}
// //             />
// //             <ChevronDown size={15}/>
// //           </div>

// //           {/* ------ */}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default HomePageHeader;


// "use client";

// import { Bell, ChevronDown, Search, Menu } from "lucide-react";
// import Image from "next/image";
// import { Link, usePathname } from "@/src/i18n/routing";
// import { useTranslations } from "next-intl";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetTitle,
// } from "@/src/ui/sheet"; 

// const HomePageHeader = () => {
//   const t = useTranslations("Navbar");
//   const pathname = usePathname();

//   const LinkItems = [
//     { name: t("home"), href: "/" },
//     { name: t("tvShows"), href: "/tv-shows" },
//     { name: t("movies"), href: "/movies" },
//     { name: t("newPopular"), href: "/new-popular" },
//     { name: t("myList"), href: "/my-list" },
//     { name: t("browseLanguages"), href: "/browse-languages" },
//   ];

//   return (
//     <section className="bg-grey-850 lg:px-22.5 md:px-16 px-6 md:py-8 py-4">
//       <div className="flex justify-between items-center">
        
//         <div className="flex gap-8 items-center">
//           <Image
//             src="/netFlexLogo.png"
//             alt="website logo"
//             width={93}
//             height={25}
//             className="object-contain"
//           />
          
//           <div className="hidden md:flex gap-5 text-grey-10 text-reg-sb">
//             {LinkItems.map((link) => {
//               const isActive = pathname === link.href;
//               return (
//                 <Link key={link.name} href={link.href}>
//                   <span
//                     className={`transition-colors duration-200 hover:text-primary-white cursor-pointer ${
//                       isActive ? "text-primary-white font-semibold" : "text-grey-10"
//                     }`}
//                   >
//                     {link.name}
//                   </span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>

//         <div className="flex items-center gap-5 text-primary-white">
//           <Search size={18} className="cursor-pointer hover:text-grey-10" />
//           <Bell size={18} className="cursor-pointer hover:text-grey-10" />
          
//           <div className="flex items-center gap-2 cursor-pointer group">
//             <Image
//               src="/images/profileImage.png"
//               alt="Profile Image"
//               width={25}
//               height={25}
//               className="rounded"
//             />
//             <ChevronDown size={15} className="text-grey-10 group-hover:text-primary-white transition-colors" />
//           </div>

//           <div className="md:hidden block">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <button className="flex items-center justify-center p-1 text-primary-white focus:outline-none">
//                   <Menu size={24} />
//                 </button>
//               </SheetTrigger>
              
//               <SheetContent side="right" className="bg-grey-850 border-grey-800 text-primary-white w-[250px] p-6">
//                 <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
//                 <div className="flex flex-col gap-6 mt-8">
//                   <Image
//                     src="/netFlexLogo.png"
//                     alt="website logo"
//                     width={93}
//                     height={25}
//                     className="mb-4 object-contain"
//                   />
//                   <nav className="flex flex-col gap-4 text-reg-md text-grey-10">
//                     {LinkItems.map((link) => {
//                       const isActive = pathname === link.href;
//                       return (
//                         <Link key={link.name} href={link.href}>
//                           <span
//                             className={`block py-2 transition-colors duration-200 hover:text-primary-white ${
//                               isActive ? "text-primary-white font-bold border-l-2 border-primary-red pl-2" : ""
//                             }`}
//                           >
//                             {link.name}
//                           </span>
//                         </Link>
//                       );
//                     })}
//                   </nav>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomePageHeader;

"use client";

import React, { useState } from "react";
import { Bell, ChevronDown, Search, Menu, LogOut, Users } from "lucide-react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/src/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useProfile } from "@/src/context/ProfileContext"; // ۱. ایمپورت کانتکست پروفایل
import { signOut } from "next-auth/react"; // ۲. ایمپورت متد خروج نتفلیکس
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/src/ui/sheet"; 

const HomePageHeader = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  
  // ۳. دریافت دیتای پروفایل فعلی
  const { activeProfile } = useProfile();
  
  // مدیریت وضعیت باز و بسته بودن منوی پروفایل
  const [showDropdown, setShowDropdown] = useState(false);

  const LinkItems = [
    { name: t("home"), href: "/" },
    { name: t("tvShows"), href: "/tv-shows" },
    { name: t("movies"), href: "/movies" },
    { name: t("newPopular"), href: "/new-popular" },
    { name: t("myList"), href: "/my-list" },
    { name: t("browseLanguages"), href: "/browse-languages" },
  ];

  return (
    <section className="bg-grey-850 lg:px-22.5 md:px-16 px-6 md:py-8 py-4 relative z-50">
      <div className="flex justify-between items-center">
        
        <div className="flex gap-8 items-center">
          <Image
            src="/netFlexLogo.png"
            alt="website logo"
            width={93}
            height={25}
            className="object-contain"
          />
          
          <div className="hidden md:flex gap-5 text-grey-10 text-reg-sb">
            {LinkItems.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`transition-colors duration-200 hover:text-primary-white cursor-pointer ${
                      isActive ? "text-primary-white font-semibold" : "text-grey-10"
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
          <Search size={18} className="cursor-pointer hover:text-grey-10" />
          <Bell size={18} className="cursor-pointer hover:text-grey-10" />
          
          {/* ---- بخش مدیریت پروفایل فعال واقعی ---- */}
          <div 
            className="relative flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="relative w-[25px] h-[25px] rounded overflow-hidden bg-red-600 flex items-center justify-center text-[10px] font-bold">
              {activeProfile?.avatar ? (
                // نمایش تصویر واقعی گوگلِ پروفایل فعال
                <Image
                  src={activeProfile.avatar}
                  alt={activeProfile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                // در صورت عدم وجود تصویر، حرف اول نام کاربری
                <span>{activeProfile?.name?.[0] || "U"}</span>
              )}
            </div>
            
            <ChevronDown 
              size={15} 
              className={`text-grey-10 group-hover:text-primary-white transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`} 
            />

            {/* منوی بازشوی کشویی پروفایل (Style کاملا مشابه نتفلیکس) */}
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-black/95 border border-grey-800 rounded shadow-xl flex flex-col py-2 text-sm animate-fade-in">
                
                {/* دکمه بازگشت به صفحه تعویض پروفایل */}
                <button
                  onClick={() => router.push("/profiles")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-grey-800/50 text-grey-10 hover:text-primary-white transition-colors w-full text-left"
                >
                  <Users size={16} />
                  <span>Switch Profile</span>
                </button>

                <div className="border-t border-grey-800 my-1"></div>

                {/* دکمه خروج کامل از حساب گوگل */}
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

          {/* منوی موبایل */}
          <div className="md:hidden block">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center p-1 text-primary-white focus:outline-none">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              
              <SheetContent side="right" className="bg-grey-850 border-grey-800 text-primary-white w-[250px] p-6">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
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
                              isActive ? "text-primary-white font-bold border-l-2 border-primary-red pl-2" : ""
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