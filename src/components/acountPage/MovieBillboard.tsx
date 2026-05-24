/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Info } from "lucide-react";
import HomePageHeader from "@/src/ui/header/HomePageHeader";
import { useTranslations } from "next-intl";
import PlayButton from "@/src/ui/PlayButton";

interface BillboardProps {
  id: string;
  type?: "movie" | "tv";
  title: string;
  description: string;
  backdropUrl: string;
  onOpenModal: (movie: { id: string; title: string; thumbnailUrl: string; type?: "movie" | "tv" }) => void; // ۱. اضافه شدن تابع باز کردن مودال به پراپس
}

const MovieBillboard: React.FC<BillboardProps> = ({
  id,
  type = "movie",
  title,
  description,
  backdropUrl,
  onOpenModal,
}) => {
  const t = useTranslations("Billboard");
  const imageBaseUrl =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

  const finalImageUrl =
    backdropUrl.startsWith("http") || backdropUrl.startsWith("/images")
      ? backdropUrl
      : `${imageBaseUrl}/original${backdropUrl.startsWith("/") ? backdropUrl : `/${backdropUrl}`}`;

  return (
    <div
      className="relative h-[45vh] md:h-[56.25vw] w-full bg-no-repeat bg-cover bg-center transition-all duration-500 bg-zinc-950"
      style={{ backgroundImage: `url('${finalImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10" />
      <HomePageHeader />

      <div className="absolute bottom-[15%] md:bottom-[30%] left-6 md:left-20 z-20 max-w-xs md:max-w-xl flex flex-col gap-2 md:gap-4">
        <h1 className="text-white text-2xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl tracking-wide uppercase">
          {title}
        </h1>

        <p className="text-grey-10 text-[10px] md:text-sm lg:text-base line-clamp-3 md:line-clamp-4 drop-shadow-md font-light max-w-md leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3 mt-2 md:mt-4">
          <PlayButton movieId={id} mediaType={type} />

          <button
            onClick={() => {
              onOpenModal({
                id,
                title,
                thumbnailUrl: backdropUrl,
                type,
              });
            }}
            className="bg-grey-10/20 text-white rounded-sm md:rounded-md py-1.5 md:py-2 px-4 md:px-6 flex items-center gap-2 text-xs md:text-base font-semibold hover:bg-grey-10/30 border border-transparent hover:border-grey-10/40 transition-colors cursor-pointer backdrop-blur-sm"
          >
            <Info size={18} />
            <span>{t("moreInfo")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBillboard;