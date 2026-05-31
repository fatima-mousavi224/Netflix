import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'ar', 'fr', 'de', 'es', 'hi', 'ja', 'ko', 'tr'],
  defaultLocale: 'en' });
 
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);