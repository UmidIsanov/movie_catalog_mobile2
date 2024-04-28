import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../query/baseQuery";

export const moviesApi = createApi({
  reducerPath: "api/movies",
  baseQuery,
  tagTypes: ["movies"],
  endpoints: (build) => ({
    getNowPlayingMovies: build.query({
      query: () => ({ url: "movie/now_playing" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getSingleMovie: build.query({
      query: (id) => ({ url: `movie/${id}` }),
      providesTags: (movie) => [{ type: "movies", id: movie.id }],
    }),
    getTopRatedMovies: build.query({
      query: () => ({ url: "/movie/top_rated" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNowPlayingMoviesQuery,
  useGetSingleMovieQuery,
  useGetTopRatedMoviesQuery,
} = moviesApi;