// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./HorizontalList.module.css";

// Components
import PostCard from "@/components/ui/PostCard/PostCard";

export default function HorizontalList({ posts }:{ posts: PostType[] }): JSX.Element | null {
  if (posts.length <= 0) return null;

  return (
    <section className={styles.container}>
      {posts.map((post: PostType) => (
        <PostCard
          key={post.id}
          isFeatured={false}
          isHorizontal={true}
          {...post}
          />
      ))}
    </section>
  )
}
