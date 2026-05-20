"use client";

import React from "react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface PlayButtonProps {
  movieId: string;
  mediaType?: "movie" | "tv";
  className?: string; // برای اینکه اگر خواستی استایل اختصاصی در هر صفحه به آن بدهی
}

const PlayButton: React.FC<PlayButtonProps> = ({
  movieId,
  mediaType = "movie",
  className = "",
}) => {
  const router = useRouter();
  const t = useTranslations("Modal"); // یا هر سکشنی که کلید play در آن تعریف شده است

  const handlePlay = () => {
    if (movieId) {
      router.push(`/watch/${movieId}?type=${mediaType}`);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className={`bg-white text-black py-2 px-7 rounded-md font-bold flex items-center gap-2 hover:bg-neutral-200 transition text-sm md:text-base shadow-md cursor-pointer ${className}`}
    >
      <Play size={18} className="fill-black" />
      <span>{t("play")}</span>
    </button>
  );
};

export default PlayButton;