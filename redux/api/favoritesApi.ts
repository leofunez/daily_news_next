// Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
import type { PostResponseType, PostType } from "@/types/post.types";

// Helpers
import postsShaper from "@/helpers/postsShaper";

export const favoritesApi = createApi({
  reducerPath: 'favoritesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`
  }),
  endpoints: (builder) => ({
    getFavorites: builder.query<PostType[], number[]>({
      query: (ids) => ({
        url: 'posts',
        params: {
          include: ids.join(','),
          _embed: 'true'
        }
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      }
    })
  })
});

export const { useGetFavoritesQuery } = favoritesApi;
