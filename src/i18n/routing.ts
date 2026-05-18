import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  // لیست کامل زبان‌های اصلی و پراستفاده نتفلیکس
  locales: ['en', 'ar', 'fr', 'de', 'es', 'hi', 'ja', 'ko', 'tr'],
  defaultLocale: 'en' // زبان پیش‌فرض سایت
});
 
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);