/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import HomePageHeader from "@/src/ui/header/HomePageHeader";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = params?.locale || "en";
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchManyMovies = async () => {
      try {
        setLoading(true);
        
        const pages = [1, 2, 3, 4, 5, 6];
        const requests = pages.map(page =>
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&sort_by=popularity.desc&page=${page}`).then(res => res.json())
        );
        
        const resultsArray = await Promise.all(requests);
        const allMovies = resultsArray.flatMap(data => data.results || []);
        
        const bannedMovieIds = [146198, 146199, 290747, 106093, 11756];
        const explicitKeywords = ["sex", "nude", "erotic", "nymphomaniac"];

        const safeMovies = allMovies.filter((movie: any) => {
          if (movie.adult === true || bannedMovieIds.includes(movie.id)) return false;
          if (!movie.backdrop_path && !movie.poster_path) return false;
          
          const title = (movie.title || "").toLowerCase();
          const overview = (movie.overview || "").toLowerCase();
          return !explicitKeywords.some(word => title.includes(word) || overview.includes(word));
        });

        setMovies(safeMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (API_KEY) fetchManyMovies();
  }, [API_KEY]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans select-none">
      <HomePageHeader />
      <main className="px-4 md:px-12 py-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">Movies</h1>
        {loading ? (
          <div className="h-60 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 pt-4">
            {movies.map((movie, index) => (
              <Link href={`/${locale}/watch/${movie.id}?type=movie`} key={`${movie.id}-${index}`} className="group relative flex flex-col cursor-pointer transition duration-300 hover:scale-105">
                <div className="relative aspect-video w-full bg-zinc-800 rounded-sm overflow-hidden shadow-md">
                  <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} alt={movie.title || "Movie"} fill className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute top-2 left-2">
                    <Image src="/icons/Netflix_logoMovie.svg" alt="Netflix" width={14} height={14} />
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">{movie.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}