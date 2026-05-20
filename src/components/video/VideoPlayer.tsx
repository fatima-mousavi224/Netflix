/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, RotateCcw, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface VideoPlayerProps {
  movieId: string;
  mediaType: "movie" | "tv";
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, mediaType }) => {
  const t = useTranslations("Player");
  const router = useRouter();
  
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [movieName, setMovieName] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // ۱. دریافت اطلاعات ویدیو و نام فیلم از API
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        // دریافت ویدیوها
        const resVideo = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        const dataVideo = await resVideo.json();
        
        // پیدا کردن تریلر رسمی یا اولین ویدیو موجود
        const trailer = dataVideo.results?.find(
          (vid: any) => vid.type === "Trailer" || vid.type === "Teaser"
        );
        setVideoKey(trailer?.key || dataVideo.results?.[0]?.key || null);

        // دریافت نام فیلم/سریال برای نمایش در حالت Pause
        const resDetails = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${API_KEY}`
        );
        const dataDetails = await resDetails.json();
        setMovieName(dataDetails.title || dataDetails.name || "");
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchVideo();
  }, [movieId, mediaType, API_KEY]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-sm font-mono tracking-widest animate-pulse">
        LOADING VIDEO...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* دکمه بازگشت (همیشه بالا سمت چپ) */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-50 text-white hover:scale-110 transition p-2 bg-black/40 rounded-full cursor-pointer flex items-center gap-2 text-sm"
      >
        <ArrowLeft size={28} />
        <span className="hidden md:inline font-medium">{t("backToBrowse")}</span>
      </button>

      {/* اگر ویدیو پیدا شد، آن را داخل iframe یوتیوب پخش میکنیم */}
      {videoKey ? (
        <div className="relative w-full h-full pointer-events-auto">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=0&rel=0&showinfo=0&modestbranding=1&mute=${isMuted ? 1 : 0}`}
            title="Video Player"
            className="w-full h-full border-0 scale-105"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* لایه شبیه‌ساز کنترل‌های پلیر (حالت Default / Paused) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div />

            {/* کنترل‌های پایین پلیر */}
            <div className="space-y-4">
              {/* نام فیلم در حالت متوقف یا هاور شدن کنترلر */}
              <div className="text-white space-y-1">
                <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{t("youAreWatching")}</span>
                <h2 className="text-xl md:text-3xl font-black">{movieName}</h2>
              </div>

              {/* دکمه‌های اصلی کنترلر */}
              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 text-white">
                <div className="flex items-center gap-6">
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-red-500 transition cursor-pointer">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
                
                <div className="text-xs md:text-sm font-mono text-zinc-400">
                  {t("episodeIndicator", { number: 1 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-zinc-500 text-center space-y-4 p-6">
          <p className="text-lg font-bold">No playable video found for this title.</p>
          <button onClick={() => router.back()} className="text-red-500 underline text-sm cursor-pointer">
            {t("backToBrowse")}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;