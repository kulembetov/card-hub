import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = process.env.REACT_APP_PEXELS_API_KEY;

export const pexelsApi = createApi({
  reducerPath: 'pexelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pexels.com/v1',
    prepareHeaders: (headers) => {
      if (apiKey) {
        headers.set('Authorization', apiKey);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<any, void>({
      query: () => 'curated?per_page=20',
    }),
  }),
});

export const { useGetPhotosQuery } = pexelsApi;
