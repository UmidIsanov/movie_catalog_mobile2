import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../query/baseQuery";

export const moviesApi = createApi({
  reducerPath: "api/movies",
  baseQuery,
  tagTypes: ["movies", "persons"],
  endpoints: (build) => ({
    getNowPlayingMovies: build.query({
      query: () => ({ url: "movie/now_playing" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getSingleMovie: build.query({
      query: (id) => ({ url: `movie/${id}` }),
      providesTags: (movie) => [{ type: "movies", id: movie.id }],
    }),
    getPersonOwnDataById: build.query({
      query: (id) => ({ url: `person/${id}` }),
      providesTags: (person) => [{ type: "persons", id: person.id }],
    }),
    getTopRatedMovies: build.query({
      query: () => ({ url: "/movie/top_rated" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),

    getVideosByid: build.query({
      query: (id) => ({ url: `/movie/${id}/videos` }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),

    getUpcomingMovie: build.query({
      query: () => ({ url: "movie/upcoming" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getPopularMovie: build.query({
      query: () => ({ url: "movie/popular" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getGreditsMovieById: build.query({
      query: (id) => ({
        url: `/movie/${id}/credits
      `,
      }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getRecommendationsMoviesById: build.query({
      query: (id) => ({
        url: `/movie/${id}/recommendations
      `,
      }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNowPlayingMoviesQuery,
  useGetSingleMovieQuery,
  useGetTopRatedMoviesQuery,
  useGetVideosByidQuery,
  useGetUpcomingMovieQuery,
  useGetPopularMovieQuery,
  useGetGreditsMovieByIdQuery,
  useGetPersonOwnDataByIdQuery,
  useGetRecommendationsMoviesByIdQuery,
} = moviesApi;
