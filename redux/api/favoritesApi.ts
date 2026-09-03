// Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
import type { PostResponseType, PostType } from "@/types/post.types";

// Helpers
import { postsFavShaper } from "@/helpers/postsShaper";

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
        }
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsFavShaper(response);
      }
    })
  })
});

export const { useGetFavoritesQuery } = favoritesApi;
