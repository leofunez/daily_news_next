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
