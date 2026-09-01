// Types
import type { JSX } from "react";

// Styles
import styles from "./MinsRead.module.css";

// Components
import IconClock from "@/components/icons/IconClock";

export default function MinsRead({ text }: { text: string }): JSX.Element {
  if (!text) return <></>

  return (
    <div className={styles.container}>
      <IconClock />

      <p className={styles.text}>
        {text}
      </p>
    </div>
  )
}
