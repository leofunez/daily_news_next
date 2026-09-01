"use client";

import { useState, useEffect } from "react";

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

const ITEMS_PER_SLIDE_DESKTOP = 4;
const ITEMS_PER_SLIDE_MOBILE = 1;
const ITEM_WIDTH = 300;
const GAP = 40;

export default function MostPopular({ posts }: { posts: PostType[] }): JSX.Element {
  const [mostPopular] = useState<PostType[]>(posts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const itemsPerSlide = mobile ? ITEMS_PER_SLIDE_MOBILE : ITEMS_PER_SLIDE_DESKTOP;
      setTotalSlides(Math.ceil(mostPopular.length / itemsPerSlide));
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [mostPopular.length]);

  const itemsPerSlide = isMobile ? ITEMS_PER_SLIDE_MOBILE : ITEMS_PER_SLIDE_DESKTOP;
  const slideWidth = itemsPerSlide * ITEM_WIDTH + (itemsPerSlide - 1) * GAP;
  const maxSlides = Math.ceil(mostPopular.length / itemsPerSlide);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide((slideIndex + maxSlides) % maxSlides);
  };

  const handleNext = () => goToSlide(currentSlide + 1);
  const handlePrev = () => goToSlide(currentSlide - 1);

  const translateX = (-currentSlide * slideWidth) - (GAP * currentSlide-1);

  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <SectionTitle text={MOST_POPULAR}>
          <IconTrending />
        </SectionTitle>

        <div className={styles.navigation}>
          <button className={styles.navigationButton} onClick={handlePrev} aria-label="Previous">
            <IconPrev size={28} />
          </button>
          <button className={styles.navigationButton} onClick={handleNext} aria-label="Next">
            <IconNext size={28} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className={styles.slide}>
        <div
          className={styles.offset}
          style={{ transform: `translateX(${translateX}px)`, width: `${slideWidth * maxSlides}px` }}
        >
          {mostPopular.map((post: PostType, index: number) => (
            <PostCardTrend key={post.id} index={index + 1} {...post} />
          ))}
        </div>
      </div>
      {/* .Slider */}
    </section>
  )
}
