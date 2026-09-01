// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./MostPopular.module.css";

// Constants
import { MOST_POPULAR } from "@/constants";

// Components
import PostCardTrend from "@/components/ui/PostCard/PostCardTrend";
import IconTrending from "@/components/icons/IconTrending";
import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";

export default async function MostPopular(): Promise<JSX.Element> {
  const mostPopular = await fetchWebApi.getTendingPosts();

  return (
    <section className={styles.container}>
      {/* Header */}
        <div className={styles.header}>
          <SectionTitle text={MOST_POPULAR}>
            <IconTrending />
          </SectionTitle>

          <div className={styles.navigation}>
            <button className={styles.navigationButton}>
              <IconPrev size={28} />
            </button>
            <button className={styles.navigationButton}>
              <IconNext size={28} />
            </button>
          </div>
        </div>
      {/* .Header */}

      {/* Slider */}
        <div className={styles.slide}>
          <div className={styles.offset}>
            {mostPopular.map((post: PostType, index: number) => (
              // Item
                <PostCardTrend
                  key={post.id}
                  index={index + 1}
                  {...post}
                />
              // .Item
            ))}
          </div>
        </div>
      {/* .Slider */}
    </section>
  )
}
