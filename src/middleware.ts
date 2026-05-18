import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // اضافه کردن کدهای جدید زبان به مَچر نکست‌جی‌اس
  matcher: ['/', '/(en|ar|fr|de|es|hi|ja|ko|tr)/:path*']
};