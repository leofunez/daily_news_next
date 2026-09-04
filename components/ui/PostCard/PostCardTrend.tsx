// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./PostCard.module.css"

// Components
import Link from "next/link";
import Image from "next/image";

export default function PostCardTrend({ index, title, category, thumbnail_featured, link, date }: PostType): JSX.Element {
  return (
    <Link href={link} className={styles.trendLink}>
      <article className={styles.trendContainer}>

        {thumbnail_featured && (
          <div className={styles.trendImage}>
            <Image
              src={thumbnail_featured}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
              className={styles.trendImageFill}
            />
          </div>
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
