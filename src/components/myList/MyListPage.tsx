/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import HomePageHeader from "@/src/ui/header/HomePageHeader";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMyList } from "@/src/context/MyListContext";
import { Trash2 } from "lucide-react"; 

export default function MyListPage() {
  const params = useParams();
  const locale = params?.locale || "en";

  const { myList, removeFromMyList } = useMyList();

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans select-none">
      <HomePageHeader />
      <main className="px-4 md:px-12 py-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">My List</h1>

        {myList.length === 0 ? (
          <div className="h-60 flex flex-col items-center justify-center text-zinc-500 space-y-2">
            <p className="text-lg font-medium">Your list is empty.</p>
            <p className="text-sm text-zinc-600">Explore and add movies or TV shows to your list!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 pt-4">
            {myList.map((item, index) => {
              const imageUrl = item.backdrop_path || item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`
                : "/placeholder.jpg";

              return (
                <div 
                  key={`${item.id}-${index}`} 
                  className="group relative flex flex-col cursor-pointer transition duration-300 hover:scale-105"
                >
                  <div className="relative aspect-video w-full bg-zinc-800 rounded-sm overflow-hidden shadow-md">
                    <Link href={`/${locale}/watch/${item.id}?type=${item.type || "movie"}`} className="w-full h-full block">
                      <Image
                        src={imageUrl}
                        alt={item.title || "Media"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </Link>

                    <div className="absolute top-2 left-2 pointer-events-none">
                      <Image
                        src="/icons/Netflix_logoMovie.svg"
                        alt="Netflix"
                        width={14}
                        height={14}
                      />
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault(); // جلوگیری از رفتن به صفحه پخش فیلم موقع کلیک روی دکمه
                        removeFromMyList(Number(item.id));
                      }}
                      className="absolute bottom-2 right-2 bg-black/80 p-2 rounded-full text-zinc-400 hover:text-red-500 hover:bg-black border border-zinc-700/50 shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-30 cursor-pointer"
                      title="Remove from list"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}