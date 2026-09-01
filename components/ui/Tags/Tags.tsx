// Types
import type { JSX } from "react";
import type { TagType } from "@/types/tag.types";

// Styles
import styles from "./Tags.module.css";

// Components
import Link from "next/link";
import IconTag from "@/components/icons/IconTag";

export default function Tags({ tags }: { tags: TagType[] }): JSX.Element {
  if (tags?.length <= 0) return <></>

  return (
    <div className={styles.container}>
      <IconTag size={28} />

      {tags.map(({ id, name, slug }: TagType) => (
        <Link key={id} href={`/tag/${slug}`} className={styles.tag}>
          {name}
        </Link>
      ))}
    </div>
  )
}
