// Types
import type { JSX } from "react";

// Styles
import styles from "./PlayButton.module.css";

export default function PlayButton({ isLarge }: { isLarge: boolean }): JSX.Element {
  return (
    <button className={`${styles.container} ${isLarge ? styles.isLarge : ''}`}>
    </button>
  )
}
