/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import HomePageHeader from "@/src/ui/header/HomePageHeader";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NewAndPopularPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = params?.locale || "en";
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrendingAndUpcoming = async () => {
      try {
        setLoading(true);
        
        const [moviesRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&include_adult=false&page=1`),
          fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
        ]);
        
        const moviesData = await moviesRes.json();
        const tvData = await tvRes.json();
        
        const combined = [
          ...(moviesData.results || []).map((m: any) => ({ ...m, type: "movie" })),
          ...(tvData.results || []).map((t: any) => ({ ...t, type: "tv" }))
        ];

        const explicitKeywords = ["sex", "nude", "erotic"];
        const safeItems = combined.filter((item: any) => {
          if (!item.backdrop_path && !item.poster_path) return false;
          const title = (item.title || item.name || "").toLowerCase();
          const overview = (item.overview || "").toLowerCase();
          return !explicitKeywords.some(word => title.includes(word) || overview.includes(word));
        });

        setItems(safeItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (API_KEY) fetchTrendingAndUpcoming();
  }, [API_KEY]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans select-none">
      <HomePageHeader />
      <main className="px-4 md:px-12 py-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">New & Popular</h1>
        {loading ? (
          <div className="h-60 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 pt-4">
            {items.map((item, index) => (
              <Link href={`/${locale}/watch/${item.id}?type=${item.type}`} key={`${item.id}-${index}`} className="group relative flex flex-col cursor-pointer transition duration-300 hover:scale-105">
                <div className="relative aspect-video w-full bg-zinc-800 rounded-sm overflow-hidden shadow-md">
                  <Image src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`} alt={item.title || item.name || "Media"} fill className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute top-2 left-2">
                    <Image src="/icons/Netflix_logoMovie.svg" alt="Netflix" width={14} height={14} />
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">
                  {item.title || item.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}