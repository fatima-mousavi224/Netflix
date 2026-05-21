/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { X, Play, Plus, Check, ThumbsUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PlayButton from "@/src/ui/PlayButton";
import { useMyList } from "@/src/context/MyListContext";

interface MovieModalProps {
  movie: {
    id: string;
    title: string;
    thumbnailUrl: string;
    type?: "movie" | "tv";
  };
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const t = useTranslations("Modal");
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const imageBaseUrl =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const isTV = movie.type === "tv" || !movie.title;
  const mediaType = isTV ? "tv" : "movie";

  const { addToMyList, removeFromMyList, isInList } = useMyList();
  const isAdded = isInList(Number(movie.id));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${API_KEY}&append_to_response=credits,videos`,
        );
        const detailsData = await detailsResponse.json();
        setMovieDetails(detailsData);

        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results?.slice(0, 6) || []);

        if (isTV) {
          setLoadingEpisodes(true);
          const episodesResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${movie.id}/season/1?api_key=${API_KEY}&language=en-US`,
          );
          const episodesData = await episodesResponse.json();
          setEpisodes(episodesData.episodes || []);
          setLoadingEpisodes(false);
        }
      } catch (error) {
        console.error("Error fetching data in dynamic modal:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movie.id) {
      fetchAllData();
    }
  }, [movie.id, mediaType, isTV, API_KEY]);

  const finalImageUrl =
    movie.thumbnailUrl?.startsWith("http") ||
    movie.thumbnailUrl?.startsWith("/images")
      ? movie.thumbnailUrl
      : `${imageBaseUrl}/original${movie.thumbnailUrl}`;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-xs overflow-y-auto p-4 pt-8 md:pt-16 animate-fade-in no-scrollbar">
      <div className="relative bg-grey-850 text-white rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl border border-zinc-800 mb-12 animate-slide-up flex flex-col">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-50 bg-grey-850/80 p-2 rounded-full text-white hover:bg-zinc-800 border border-zinc-700/60 shadow-md transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <div
          className="relative w-full aspect-video min-h-55 sm:min-h-75 md:min-h-100 bg-no-repeat bg-cover bg-top"
          style={{ backgroundImage: `url('${finalImageUrl}')` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-grey-850 via-grey-850/10 to-transparent" />

          <div className="absolute bottom-24 left-6 md:left-10 right-6 space-y-2">
            <div className="flex items-center gap-1.5 animate-pulse">
              <Image
                src="/icons/Netflix_logoMovie.svg"
                alt="netflix movie"
                width={16}
                height={16}
              />
              <span className="text-[10px] tracking-[0.3em] font-black text-zinc-300 uppercase">
                {isTV ? "SERIES" : "MOVIE"}
              </span>
            </div>{" "}
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter drop-shadow-lg uppercase">
              {movieDetails?.title || movieDetails?.name || movie.title}
            </h1>
          </div>

          <div className="absolute bottom-6 left-6 md:left-10 flex items-center gap-3 z-20">
            <PlayButton movieId={movie.id} mediaType={mediaType} />

            <button
              onClick={() => {
                if (isAdded) {
                  removeFromMyList(Number(movie.id));
                } else {
                  addToMyList({
                    id: Number(movie.id),
                    title:
                      movieDetails?.title || movieDetails?.name || movie.title,
                    backdrop_path:
                      movieDetails?.backdrop_path || movie.thumbnailUrl,
                    poster_path: movieDetails?.poster_path,
                    type: mediaType,
                  });
                }
              }}
              className={`border-2 p-2 rounded-full transition shadow-md cursor-pointer ${
                isAdded
                  ? "border-green-500 bg-green-950/40 text-green-500"
                  : "border-zinc-400 bg-grey-700/60 text-white hover:border-white"
              }`}
            >
              {isAdded ? <Check size={18} /> : <Plus size={18} />}
            </button>

            <button className="border-2 border-zinc-400 bg-grey-700/60 hover:border-white p-2 rounded-full transition text-white shadow-md cursor-pointer">
              <ThumbsUp size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-20 text-center text-zinc-500 animate-pulse tracking-widest text-xs font-mono">
            {t("loadingExperience")}
          </div>
        ) : (
          <div className="p-6 md:p-12 space-y-12 bg-grey-850">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 flex-wrap font-medium">
                  <span className="text-secondary-green font-bold">
                    {movieDetails?.vote_average
                      ? t("match", {
                          percent: Math.round(movieDetails.vote_average * 10),
                        })
                      : t("match", { percent: 98 })}
                  </span>
                  <span>
                    {movieDetails?.release_date?.split("-")[0] ||
                      movieDetails?.first_air_date?.split("-")[0] ||
                      "2026"}
                  </span>
                  {isTV && movieDetails?.number_of_seasons && (
                    <span className="text-zinc-200 font-semibold">
                      {t("seasons", { count: movieDetails.number_of_seasons })}
                    </span>
                  )}
                  <span className="border border-zinc-600 px-1.5 py-0.2 rounded-sm text-[10px] font-bold text-zinc-300">
                    {movieDetails?.adult ? "18+" : "13+"}
                  </span>
                  <span className="border border-zinc-600 px-1 rounded-sm text-[9px] font-bold text-zinc-300">
                    HD
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-white">
                  <div className="scale-90 bg-red-600 p-0.5 rounded-xs inline-flex items-center justify-center w-5 h-5 font-black text-[10px]">
                    TOP
                  </div>
                  <span>{t("topRank")}</span>
                </div>

                <p className="text-grey-10 text-sm md:text-base leading-relaxed font-normal">
                  {movieDetails?.overview || t("noDescription")}
                </p>
              </div>

              <div className="text-xs md:text-sm space-y-3 text-zinc-400 font-normal">
                <p>
                  <span className="text-grey-200">{t("cast")}</span>{" "}
                  <span className="text-white">
                    {movieDetails?.credits?.cast
                      ?.slice(0, 3)
                      .map((c: any) => c.name)
                      .join(", ") || t("unknown")}
                  </span>
                </p>
                <p>
                  <span className="text-grey-200">{t("genres")}</span>{" "}
                  <span className="text-white">
                    {movieDetails?.genres?.map((g: any) => g.name).join(", ") ||
                      t("na")}
                  </span>
                </p>
                <p>
                  <span className="text-grey-200">{t("thisTitleIs")}</span>{" "}
                  <span className="text-white">Exciting, Top Styled</span>
                </p>
              </div>
            </div>

            {isTV && (
              <div className="space-y-4 border-t border-zinc-800/80 pt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold tracking-wide">
                    {t("episodes")}
                  </h3>
                  <button className="flex items-center gap-6 border border-zinc-600 bg-[#242424] px-4 py-1.5 text-sm rounded font-medium text-white hover:bg-zinc-800 cursor-pointer">
                    <span>{t("seasonDropdown")}</span> <ChevronDown size={16} />
                  </button>
                </div>

                {loadingEpisodes ? (
                  <div className="text-zinc-500 py-6 text-sm animate-pulse">
                    {t("loadingEpisodes")}
                  </div>
                ) : episodes.length === 0 ? (
                  <div className="text-zinc-500 py-2 text-xs font-light">
                    {t("noEpisodes")}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {episodes.map((ep: any, index: number) => {
                      const epImageUrl = ep.still_path
                        ? `${imageBaseUrl}/w300${ep.still_path}`
                        : finalImageUrl;

                      return (
                        <div
                          key={ep.id || index}
                          className="flex items-center gap-4 p-4 rounded-lg border-b border-zinc-800/60 hover:bg-[#333]/30 transition group"
                        >
                          <span className="text-zinc-500 text-lg font-bold w-4 text-center group-hover:text-white">
                            {ep.episode_number || index + 1}
                          </span>
                          <div className="relative w-32 aspect-video rounded-md overflow-hidden bg-zinc-800 shrink-0">
                            <Image
                              src={epImageUrl}
                              alt={ep.name}
                              fill
                              className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                              <Play
                                size={20}
                                className="text-white fill-white"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between text-sm font-bold">
                              <h4 className="text-zinc-200 group-hover:text-white line-clamp-1">
                                {ep.name ||
                                  t("episodeTitle", {
                                    number: ep.episode_number,
                                  })}
                              </h4>
                              <span className="text-zinc-400 font-normal text-xs">
                                {ep.runtime ? `${ep.runtime}m` : "45m"}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-2 font-light leading-normal">
                              {ep.overview || t("noEpisodeOverview")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {similarMovies.length > 0 && (
              <div className="space-y-5 border-t border-zinc-800/80 pt-8">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide">
                  {t("moreLikeThis")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {similarMovies.map((simMovie: any) => {
                    const simImageUrl =
                      simMovie.backdrop_path || simMovie.poster_path
                        ? `${imageBaseUrl}/w500${simMovie.backdrop_path || simMovie.poster_path}`
                        : "/images/AcountpageBackgroun.png";

                    const isSimMovieAdded = isInList(Number(simMovie.id));

                    return (
                      <div
                        key={simMovie.id}
                        className="bg-[#2f2f2f] rounded-md overflow-hidden flex flex-col h-full shadow-lg border border-transparent hover:border-zinc-700 transition duration-200"
                      >
                        <div className="relative aspect-video w-full">
                          <Image
                            src={simImageUrl}
                            alt={simMovie.title || simMovie.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 p-1">
                            <Image
                              src="/icons/Netflix_logoMovie.svg"
                              alt="netflix movie"
                              width={12}
                              height={12}
                            />
                          </div>
                        </div>
                        <div className="p-5 flex flex-col grow space-y-3 justify-between">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <span className="text-secondary-green text-xs font-bold">
                                {simMovie.vote_average
                                  ? t("match", {
                                      percent: Math.round(
                                        simMovie.vote_average * 10,
                                      ),
                                    })
                                  : t("match", { percent: 75 })}
                              </span>
                              <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                                <span className="border border-zinc-600 px-1 rounded-sm text-[9px] font-bold">
                                  {simMovie.adult ? "18+" : "13+"}
                                </span>
                                <span>
                                  {simMovie.release_date?.split("-")[0] ||
                                    simMovie.first_air_date?.split("-")[0] ||
                                    "2025"}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (isSimMovieAdded) {
                                  removeFromMyList(Number(simMovie.id));
                                } else {
                                  addToMyList({
                                    id: Number(simMovie.id),
                                    title: simMovie.title || simMovie.name,
                                    backdrop_path:
                                      simMovie.backdrop_path ||
                                      simMovie.poster_path,
                                    poster_path: simMovie.poster_path,
                                    type: mediaType,
                                  });
                                }
                              }}
                              className={`border-2 p-2 rounded-full transition shadow-md cursor-pointer ${
                                isSimMovieAdded
                                  ? "border-green-500 bg-green-950/40 text-green-500"
                                  : "border-zinc-400 bg-grey-700/60 text-white hover:border-white"
                              }`}
                            >
                              {isSimMovieAdded ? (
                                <Check size={14} />
                              ) : (
                                <Plus size={14} />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-grey-25 font-normal line-clamp-4 leading-relaxed grow">
                            {simMovie.overview || t("noDescription")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {movieDetails?.videos?.results?.length > 0 && (
              <div className="space-y-4 border-t border-zinc-800/80 pt-8">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide">
                  {t("trailersAndMore")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {movieDetails.videos.results.slice(0, 3).map((video: any) => (
                    <div key={video.id} className="space-y-2 group">
                      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-zinc-800 border border-zinc-800">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      </div>
                      <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white line-clamp-1">
                        {video.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 border-t border-zinc-800/80 pt-8 text-xs md:text-sm text-zinc-400 font-normal">
              <h3 className="text-lg font-bold text-white tracking-wide pb-1">
                {t("about", {
                  title:
                    movieDetails?.title || movieDetails?.name || movie.title,
                })}
              </h3>
              <p>
                <span className="text-grey-200">{t("createdDirectedBy")}</span>{" "}
                <span className="text-white">
                  {movieDetails?.created_by?.[0]?.name || t("netflixDirectors")}
                </span>
              </p>
              <p>
                <span className="text-grey-200">{t("cast")}</span>{" "}
                <span className="text-white">
                  {movieDetails?.credits?.cast
                    ?.slice(0, 8)
                    .map((c: any) => c.name)
                    .join(", ") || t("unknown")}
                </span>
              </p>
              <p>
                <span className="text-grey-200">{t("genres")}</span>{" "}
                <span className="text-white">
                  {movieDetails?.genres?.map((g: any) => g.name).join(", ") ||
                    t("na")}
                </span>
              </p>
              <p>
                <span className="text-grey-200">{t("maturityRating")}</span>{" "}
                <span className="border border-zinc-600 px-1 rounded-sm text-[10px] text-zinc-300 inline-block mr-1">
                  13+
                </span>{" "}
                {t("maturityWarning")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
