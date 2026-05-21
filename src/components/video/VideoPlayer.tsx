/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface VideoPlayerProps {
  movieId: string;
  mediaType: "movie" | "tv";
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, mediaType }) => {
  const t = useTranslations("Player");
  const router = useRouter();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [movieName, setMovieName] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const initPlayer = async () => {
      try {
        setLoading(true);

        // ۱. دریافت مشخصات واقعی فیلم از TMDB
        const resDetails = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${API_KEY}`,
        );
        const dataDetails = await resDetails.json();
        setMovieName(dataDetails.title || dataDetails.name || "Video Player");

        // ۲. اتصال به سرور فعال vidsrc.pm با پنهان‌سازی لوکال‌هواست
        let embedUrl = "";
        if (mediaType === "movie") {
          embedUrl = `https://vidsrc.pm/embed/movie/${movieId}`;
        } else {
          embedUrl = `https://vidsrc.pm/embed/tv/${movieId}/1/1`;
        }

        setVideoUrl(embedUrl);
      } catch (error) {
        console.error("Error setting up video player:", error);
      } finally {
        // املا کاملاً اصلاح شد (finally)
        setLoading(false);
      }
    };

    if (movieId) initPlayer();
  }, [movieId, mediaType, API_KEY]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-sm font-mono tracking-widest animate-pulse">
        LOADING FULL MOVIE...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* دکمه بازگشت - این دکمه باید کلیک‌خوردنی باقی بماند */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-50 text-white hover:scale-110 transition p-2 bg-black/60 rounded-full cursor-pointer flex items-center gap-2 text-sm pointer-events-auto"
      >
        <ArrowLeft size={28} />
        <span className="hidden md:inline font-medium">
          {t("backToBrowse")}
        </span>
      </button>

      {/* نمایش آی‌فریم فیلم */}
      {videoUrl ? (
        <div className="relative w-full h-full">
          <iframe
            src={videoUrl}
            title={movieName}
            className="w-full h-full border-0 bg-black"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="no-referrer"
            allowFullScreen
          />

          {/* تغییر اصلی اینجاست: 
            اضافه کردن pointer-events-none باعث می‌شود این لایه مانع کلیک روی پلیر اصلی فیلم نشود
          */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/20 via-transparent to-black/20 flex flex-col justify-between p-6">
            <div />

            {/* بخش مشخصات فیلم در پایین سمت چپ */}
            <div className="space-y-2 mb-12">
              <div className="text-white">
                <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider block">
                  {t("youAreWatching")}
                </span>
                <h2 className="text-xl md:text-2xl font-black drop-shadow-lg">
                  {movieName}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-zinc-500 text-center p-6">
          <p className="text-lg font-bold">No stream available.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;




