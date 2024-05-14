import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../query/baseQuery";

export const moviesApi = createApi({
  reducerPath: "api/movies",
  baseQuery,
  tagTypes: ["movies", "persons", "tv"],
  endpoints: (build) => ({
    getNowPlayingMovies: build.query({
      query: () => ({ url: "movie/now_playing" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getSingleMovie: build.query({
      query: (id) => ({ url: `movie/${id}` }),
      providesTags: (movie) => [{ type: "movies", id: movie.id }],
    }),
    getSingleTvShow: build.query({
      query: (id) => ({ url: `tv/${id}` }),
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
    getVideosByIdTvShows: build.query({
      query: (id) => ({ url: `/tv/${id}/videos` }),
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
    getTopRatedTvShows: build.query({
      query: () => ({ url: "/tv/top_rated" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getAiringTodayTvShows: build.query({
      query: () => ({ url: "/tv/airing_today" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getOnTheAirTvShows: build.query({
      query: () => ({ url: "/tv/on_the_air" }),
      providesTags: () => [{ type: "movies", id: "LIST" }],
    }),
    getPopularTvShows: build.query({
      query: () => ({ url: "/tv/popular" }),
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
  useGetTopRatedTvShowsQuery,
  useGetAiringTodayTvShowsQuery,
  useGetOnTheAirTvShowsQuery,
  useGetPopularTvShowsQuery,
  useGetSingleTvShowQuery,
  useGetVideosByIdTvShowsQuery,
} = moviesApi;
