
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // This matcher is much better for next-intl + next-auth
  matcher: [
    // Match all pathnames except for
    // - API routes (/api)
    // - Static files (_next, images, favicon, etc.)
    '/((?!api|_next|.*\\..*).*)',
    // Match the root and localized paths
    '/', '/(en|ar|fr|de|es|hi|ja|ko|tr)/:path*'
  ]
};