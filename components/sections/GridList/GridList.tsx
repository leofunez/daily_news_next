// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./GridList.module.css"

// Components
import PostCard from "@/components/ui/PostCard/PostCard";

export default function GridList({
  posts
}: {
  posts: PostType[]
}): JSX.Element | null{
  if (posts.length <= 0) return null;

  return (
    <section className={styles.container}>
      {posts.map((post: PostType) => (
        <PostCard
          key={post.id}
          {...post}
        />
      ))}
    </section>
  )
}
