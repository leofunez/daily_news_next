// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";

// Styles
import styles from "./StaticPage.module.css";

export default async function StaticPage({ slug }: { slug: string }): Promise<JSX.Element> {
  const {
    title: {
      rendered: title
    },
    content: {
      rendered: body
    }
  } = await fetchWebApi.getPage(slug);

  return (
    <main className={styles.page}>
      <div className="wrapper">
        {title && (
          <h1 className={styles.title}>
            {title}
          </h1>
        )}

        {body && (
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
        )}
      </div>
    </main>
  )
}
