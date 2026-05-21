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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
        {/* Wrap application inside Auth and Language providers */}
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
