"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  badge?: "Recently Added" | "New Season" | "Leaving Soon" | "Top 10"; 
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isTop10?: boolean;
}

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  isTop10 = false,
}) => {
    const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth + 100
          : scrollLeft + clientWidth - 100;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const getBadgeClass = (badge?: string) => {
    if (badge === "Recently Added") return "bg-red-600";
    if (badge === "New Season") return "bg-orange-500";
    if (badge === "Leaving Soon") return "bg-amber-600";
    return "bg-neutral-700";
  };

  return (
    <div className="space-y-1 md:space-y-3 px-4 md:px-16 group/row relative mb-10 select-none">
      <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-grey-10 hover:text-white transition-colors duration-200 cursor-pointer tracking-wide">
        {title}
      </h2>

      <div className="relative md:-ml-2">
        {/* دکمه چپ */}
        <button
          onClick={() => handleScroll("left")}
          className={`absolute top-0 bottom-0 left-0 h-full w-10 md:w-12 flex items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 hover:bg-black/80 transition-all duration-200 z-40 cursor-pointer ${
            !isMoved && "hidden"
          }`}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white transition-transform hover:scale-125" />
        </button>

        <div
          ref={rowRef}
          className="flex items-center gap-2 md:gap-2 overflow-x-scroll scrollbar-none pl-2 pr-12 py-4"
        >
          {movies.map((movie, index) => {
            if (isTop10) {
              return (
                <div
                  key={movie.id}
                  className="relative flex items-end min-w-40 sm:min-w-50 md:min-w-65 h-32.5 sm:h-40 md:h-50 group/item cursor-pointer"
                >
                  <span className="text-[120px] sm:text-[160px] md:text-[240px] font-black leading-none text-black select-none absolute -bottom-5 sm:-bottom-8 md:-bottom-11 left-5 z-10 transition-colors drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)] text-stroke">
                    {index + 1}
                  </span>

                  <div className="relative w-[55%] h-[88%] ml-auto rounded-[3px] overflow-hidden transform group-hover/item:scale-105 transition-all duration-300 shadow-xl z-20 bg-zinc-900 border border-zinc-800">
                    <Image
                      src={
                        movie.thumbnailUrl.startsWith("http")
                          ? movie.thumbnailUrl
                          : `${imageBaseUrl}/w500${movie.thumbnailUrl}` 
                      }
                      alt={movie.title}
                      fill
                      sizes="(max-w-768px) 210px, 290px"
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute top-1 left-1 shadow-md">
                      <Image
                        src="/icons/Netflix_logoMovie.svg"
                        alt="movie logo"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </div>
              );
            }

          
            return (
              <div
                key={movie.id}
                className="relative min-w-37.5 sm:min-w-52.5 md:min-w-72.5 aspect-video cursor-pointer rounded-sm overflow-hidden transform hover:scale-105 hover:z-30 transition-all duration-300 shadow-lg bg-zinc-900 group/item border border-zinc-900 hover:border-zinc-700"
              >
                <Image
                  src={
                    movie.thumbnailUrl.startsWith("http")
                      ? movie.thumbnailUrl
                      : `${imageBaseUrl}/w500${movie.thumbnailUrl}` 
                  }
                  alt={movie.title}
                  fill
                  sizes="(max-w-768px) 210px, 290px"
                  className="object-cover pointer-events-none"
                />
                <div className="absolute top-1.5 left-1.5 shadow-md z-20">
                  <Image
                    src="/icons/Netflix_logoMovie.svg"
                    alt="movie logo"
                    width={12}
                    height={12}
                  />
                </div>
                {movie.badge && (
                  <div className="absolute bottom-0 left-0 right-0 p-1 flex justify-center z-20 bg-linear-to-t from-black/85 to-transparent">
                    <span
                      className={`text-[9px] md:text-[10px] font-bold text-white px-2 py-0.5 rounded-sm tracking-wider uppercase shadow-sm ${getBadgeClass(movie.badge)}`}
                    >
                      {movie.badge}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute top-0 bottom-0 right-0 h-full w-10 md:w-12 flex items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 hover:bg-black/80 transition-all duration-200 z-40 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white transition-transform hover:scale-125" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
