"use client";

// Hooks
import { useEffect, useState } from "react";

// Store
import { useSelector } from 'react-redux';
import { useAppSelector } from "@/redux/hooks";
import { useGetFavoritesQuery } from "@/redux/api/favoritesApi";
import { selectFavorites } from "@/redux/slices/favoritesSlice";

// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import { type JSX } from "react";
import { PostType } from "@/types/post.types";

// Components
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import GridList from "@/components/sections/GridList/GridList";

// Constants
import { FAVORITES, FAVORITES_ERROR, FAVORITES_LOADING, FAVORITES_NO } from "@/constants";

export default function FavoritesPage(): JSX.Element {
  const favoritesIds = useSelector(selectFavorites);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favoritesIds.length === 0) return;

    let isMounted = true;

    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchWebApi.getPostsByIds(favoritesIds);

        if (isMounted) {
          setPosts(results);
        }
      } catch(err) {
        if (isMounted) {
          setError(FAVORITES_ERROR);
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, [favoritesIds]);

  return (
    <main className="page__content">
      <div className="wrapper">
        <SectionTitle text={FAVORITES} />

        {isLoading && (
          <p>{FAVORITES_LOADING}</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {favoritesIds.length === 0 ? (
          <p>{FAVORITES_NO}</p>
        ) : (
          <GridList posts={posts} />
        )}
      </div>
    </main>
  )
}
