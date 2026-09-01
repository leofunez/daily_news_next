// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./PostCard.module.css"

// Components
import Link from "next/link";
import PlayButton from "../PlayButton/PlayButton";

export default function PostCardTrend({ index, title, category, thumbnail_featured, link, video_field, date }: PostType): JSX.Element {
  const inlineStyles = {
    backgroundImage: `url(${thumbnail_featured})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  return (
    <Link href={link} className={styles.trendLink}>
      <article className={styles.trendContainer}>

        {thumbnail_featured && (
          <div style={inlineStyles} className={styles.trendImage}></div>
        )}

        {index && (
          <div className={styles.trendCounter}>
            {index < 9 ? `0${index}` : `${index}`}
          </div>
        )}

        <div className={styles.trendInfo}>
          {title && (
            <h2 className={styles.trendTitle}>
              {title}
            </h2>
          )}

          <div className={styles.trendFooter}>
            {category && (
              <p className={`${styles.category} ${styles.trendCategory}`}>
                {category}
              </p>
            )}

            {date && (
              <time className={styles.trendDate}>{date}</time>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
