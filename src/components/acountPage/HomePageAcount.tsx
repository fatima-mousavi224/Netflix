/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import MovieBillboard from "./MovieBillboard";
import MovieRow from "./MovieRow";
import { useTranslations } from "next-intl"; 
import HomePageFooter from "@/src/ui/footers/HomePageFooter";

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  badge?: "Recently Added" | "New Season" | "Leaving Soon" | "Top 10";
}

const HomePageAcount = () => {
  const rowT = useTranslations("MovieRows"); 
  
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRatedVertical, setTopRatedVertical] = useState<Movie[]>([]);
  const [animations, setAnimations] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [sciFiMovies, setSciFiMovies] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const [billboardMovie, setBillboardMovie] = useState({
    title: "House of Ninjas",
    description: "Years after retiring from their formidable ninja lives, a dysfunctional family must return to shadowy missions to counteract a string of looming threats.",
    backdropUrl: "/images/AcountpageBackgroun.png",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const BASE_URL = "https://api.themoviedb.org/3";

        const [
          trendingP1, trendingP2, popularP1, popularP2, topRatedP1,
          animationP1, animationP2, actionP1, actionP2, comedyP1, comedyP2,
          horrorP1, horrorP2, sciFiP1, sciFiP2, upcomingP1, upcomingP2
        ] = await Promise.all([
          fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878&page=2&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=1&language=en-US`).then(r => r.json()),
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=2&language=en-US`).then(r => r.json()),
        ]);

        const formatMovies = (results: any[], isVertical = false, badgeType?: "Recently Added" | "New Season" | "Leaving Soon") => {
          if (!results) return [];
          return results.map((m: any, index: number) => ({
            id: String(m.id),
            title: m.title || m.name,
            thumbnailUrl: isVertical ? (m.poster_path || m.backdrop_path) : (m.backdrop_path || m.poster_path),
            badge: index % 5 === 0 ? badgeType : undefined
          }));
        };

        const allTrending = [...(trendingP1.results || []), ...(trendingP2.results || [])];
        const allPopular = [...(popularP1.results || []), ...(popularP2.results || [])];
        const allAnimations = [...(animationP1.results || []), ...(animationP2.results || [])];
        const allActions = [...(actionP1.results || []), ...(actionP2.results || [])];
        const allComedies = [...(comedyP1.results || []), ...(comedyP2.results || [])];
        const allHorrors = [...(horrorP1.results || []), ...(horrorP2.results || [])];
        const allSciFi = [...(sciFiP1.results || []), ...(sciFiP2.results || [])];
        const allUpcoming = [...(upcomingP1.results || []), ...(upcomingP2.results || [])];

        if (trendingP1?.results?.length > 0) {
          setTrending(formatMovies(allTrending, false, "Recently Added"));
          const firstMovie = trendingP1.results[0];
          setBillboardMovie({
            title: firstMovie.title || firstMovie.name,
            description: firstMovie.overview,
            backdropUrl: firstMovie.backdrop_path || "/images/AcountpageBackgroun.png",
          });
        }

        if (allPopular.length > 0) setPopular(formatMovies(allPopular, false, "New Season"));
        if (topRatedP1?.results) setTopRatedVertical(formatMovies(topRatedP1.results, true));
        if (allAnimations.length > 0) setAnimations(formatMovies(allAnimations));
        if (allActions.length > 0) setActionMovies(formatMovies(allActions, false, "Leaving Soon"));
        if (allComedies.length > 0) setComedyMovies(formatMovies(allComedies, false, "Recently Added"));
        if (allHorrors.length > 0) setHorrorMovies(formatMovies(allHorrors));
        if (allSciFi.length > 0) setSciFiMovies(formatMovies(allSciFi, false, "New Season"));
        if (allUpcoming.length > 0) setUpcoming(formatMovies(allUpcoming));

      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse tracking-widest text-red-600 font-bold">LOADING...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <MovieBillboard
        title={billboardMovie.title}
        description={billboardMovie.description}
        backdropUrl={billboardMovie.backdropUrl}
      />

      <div className="-mt-12 md:-mt-28 relative z-30 pb-20 space-y-6 md:space-y-10 bg-linear-to-b from-transparent via-black to-black">
        
        {trending.length > 0 && (
          <MovieRow title={rowT("matched")} movies={trending.slice(0, 20)} />
        )}

        {popular.length > 0 && (
          <MovieRow title={rowT("nowOnNetflix")} movies={popular.slice(0, 20)} />
        )}

        {topRatedVertical.length > 0 && (
          <MovieRow
            title={rowT("top10")}
            movies={topRatedVertical.slice(0, 10)}
            isTop10={true}
          />
        )}

        {sciFiMovies.length > 0 && (
          <MovieRow title={rowT("thinkYouLove")} movies={sciFiMovies.slice(0, 25)} />
        )}

        {animations.length > 0 && (
          <MovieRow title={rowT("animation")} movies={animations} />
        )}

        {actionMovies.length > 0 && (
          <MovieRow title={rowT("action")} movies={actionMovies} />
        )}

        {upcoming.length > 0 && (
          <MovieRow title={rowT("continueWatching")} movies={upcoming.slice(0, 20)} />
        )}

        {comedyMovies.length > 0 && (
          <MovieRow title={rowT("weekend")} movies={comedyMovies} />
        )}

        {horrorMovies.length > 0 && (
          <MovieRow title={rowT("acclaimed")} movies={horrorMovies} />
        )}

        {trending.length > 20 && (
          <MovieRow title={rowT("freshPicks")} movies={trending.slice(20, 40)} />
        )}
      </div>
      <HomePageFooter />
    </div>
  );
};

export default HomePageAcount;