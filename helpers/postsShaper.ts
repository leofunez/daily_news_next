import type { PostResponseType, PostType } from "@/types/post.types";

// Helpers
import formatPostDate from "@/helpers/dateFormat";

export default async function postsShaper(posts: PostResponseType[]): Promise<PostType[]> {
  const shapedPosts = await Promise.all(
    posts?.map(async function (post: PostResponseType) {
      const category = post._embedded["wp:term"][0][0];
      const imageObj = post._embedded["wp:featuredmedia"][0];
      const videoField = post.ACF?.video_url ?? "";
      const subtitle = post.ACF?.subtitle ?? "";

      return {
        id: post.id,
        link: `/${category.slug}/${post.slug}`,
        title: post.title.rendered,
        subtitle,
        date: formatPostDate(post.date),
        category: category.name,
        category_slug: category.slug,
        video_field: videoField,
        thumbnail_featured: imageObj.media_details.sizes["featured-thumbnail"].source_url ?? imageObj.source_url,
        thumbnail_medium: imageObj.media_details.sizes["medium-thumbnail"].source_url ?? imageObj.source_url
      };
    })
  )

  return shapedPosts;
}

export async function postsFavShaper(posts: PostResponseType[]): Promise<PostType[]> {
  const shapedPosts = await Promise.all(
    posts?.map(async function (post: PostResponseType) {
      // Image
      const postImageSplitted = post?._links?.["wp:featuredmedia"]?.[0]?.href?.split('/') || '';
      const postImageId = postImageSplitted[postImageSplitted?.length - 1];
      const postImageObj = await fetch(`/api/wp/media/${postImageId}`);
      const postImageJson = await postImageObj.json();
      const postImageUrl = postImageJson.media_details.sizes.medium_large.source_url;

      // Category
      const postCategoryId = post?.categories?.[0];
      const postCategoryObj = await fetch(`/api/wp/categories/${postCategoryId}`);
      const postCategoryJson = await postCategoryObj.json();
      const {
        name: postCategoryName,
        slug: postCategorySlug
      } = postCategoryJson;

      // Video
      const postVideoUrl = post.ACF?.video_url;

      return {
        id: post.id,
        link: `/${postCategorySlug}/${post.slug}`,
        title: post.title.rendered,
        subtitle: post.title.rendered,
        date: formatPostDate(post.date),
        category: postCategoryName,
        category_slug: postCategorySlug,
        video_field: postVideoUrl,
        thumbnail_featured: postImageUrl,
        thumbnail_medium: postImageUrl
      }
    }),
  );

  return shapedPosts;
}
