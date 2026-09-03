// Types
import type { JSX } from "react";

// Styles
import styles from "./Message.module.css";

export default function Message({ text }: { text: string }): JSX.Element {
  return (
    <p className={styles.container}>
      {text}
    </p>
  )
}
