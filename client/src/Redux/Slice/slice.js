import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from "../../assets/url";
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    credentials: "include",
  }),
  tagTypes: ['Get'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/api/user/auth/refetch",
    }),
    getImages: builder.query({
      query: () => "/api/post",
    }),
  }),
})
export const { useGetPostsQuery, useGetImagesQuery } = apiSlice