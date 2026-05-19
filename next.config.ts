import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // تصاویر گوگل
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // تصاویر ماک فعلی
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // تصاویر واقعی فیلم‌های TMDB برای مرحله بعد
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);