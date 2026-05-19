const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbService = {
  getTrendingMovies: () => fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(res => res.json()),
  getPopularMovies: () => fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then(res => res.json()),
  getTopRatedMovies: () => fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then(res => res.json()),
  getAnimationMovies: () => fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`).then(res => res.json()),
  getActionMovies: () => fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`).then(res => res.json()),
  getComedyMovies: () => fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`).then(res => res.json()),
  getHorrorMovies: () => fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`).then(res => res.json()),
  getSciFiMovies: () => fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`).then(res => res.json()),
  getUpcomingMovies: () => fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then(res => res.json()),
};