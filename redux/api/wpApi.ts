// Dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
import type { PostType, PostResponseType } from "@/types/post.types";
import type { PageType } from "@/types/page.types";
import type { MenuType } from "@/types/menu.types";
import type { TagType } from "@/types/tag.types";

// Helpers
import postsShaper from "@/helpers/postsShaper";

const MAIN_URL = "https://dev-today-news.pantheonsite.io";
const baseURL = `${MAIN_URL}/wp-json/wp/v2/`;

export const wpApi = createApi({
  reducerPath: 'wpAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Posts', 'Categories', 'Tags', 'Menus', 'Pages'],
  endpoints: (builder) => ({
    // Menu
    getHeaderMenu: builder.query<MenuType[], void>({
      query: () => 'menu-header',
      providesTags: ['Menus'],
    }),

    getFooterMenu: builder.query<MenuType[], void>({
      query: () => 'menu-footer',
      providesTags: ['Menus'],
    }),

    // Home - Posts
    getHomeFeatured: builder.query<PostType[], void>({
      query: () => ({
        url: 'posts',
        params: { per_page: 7, offset: 0, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: ['Posts'],
    }),

    getHomeMainList: builder.query<PostType[], void>({
      query: () => ({
        url: 'posts',
        params: { per_page: 3, offset: 7, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: ['Posts'],
    }),

    getHomeSecondList: builder.query<PostType[], void>({
      query: () => ({
        url: 'posts',
        params: { per_page: 12, offset: 10, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: ['Posts'],
    }),

    getHomeThirdList: builder.query<PostType[], void>({
      query: () => ({
        url: 'posts',
        params: { per_page: 7, offset: 18, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: ['Posts'],
    }),

    getHomeFourthList: builder.query<PostType[], void>({
      query: () => ({
        url: 'posts',
        params: { per_page: 12, offset: 21, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: ['Posts'],
    }),

    getTrendingPosts: builder.query<PostType[], void>({
      query: () => ({
        url: 'posts',
        params: { per_page: 12, offset: 0, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: ['Posts'],
    }),

    // Category
    getCategoryInfo: builder.query<{ id: number; name: string; slug: string }[], string>({
      query: (slug) => `categories?slug=${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Categories', id: slug }],
    }),

    getCategoryById: builder.query<{ id: number; name: string; slug: string }, number>({
      query: (id) => `categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Categories', id }],
    }),

    getCategoryPosts: builder.query<PostType[], { id: number; per_page: number; offset?: number }>({
      query: ({ id, per_page, offset = 0 }) => ({
        url: 'posts',
        params: { categories: id, per_page, offset, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: (result, error, { id }) => [{ type: 'Posts', id: `category-${id}` }],
    }),

    getRelatedPosts: builder.query<PostType[], { category_id: number; post_id: number }>({
      query: ({ category_id, post_id }) => ({
        url: 'posts',
        params: { categories: category_id, exclude: post_id, per_page: 4, offset: 0, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: (result, error, { category_id }) => [{ type: 'Posts', id: `related-${category_id}` }],
    }),

    getAllCategories: builder.query<{ id: number; name: string; slug: string }[], void>({
      query: () => 'categories?per_page=20',
      providesTags: ['Categories'],
    }),

    // Post
    getPostDetail: builder.query<PostResponseType[], string>({
      query: (slug) => `posts?slug=${slug}&_embed`,
      providesTags: (result, error, slug) => [{ type: 'Posts', id: slug }],
    }),

    // Search
    getSearchPosts: builder.query<PostType[], { query: string; per_page?: number }>({
      query: ({ query, per_page = 12 }) => ({
        url: 'posts',
        params: { search: query, per_page, offset: 0, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: (result, error, { query }) => [{ type: 'Posts', id: `search-${query}` }],
    }),

    // Tag
    getTagInfo: builder.query<TagType[], string>({
      query: (slug) => `tags?slug=${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Tags', id: slug }],
    }),

    getTagInfoById: builder.query<TagType, number>({
      query: (id) => `tags/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tags', id }],
    }),

    getTagPosts: builder.query<PostType[], { id: number; per_page: number; offset?: number }>({
      query: ({ id, per_page, offset = 0 }) => ({
        url: 'posts',
        params: { tag: id, per_page, offset, _embed: 'true' },
      }),
      transformResponse: async (response: PostResponseType[]): Promise<PostType[]> => {
        return await postsShaper(response);
      },
      providesTags: (result, error, { id }) => [{ type: 'Posts', id: `tag-${id}` }],
    }),

    // Posts by Ids (for favorites)
    getPostsByIds: builder.query<PostType[], number[]>({
      async queryFn(ids, api) {
        if (ids.length <= 0) return { data: [] };

        try {
          const results = await fetch(`/api/posts?include=${ids.join(',')}`, { cache: 'no-store' });
          const jsonResults: PostResponseType[] = await results.json();
          const posts: PostType[] = await postsShaper(jsonResults);
          return { data: posts };
        } catch (err) {
          // @ts-expect-error rejectWithValue exists on queryFn api but not in BaseQueryApi type
          return api.rejectWithValue(err);
        }
      },
      providesTags: (result, error, ids) => [{ type: 'Posts', id: `favorites-${ids.join(',')}` }],
    }),

    // Page
    getPage: builder.query<PageType, string>({
      query: (slug) => `pages?slug=${slug}&_embed`,
      transformResponse: (response: PageType[]) => response[0],
      providesTags: (result, error, slug) => [{ type: 'Pages', id: slug }],
    }),
  }),
});

export const {
  useGetHeaderMenuQuery,
  useGetFooterMenuQuery,
  useGetHomeFeaturedQuery,
  useGetHomeMainListQuery,
  useGetHomeSecondListQuery,
  useGetHomeThirdListQuery,
  useGetHomeFourthListQuery,
  useGetTrendingPostsQuery,
  useGetCategoryInfoQuery,
  useGetCategoryByIdQuery,
  useGetCategoryPostsQuery,
  useGetRelatedPostsQuery,
  useGetAllCategoriesQuery,
  useGetPostDetailQuery,
  useGetSearchPostsQuery,
  useGetTagInfoQuery,
  useGetTagInfoByIdQuery,
  useGetTagPostsQuery,
  useGetPostsByIdsQuery,
  useGetPageQuery,
} = wpApi;