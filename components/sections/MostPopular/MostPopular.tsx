"use client";

import { useState, useEffect, useRef } from "react";

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

const ITEMS_PER_SLIDE_DESKTOP = 4;
const ITEM_WIDTH = 300;
const GAP = 40;

export default function MostPopular({ posts }: { posts: PostType[] }): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Calculate scroll amount per click
  const scrollAmount = isMobile 
    ? ITEM_WIDTH + GAP 
    : (ITEM_WIDTH + GAP) * ITEMS_PER_SLIDE_DESKTOP;

  const handleScroll = (direction: number) => {
    if (!scrollContainer.current) return;
    scrollContainer.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <SectionTitle text={MOST_POPULAR}>
          <IconTrending />
        </SectionTitle>

        <div className={styles.navigation}>
          <button 
            className={styles.navigationButton} 
            onClick={() => handleScroll(-1)}
            aria-label="Previous"
          >
            <IconPrev size={28} />
          </button>
          <button 
            className={styles.navigationButton} 
            onClick={() => handleScroll(1)}
            aria-label="Next"
          >
            <IconNext size={28} />
          </button>
        </div>
      </div>

      {/* Slider - CSS scroll-snap */}
      <div 
        className={styles.slide} 
        ref={scrollContainer}
        role="region"
        aria-label="Most popular posts carousel"
      >
        <div className={styles.track}>
          {posts.map((post: PostType, index: number) => (
            <PostCardTrend key={post.id} index={index + 1} {...post} />
          ))}
        </div>
      </div>
    </section>
  )
}