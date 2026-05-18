/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "@/src/app/globals.css";
import { routing } from '@/src/i18n/routing';
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // یک متغیر سی‌اس‌اس برای تلویند می‌سازیم
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // بررسی معتبر بودن زبان
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // گرفتن متون ترجمه از پوشه messages
  const messages = await getMessages();

  // اگر عربی بود راست‌چین (rtl) در غیر این صورت چپ‌چین (ltr)
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className={`${inter.variable} font-sans bg-black text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}