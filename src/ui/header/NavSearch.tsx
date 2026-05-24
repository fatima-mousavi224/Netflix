/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";

export const NavSearch = () => {
  const t = useTranslations("Search");
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim().length >= 3) {
        setLoading(true);
        setShowModal(true);
        try {
          const res = await fetch(`/api/movies/search?q=${query}`);
          const data = await res.json();
          setResults(data);
        } catch (err) {
          console.error("Fetch error:", err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowModal(false);
      }
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative" ref={searchRef} >
      <div className={`flex items-center bg-black/90 border transition-all duration-300 ${isOpen ? "w-48 md:w-64 px-3 py-2 border-zinc-500" : "w-0 border-transparent"}`}>
        <Search size={20} className={isOpen ? "text-zinc-400" : "hidden"} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          className={`bg-transparent outline-none text-sm ml-2 w-full text-white ${!isOpen && "hidden"}`}
          autoFocus={isOpen}
        />
        {isOpen && (
          <X 
            size={18} 
            className="cursor-pointer text-zinc-400 hover:text-white" 
            onClick={() => { setIsOpen(false); setQuery(""); setShowModal(false); }} 
          />
        )}
      </div>

      {!isOpen && (
        <Search 
          size={22} 
          className="cursor-pointer hover:text-zinc-400 transition-colors" 
          onClick={() => setIsOpen(true)} 
        />
      )}

      {showModal && (
        <div className="absolute top-full md:right-0 left-0 mt-4 w-[320px] md:w-100 bg-zinc-900/95 border border-zinc-800 rounded-lg shadow-2xl z-999 backdrop-blur-md overflow-hidden text-start">
          <div className="no-scrollbar max-h-[60vh] overflow-y-auto p-2">
            {loading ? (
              <div className="py-10 flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-red-600" size={30} />
                <span className="text-xs text-zinc-500">{t("searching")}</span>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 font-bold uppercase p-2 tracking-tighter">
                   {t("resultsFound")}
                </p>
                {results.map((movie) => (
                  <div 
                    key={movie.id} 
                    onClick={() => {
                      router.push(`/watch/${movie.id}?type=${movie.type}`);
                      setShowModal(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 cursor-pointer rounded-md group transition-colors"
                  >
                    <div className="relative w-16 h-10 shrink-0 bg-zinc-800 rounded">
                      {movie.thumbnailUrl ? (
                        <Image 
                          src={`https://image.tmdb.org/t/p/w300${movie.thumbnailUrl}`} 
                          alt={movie.title} 
                          fill 
                          className="object-cover rounded" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-600">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-red-500">{movie.title}</p>
                      <p className="text-[10px] text-zinc-500">{movie.year} • {movie.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm text-zinc-400">"{query}" {t("noResults")}</p>
                <p className="text-[10px] text-zinc-600 mt-1">{t("tryAnother")}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};