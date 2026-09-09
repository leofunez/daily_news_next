// API
import fetchWebApi from "@/api/fetchWebApi";

// Navigation
import { notFound } from "next/navigation";

// Types
import type { JSX } from "react";
interface CategoryProps {
  params: Promise<{ slug: string }>;
}

// Components
import FeaturedCategory from "@/components/sections/FeaturedCategory/FeaturedCategory";
import GridList from "@/components/sections/GridList/GridList";

export const dynamic = 'force-dynamic';

export default async function TagPage({ params }: CategoryProps): Promise<JSX.Element> {
  const { slug } = await params;
  const [tagInfo] = await fetchWebApi.getTagInfo(slug);

  if (!tagInfo) notFound();

  const tagId = tagInfo?.id;

  const [tagFeaturedPosts, tagListPosts] = await Promise.all([
    fetchWebApi.getTagPosts(tagId, 9, 0),
    fetchWebApi.getTagPosts(tagId, 24, 9)
  ]);

  return (
    <main className="page__content">
      <div className="wrapper">
        <FeaturedCategory name={slug} posts={tagFeaturedPosts} />
        <GridList posts={tagListPosts} />
      </div>
    </main>
  )
}
