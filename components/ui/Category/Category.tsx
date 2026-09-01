// Types
import type { JSX } from "react";

// Styles
import styles from "./Category.module.css";

// Components
import Link from "next/link";

export default function Category({ text, href }: { text: string, href: string }): JSX.Element {
  return (
    <Link href={href} className={styles.link}>
      {text}
    </Link>
  )
}
