/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`,
    );
    const data = await response.json();

    const formattedResults = data.results
      .filter((m: any) => m.media_type !== "person")
      .map((m: any) => ({
        id: String(m.id),
        title: m.title || m.name,
        thumbnailUrl: m.backdrop_path || m.poster_path,
        type: m.media_type === "tv" ? "tv" : "movie",
        genre: m.release_date || m.first_air_date || "",
      }))
      .slice(0, 8);

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
