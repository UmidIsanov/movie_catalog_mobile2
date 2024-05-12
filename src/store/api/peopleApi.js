import { createApi } from "@reduxjs/toolkit/query";
import { baseQuery } from "../query/baseQuery";

export const peopleApi = createApi({
  reducerPath: "api/person",
  baseQuery,
  tagTypes: ["persons"],
  endpoints: (build) => ({
    getPersonById: build.query({
      query: (id) => ({ url: `person/${id}` }),
      providesTags: (person) => [{ type: "persons", id: person.id }],
    }),
  }),
});

export const { useGetPersonByIdQuery } = peopleApi;
