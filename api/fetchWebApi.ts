// Constants
import { MAIN_URL } from "../constants";

// Types
import type { PostType } from "@/types/post.types";
import type { PageType } from "@/types/page.types";

// Helpers
import postsFetcher from "@/helpers/postsFetcher";

const baseURL = `${MAIN_URL}/wp-json/wp/v2/`;

const fetchWebApi = {
  // Menu
    async getHeaderMenu() {
      const response = await fetch(`${baseURL}menu-header`);
      return response.json();
    },

    async getFooterMenu() {
      const response = await fetch(`${baseURL}menu-footer`);
      return response.json();
    },
  // .Menu

  // Home
    async getHomeFeatured(): Promise<PostType[]> {
      return await postsFetcher('posts', 7, 0);
    },

    async getHomeMainList(): Promise<PostType[]> {
      return await postsFetcher('posts', 3, 7);
    },

    async getHomeSecondList(): Promise<PostType[]> {
      return await postsFetcher('posts', 8, 10);
    },

    async getHomeThirdList(): Promise<PostType[]> {
      return await postsFetcher('posts', 7, 18);
    },

    async getHomeFourthList(): Promise<PostType[]> {
      return await postsFetcher('posts', 8, 25);
    },

    async getTendingPosts() {
      return await postsFetcher('posts', 12, 0);
    },
  // .Home

  // Category
    async getCategoryInfo(slug: string) {
        const response = await fetch(`${baseURL}categories?slug=${slug}`);
        return response.json();
    },

    async getCategoryById(id: number) {
        const response = await fetch(`${baseURL}categories/${id}`);
        return response.json();
    },

    async getCategoryPosts(id: number, per_page: number, offset: number = 0) {
      return await postsFetcher(`posts?categories=${id}`, per_page, offset);
    },

    async getAllCategories() {
      const allItems = await fetch(`${baseURL}categories?per_page=20`);
      return allItems.json();
    },
  // .Category

  // Post
    async getPostDetail(slug: string) {
      const response = await fetch(`${baseURL}posts?slug=${slug}&_embed`);
      return response.json();
    },
  // .Post

  // Search
    async getSearchPosts(query: string, per_page: number = 12) {
      return await postsFetcher(`posts?search=${query}`, per_page, 0);
    },
  // .Search

  // Tag
      async getTagInfo(slug: string) {
          const response = await fetch(`${baseURL}tags/?slug=${slug}`);
          return response.json();
      },

      async getTagInfoById(id: number) {
          const response = await fetch(`${baseURL}tags/${id}`);
          return response.json();
      },

      async getTagPosts(id: number, per_page: number, offset: number = 0) {
          return await postsFetcher(`posts?tag=${id}`, per_page, offset);
      },
  // .Tag

  // Page
      async getPage(slug: string): Promise<PageType> {
        const response = await fetch(`${baseURL}pages?slug=${slug}&_embed`);
        const responseJSON = await response.json();
        return responseJSON[0];
      },
  // .Page
};

export default fetchWebApi;
