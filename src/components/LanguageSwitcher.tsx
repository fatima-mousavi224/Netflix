'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/src/i18n/routing';
import { ChangeEvent } from 'react';
import { ChevronDown,  Languages} from 'lucide-react';


// لیست کامل زبان‌ها برای نمایش در منو
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'tr', name: 'Turkish' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="relative inline-block">
      
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-white pointer-events-none text-[12px]">
       <Languages size={18}/>
      </span>

      <select
        value={locale}
        onChange={handleLanguageChange}
        className="bg-primary-black text-primary-white border border-grey-400 text-reg-sb rounded pl-9 pr-8 py-1.5 appearance-none focus:outline-none hover:bg-grey-700 cursor-pointer min-w-28"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-primary-black text-primary-white text-reg-c1 w-12">
            {lang.name}
          </option>
        ))}
      </select>
      
      {/* فلش کوچک دراپ‌داون سمت راست */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-primary-white text-[10px]">
        <ChevronDown size={18}/>
      </div>
    </div>
  );
}