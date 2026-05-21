"use client";

import React from "react";
import { Play } from "lucide-react";
import { useRouter, useParams } from "next/navigation"; 
import { useTranslations } from "next-intl";

interface PlayButtonProps {
  movieId: string;
  mediaType?: "movie" | "tv";
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  movieId,
  mediaType = "movie",
  className = "",
}) => {
  const router = useRouter();
  const params = useParams(); 
  const t = useTranslations("Modal");

  const locale = params?.locale || "en";

  const handlePlay = () => {
    if (!movieId) {
      console.error("Movie ID is missing!");
      return;
    }
    
    router.push(`/${locale}/watch/${movieId}?type=${mediaType}`);
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