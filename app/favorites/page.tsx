"use client";

// Store
import { useSelector } from 'react-redux';
import { useGetPostsByIdsQuery } from "@/redux/api/wpApi";
import { selectFavorites } from "@/redux/slices/favoritesSlice";

// Types
import { type JSX } from "react";

// Components
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import GridList from "@/components/sections/GridList/GridList";
import Message from '@/components/ui/Message/Message';

// Constants
import { FAVORITES, FAVORITES_ERROR, FAVORITES_LOADING, FAVORITES_NO } from "@/constants";

export default function FavoritesPage(): JSX.Element {
  const favoritesIds = useSelector(selectFavorites);
  const {
    data: posts = [],
    isLoading,
    isError
  } = useGetPostsByIdsQuery(favoritesIds, {
    skip: favoritesIds.length === 0,
  });

  return (
    <main className="page-main">
      <div className="wrapper">
        <SectionTitle text={FAVORITES} />

        <div className="page-content">
          {isLoading && (
            <Message text={FAVORITES_LOADING} />
          )}

          {isError && (
            <Message text={FAVORITES_ERROR} />
          )}

          {favoritesIds.length === 0 ? (
            <Message text={FAVORITES_NO} />
          ) : (
            <GridList posts={posts} />
          )}
        </div>
      </div>
    </main>
  )
}
