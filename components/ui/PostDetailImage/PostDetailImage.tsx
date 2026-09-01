'use client';

// Types
import type { JSX } from "react";

// Styles
import styles from "./PostImage.module.css";

// Components
import Image from "next/image";
import PlayButton from "../PlayButton/PlayButton";

export default function PostDetailImage({ imageUrl, imageAlt, videoUrl }: { imageUrl: string, imageAlt: string, videoUrl?: string }): JSX.Element {
  function handlePlay() {
    if (!videoUrl) return;

    const videoIframe = document.createElement('iframe');
    const videoId = videoUrl.replace('https://www.youtube.com/watch?v=', '');
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?feature=oembed`;
    videoIframe.title = imageAlt;
    videoIframe.loading = "lazy";
    videoIframe.allowFullscreen = true;
    videoIframe.referrerPolicy = "strict-origin-when-cross-origin";
    videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    videoIframe.classList.add("postDetailPhotoIframe");

    console.log(videoIframe)

    const imageContainer = document.querySelector(".postDetailPhoto");
    imageContainer?.appendChild(videoIframe);
  }

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

      {videoUrl && (
        <div className={styles.playButton} onClick={handlePlay}>
          <PlayButton isLarge={true} />
        </div>
      )}
    </div>
  )
}
