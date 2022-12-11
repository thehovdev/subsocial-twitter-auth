import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// RTK Query
export const twitterApi = createApi({
  reducerPath: 'twitterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['getTweets'],
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => `tweets`,
      providesTags: ['getTweets'],
    }),
  }),
})

export const { useGetTweetsQuery } = twitterApi