"use client";

import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  movieId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ movieId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedLikes = JSON.parse(localStorage.getItem("likedMovies") || "{}");
      return !!savedLikes[movieId];
    }
    return false;
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const nextLikedState = !isLiked;
    setIsLiked(nextLikedState);

    const savedLikes = JSON.parse(localStorage.getItem("likedMovies") || "{}");
    
    if (nextLikedState) {
      savedLikes[movieId] = true;
    } else {
      delete savedLikes[movieId];
    }
    
    localStorage.setItem("likedMovies", JSON.stringify(savedLikes));
  };

  return (
    <button
      onClick={handleLikeClick}
      className={`border-2 p-2 rounded-full transition shadow-md cursor-pointer flex items-center justify-center duration-300 ${
        isLiked 
          ? "border-emerald-500 bg-emerald-500 text-white scale-110 shadow-emerald-500/20" 
          : "border-zinc-400 bg-grey-700/60 text-white hover:border-white"
      }`}
      title={isLiked ? "Liked" : "Like this movie"}
    >
      <ThumbsUp 
        size={18} 
        fill={isLiked ? "currentColor" : "none"} 
        className="transition-transform duration-200 active:scale-75"
      />
    </button>
  );
};

export default LikeButton;