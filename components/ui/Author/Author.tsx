// Types
import type { JSX } from "react";
import type { AuthorType } from "@/types/author.types";

// Components
import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "./Author.module.css";

export default function Author({ photo, name, slug }: AuthorType): JSX.Element {
  return (
    <Link href={`/author/${slug}`} className={styles.container}>
      <Image
        className={styles.image}
        src={photo}
        height={96}
        width={96}
        alt={name}
        unoptimized
      />
      {name}
    </Link>
  )
}
