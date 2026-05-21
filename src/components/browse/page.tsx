"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import HomePageHeader from "@/src/ui/header/HomePageHeader";
import Image from "next/image";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "tr", name: "Türkçe" },
];

const BrowseMoviesPage = () => {
  const t = useTranslations("Browse");
  const params = useParams();
  const locale = params?.locale || "en";
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState(locale as string);
  const [selectedSort, setSelectedSort] = useState("popularity.desc");

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const SORT_OPTIONS = [
    { value: "popularity.desc", label: t("suggestions") },
    { value: "vote_average.desc", label: t("topRated") },
    { value: "primary_release_date.desc", label: t("recentlyAdded") },
  ];

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${selectedLanguage}&sort_by=${selectedSort}&page=1`,
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error filtering movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (API_KEY) fetchFilteredMovies();
  }, [API_KEY, selectedLanguage, selectedSort]);

  const getMovieTag = (movie: Movie, index: number) => {
    if (selectedSort === "primary_release_date.desc" || index % 4 === 0)
      return "Recently Added";
    if (movie.vote_average > 7.5) return "Top 10";
    if (index === 2) return "Leaving Soon";
    return null;
  };

  return (
    <div className="min-h-screen bg-grey-900 text-white font-sans select-none">
      <HomePageHeader />
      <main className="px-4 md:px-12 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 md:pb-6 relative z-50">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            {t("title")}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
            <div>
              <span className="text-zinc-400">{t("selectPreferences")}</span>
              <div className="relative">
                <div
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setIsSortOpen(false);
                  }}
                  className="bg-black border border-zinc-700 px-4 py-1.5 rounded flex items-center gap-4 cursor-pointer hover:border-zinc-500 transition text-zinc-200"
                >
                  <span>
                    {LANGUAGES.find((l) => l.code === selectedLanguage)?.name ||
                      t("originalLanguage")}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-zinc-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isLangOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-zinc-950 border border-zinc-800 rounded shadow-2xl overflow-hidden py-1 max-h-60 overflow-y-auto no-scrollbar">
                    {LANGUAGES.map((lang) => (
                      <div
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className="no-scrollbar px-4 py-2 hover:bg-zinc-900 cursor-pointer flex items-center justify-between text-zinc-300 hover:text-white"
                      >
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.code && (
                          <Check size={14} className="text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ml-auto md:ml-4 flex items-center gap-2 relative">
              <div></div>
              <div>
                <span className="text-zinc-400">{t("sortBy")}</span>
                <div
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsLangOpen(false);
                  }}
                  className="bg-black border border-zinc-700 px-4 py-1.5 rounded flex items-center gap-4 cursor-pointer hover:border-zinc-500 transition text-zinc-200"
                >
                  <span>
                    {SORT_OPTIONS.find((o) => o.value === selectedSort)?.label}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-zinc-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-zinc-950 border border-zinc-800 rounded shadow-2xl overflow-hidden py-1">
                  {SORT_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSelectedSort(option.value);
                        setIsSortOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-zinc-900 cursor-pointer flex items-center justify-between text-zinc-300 hover:text-white"
                    >
                      <span>{option.label}</span>
                      {selectedSort === option.value && (
                        <Check size={14} className="text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-60 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 pt-4 relative z-10">
            {movies.map((movie, index) => {
              const title = movie.title || movie.name || "Untitled Movie";
              const isTv = !movie.title;
              const tag = getMovieTag(movie, index);
              const imagePath = movie.backdrop_path || movie.poster_path;

              return (
                <Link
                  href={`/${locale}/watch/${movie.id}?type=${isTv ? "tv" : "movie"}`}
                  key={movie.id}
                  className="group relative flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 z-10 hover:z-20"
                >
                  <div className="relative aspect-video w-full bg-zinc-900 rounded-sm overflow-hidden shadow-md group-hover:shadow-2xl">
                    {imagePath ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={900}
                        height={300}
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                        {t("noImage")}
                      </div>
                    )}

                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-xs tracking-tighter">
                      <Image
                        src="/icons/Netflix_logoMovie.svg"
                        alt="Rating"
                        width={13}
                        height={13}
                        className="inline-block mr-1"
                      />
                    </div>

                    {tag && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                        <span className="text-[11px] rounded-xs font-medium uppercase px-3 py-1 tracking-wider text-center text-white shadow-md bg-red-600">
                          {tag === "Recently Added" ? t("recentlyAdded") : tag}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">
                    {title}
                  </h3>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseMoviesPage;
