// Types
import type { JSX } from "react";
interface SearchParamsType {
  searchParams: Promise<{ s?: string }>
}

// Constants
import { SEARCH_RESULTS } from "@/constants";

// Components
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import { PostType } from "@/types/post.types";
import fetchWebApi from "@/api/fetchWebApi";
import GridList from "@/components/sections/GridList/GridList";
import SearchForm from "@/components/ui/SearchForm/SearchForm";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: SearchParamsType): Promise<JSX.Element> {
  const params = await searchParams;
  const searchQuery = params.s?.replace(/['"]/g, "").trim() || "";

  let posts: PostType[] = []

  if (searchQuery) {
    posts = await fetchWebApi.getSearchPosts(searchQuery);
  }

  return (
    <main className="page__content searchPage">
      <div className="wrapper">
        <div className="searchPageTop">
          <SectionTitle text="Search" />

          <SearchForm />

          {searchQuery && (
            <p className="searchPageResults">
              {SEARCH_RESULTS}: <strong>
                {searchQuery}
              </strong>
            </p>
          )}
        </div>

        {posts.length > 0 && (
          <GridList posts={posts} />
        )}
      </div>
    </main>
  )
}
