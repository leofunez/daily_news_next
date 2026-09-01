// Types
import type { JSX } from "react";

// Styles
import styles from "./SectionTitle.module.css";

export default function SectionTitle({ text, children }: { text: string, children?: JSX.Element }):JSX.Element {
  return (
    <div className={styles.container}>
      <h4 className={styles.text}>
        {text}
      </h4>

      {children && (
        <div className={styles.icon}>
          {children}
        </div>
      )}
    </div>
  )
}
