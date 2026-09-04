"use client";

// Store
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { setFavorite, selectFavorites } from "@/redux/slices/favoritesSlice";

// Types
import type { JSX } from "react";

// Styles
import styles from "./PostAction.module.css";

// Components
import IconBookmark from "@/components/icons/IconBookmark";

export default function BookmarkButton({ postId }: { postId: number }): JSX.Element {
  const storeFavorites = useSelector(selectFavorites);
  const storeDispatch = useAppDispatch();

  return (
    <button 
      className={styles.action} 
      onClick={() => storeDispatch(setFavorite(postId))}
    >
      <IconBookmark isActive={storeFavorites.includes(postId)} />
    </button>
  )
}