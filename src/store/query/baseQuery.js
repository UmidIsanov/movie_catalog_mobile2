import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  prepareHeaders: (headers, api) => {
    headers.append(
      "Authorization",
      `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
    );
    return headers;
  },
});
