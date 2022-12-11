import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const subSocialApi = createApi({
  reducerPath: 'subSocialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    saveContent: builder.mutation({
      invalidatesTags: ['Post'],
      query: initialPost => ({
        url: '/subsocial',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: initialPost
      }),
    }),
  }),
})
export const { useSaveContentMutation } = subSocialApi