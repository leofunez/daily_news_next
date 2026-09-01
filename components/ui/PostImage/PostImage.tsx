'use client';

// Types
import type { JSX } from "react";

// Components
import Image from "next/image";
import PlayButton from "../PlayButton/PlayButton";

export default function PostImage({ imageUrl, imageAlt, videoUrl }: { imageUrl: string, imageAlt: string, videoUrl?: string }): JSX.Element {
  function handlePlay() {
    if (!videoUrl) return;

    const videoIframe = document.createElement('iframe');
    // https://www.youtube.com/embed/GSzQowUHw70?feature=oembed
    const videoId = videoUrl.replace('https://www.youtube.com/watch?v=', '');
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?feature=oembed`;
    videoIframe.title = imageAlt;
    videoIframe.loading = "lazy";
    videoIframe.allowFullscreen = true;
    videoIframe.referrerPolicy = "strict-origin-when-cross-origin";
    videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    videoIframe.classList.add("postDetailPhotoIframe");

    const imageContainer = document.querySelector(".postDetailPhoto");
    imageContainer?.appendChild(videoIframe);
  }

  return (
    <div className="postDetailPhoto">
      {imageUrl && (
        <Image
          className="postDetailPhotoImg"
          src={imageUrl}
          width={780}
          height={500}
          alt={imageAlt}
          unoptimized
        />
      )}

      {videoUrl && (
        <div className="postDetailPhotoPlay" onClick={handlePlay}>
          <PlayButton isLarge={true} />
        </div>
      )}
    </div>
  )
}
