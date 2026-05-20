import VideoPlayer from "@/src/components/video/VideoPlayer";
import React from "react";

interface WatchPageProps {
  params: {
    id: string;
  };
  searchParams: {
    type?: "movie" | "tv";
  };
}

export default function WatchPage({ params, searchParams }: WatchPageProps) {
  const mediaType = searchParams.type === "tv" ? "tv" : "movie";

  return (
    <main className="w-full h-screen bg-black">
      <VideoPlayer movieId={params.id} mediaType={mediaType} />
    </main>
  );
}