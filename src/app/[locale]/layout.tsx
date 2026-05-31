
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/src/app/globals.css";
import { routing } from "@/src/i18n/routing";
import { Inter } from "next/font/google";
import AuthProvider from "@/src/providers/AuthProvider";
import { ProfileProvider } from "@/src/context/ProfileContext";
import { MyListProvider } from "@/src/context/MyListContext";
import { Metadata } from "next"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Netflix",
  description: "Netflix Clone - Watch TV Shows Online, Watch Movies Online",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${inter.variable} font-sans bg-black text-white antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <ProfileProvider>
            <NextIntlClientProvider messages={messages}>
              <MyListProvider>{children}</MyListProvider>
            </NextIntlClientProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}