// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./Featured.module.css";

// Components
import PostCard from "@/components/ui/PostCard/PostCard";

export default function Featured({posts }:{ posts: PostType[]}): JSX.Element {
  const featuredPosts = posts.slice(0, 5);
  const featuredListPosts = posts.slice(5);

  return (
    <section className={styles.container}>
      <div className={styles.leftContainer}>
        <PostCard
          key={featuredPosts[0].id}
          isFeatured={true}
          hideImage={false}
          {...featuredPosts[0]}
        />

        <div className={styles.middleContainer}>
          {featuredPosts.map(function (post: PostType, index: number) {
            if (index === 0) return null;

            return (
              <PostCard
                key={post.id}
                hideImage={true}
                {...post}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.rightContainer}>
        {featuredListPosts.map((post: PostType) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}
