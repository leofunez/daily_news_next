// Constants
import { MAIN_URL } from "../constants";

// Helpers
import postsShaper from "@/helpers/postsShaper";

// Types
import type { PostResponseType, PostType } from "@/types/post.types";

export default async function postsFetcher(slug: string, amount: number, offset: number): Promise<PostType[]> {
  const baseURL = `${MAIN_URL}/wp-json/wp/v2/`;
  const formattedSlug = slug.includes('?') ? `${slug}&` : `${slug}?`;
  const params = `${formattedSlug}per_page=${amount}&offset=${offset}&_embed`

  const response = await fetch(`${baseURL}${params}`, { cache: 'no-store' });
  const jsonResponse: PostResponseType[] = await response.json();
  const shapedPosts: PostType[] = await postsShaper(jsonResponse);

  return shapedPosts;
}
