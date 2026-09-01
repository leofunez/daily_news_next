// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";
interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// Components
import DateTime from "@/components/ui/DateTime/DateTime";
import Author from "@/components/ui/Author/Author";
import PostAction from "@/components/ui/PostAction/PostAction";
import Category from "@/components/ui/Category/Category";
import MinsRead from "@/components/ui/MinsRead/MinsRead";
import RelatedPosts from "@/components/sections/RelatedPosts/RelatedPosts";
import Divider from "@/components/ui/Divider/Divider";
import Tags from "@/components/ui/Tags/Tags";
import PostDetailImage from "@/components/ui/PostDetailImage/PostDetailImage";

export default async function PostDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const [postDetail] = await fetchWebApi.getPostDetail(slug);
  const {
    id: postId,
    date,
    title: {
      rendered: postTitle
    },
    ACF: {
      subtitle: postSubtitle,
      video_url: postVideoUrl
    },
    content: {
      rendered: postBody
    },
    _embedded: {
      "wp:featuredmedia": postImages,
      "wp:term": postTerms,
      author: postAuthors
    }
  } = postDetail;

  const postCategories = postTerms[0];
  const postTags = postTerms[1];

  return (
    <main className="page__content">
      <div className="wrapper">
        <div className="postDetailHeader">
          {postCategories?.[0] && postCategories[0]?.name && (
            <Category text={postCategories[0].name} href={`/${postCategories[0].slug}`} />
          )}

          {postTitle && (
            <h1 className="postDetailTitle">
              {postTitle}
            </h1>
          )}

          {postSubtitle && (
            <p className="postDetailSubtitle">
              {postSubtitle}
            </p>
          )}

          <div className="postDetailDateRead">
            <DateTime date={date} showIcon={true} />
            <MinsRead text="4 mins. read" />
          </div>

          <div className="postDetailAuthorAction">
            {postAuthors && postAuthors.length > 0 && (
              <Author
                photo={postAuthors[0].avatar_urls['96']}
                slug={postAuthors[0].slug}
                name={postAuthors[0].name}
              />
            )}

            <PostAction />
          </div>
        </div>

        {postImages[0]?.source_url && (
          <PostDetailImage
            imageUrl={postImages[0].source_url}
            imageAlt={postTitle}
            videoUrl={postVideoUrl}
          />
        )}

        {postBody && (
          <div className="postDetailBody">
            <div dangerouslySetInnerHTML={{ __html: postBody }} />
            <Tags tags={postTags} />
          </div>
        )}

        <Divider />

        {postCategories?.[0]?.id && (
          <RelatedPosts categoryId={postCategories[0].id} postId={postId} />
        )}
      </div>
    </main>
  )
}
