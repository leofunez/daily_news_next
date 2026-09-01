// Types
import type { JSX } from "react";
import type { PostType } from "@/types/post.types";

// Styles
import styles from "./PostCard.module.css";

// Components
import Link from "next/link";
import Image from "next/image";
import PlayButton from "../PlayButton/PlayButton";
import Category from "../Category/Category";

export default function PostCard({
  isFeatured = false,
  isHorizontal = false,
  hideImage = false,
  hideCategory = false,
  isSmall = false,
  title,
  subtitle,
  thumbnail_featured,
  link,
  category,
  category_slug,
  video_field,
  date
}: PostType): JSX.Element {
  return (
    <article className={`
      ${styles.postCard}
      ${isHorizontal || isSmall ? styles.postCardHorizontal : ''}
    `}>
      {!hideImage && thumbnail_featured && (
        <Link
          href={link}
          className={`
            ${styles.imageContainer}
            ${isSmall ? styles.imageContainerSmall : ''}
          `}
        >
          <Image
            className={`
              ${isSmall ? styles.imageSmall : styles.image}
              ${isHorizontal ? styles.imageHorizontal : ''}
            `}
            src={thumbnail_featured}
            alt={title}
            width={300}
            height={180}
            sizes="(max-width: 768px) 100vw, 768px"
            loading="eager"
            unoptimized
            // style={{ objectFit: 'cover' }}
            // fill
          />

          {!hideImage && video_field && (
            <PlayButton isLarge={isFeatured} />
          )}
        </Link>
      )}

      <div className={styles.info}>
        {!hideCategory && category && category_slug && (
          <Category text={category} href={category_slug} />
        )}

        {title && (
          <h2 className={`
            ${!isFeatured ? styles.listTitle : styles.featuredTitle}
            ${isSmall ? styles.listTitleSmall : ''}
          `}>
            <Link href={link} className="linkText">
              {title}
            </Link>
          </h2>
        )}

        {isFeatured && subtitle && (
          <p>
            {subtitle}
          </p>
        )}

        {!isSmall && date && (
          <time className={styles.dateTime}>
            {date}
          </time>
        )}
      </div>
    </article>
  )
}
