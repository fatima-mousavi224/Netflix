/* eslint-disable @typescript-eslint/no-explicit-any */

import VideoPlayer from "@/src/components/video/VideoPlayer";

interface WatchPageProps {
  params: Promise<{ id: string; locale: string }> | any;
  searchParams: Promise<{ type?: string }> | any;
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const movieId = resolvedParams?.id;
  const mediaType = resolvedSearchParams?.type === "tv" ? "tv" : "movie";

  if (!movieId) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-zinc-500">
        Invalid Movie ID
      </div>
    );
  }

  return (
    <main className="w-full h-screen bg-black">
      <VideoPlayer movieId={movieId} mediaType={mediaType} />
    </main>
  );
}