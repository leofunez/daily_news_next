// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";

// Styles
import styles from "./RelatedPosts.module.css";

// Components
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import GridList from "../GridList/GridList";

// Constants
import { RELATED_POSTS } from "@/constants";

export default async function RelatedPosts({ categoryId }:{ categoryId:number }): Promise<JSX.Element> {
  const posts = await fetchWebApi.getCategoryPosts(categoryId, 4);

  if (posts.length <= 0) return <></>

  return (
    <section className={styles.container}>
      <SectionTitle text={RELATED_POSTS} />

      <GridList posts={posts} />
    </section>
  )
}
