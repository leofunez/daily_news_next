'use client';

import { useState } from "react";

// Types
import type { JSX } from "react";

// Styles
import styles from "./PostImage.module.css";

// Components
import Image from "next/image";
import PlayButton from "../PlayButton/PlayButton";

export default function PostDetailImage({ imageUrl, imageAlt, videoUrl }: { imageUrl: string, imageAlt: string, videoUrl?: string }): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay() {
    if (!videoUrl) return;
    setIsPlaying(true);
  }

  const videoId = videoUrl?.replace('https://www.youtube.com/watch?v=', '');
  const iframeSrc = videoId ? `https://www.youtube.com/embed/${videoId}?feature=oembed&autoplay=1` : '';

  return (
    <div className={`${styles.container} postDetailPhoto`}>
      {imageUrl && (
        <Image
          className={styles.img}
          src={imageUrl}
          width={780}
          height={500}
          alt={imageAlt}
          unoptimized
        />
      )}

      {videoUrl && !isPlaying && (
        <div className={styles.playButton} onClick={handlePlay}>
          <PlayButton isLarge={true} />
        </div>
      )}

      {isPlaying && iframeSrc && (
        <iframe
          className={styles.postDetailPhotoIframe}
          src={iframeSrc}
          title={imageAlt}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
    </div>
  )
}
