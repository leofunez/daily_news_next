// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./FeaturedCategory.module.css";

// Components
import PostCard from "@/components/ui/PostCard/PostCard";
import Divider from "@/components/ui/Divider/Divider";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";

export default function FeaturedCategory({ name, posts }:{ name: string, posts: PostType[]}): JSX.Element {
  const featuredPosts = posts.slice(0, 1);
  const featuredListPosts = posts.slice(1);

  return (
    <section className={styles.container}>
      {name && (
        <SectionTitle text={name} />
      )}

      <div className={styles.featuredContainer}>
        <div className={styles.mainPost}>
          <PostCard
            key={featuredPosts[0].id}
            isFeatured={true}
            hideImage={false}
            {...featuredPosts[0]}
          />
        </div>

        <div className={styles.listPosts}>
          {featuredListPosts.map((post: PostType) => (
            <div key={post.id} className={styles.listPostCard}>
              <PostCard isSmall={true} {...post} />
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </section>
  )
}
