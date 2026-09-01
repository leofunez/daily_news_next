// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";
interface CategoryProps {
  params: Promise<{ category: string }>;
}

// Components
import FeaturedCategory from "@/components/sections/FeaturedCategory/FeaturedCategory";
import GridList from "@/components/sections/GridList/GridList";

export default async function CategoryPage({ params }: CategoryProps): Promise<JSX.Element> {
  const { category }   = await params;
  const [categoryInfo] = await fetchWebApi.getCategoryInfo(category);
  const categoryId     = await categoryInfo?.id;
  const categoryFeaturedPosts  = await fetchWebApi.getCategoryPosts(categoryId, 9, 0);
  const categoryListPosts  = await fetchWebApi.getCategoryPosts(categoryId, 24, 9);

  return (
    <main className="page__content">
      <div className="wrapper">
        <FeaturedCategory name={category} posts={categoryFeaturedPosts} />

        <GridList posts={categoryListPosts} />
      </div>
    </main>
  )
}
