import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://jsonplaceholder.typicode.com/posts`,
    prepareHeaders: (headers) => {
      headers.set("Content-type", "application/json; charset=UTF-8");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (id: string | undefined) => `/${id}`,
    }),
  }),
});

export const { useGetPostQuery } = api;
