// Types
import type { JSX } from "react";

// Styles
import styles from "./DateTime.module.css";

// Components
import IconDate from "@/components/icons/IconDate";

// Helpers
import formatPostDate from "@/helpers/dateFormat";

export default function DateTime({
    date,
    isShort,
    showIcon
}: {
    date: string,
    isShort?: boolean,
    showIcon?: boolean
  }): JSX.Element {
  if (!date) return <></>;

  return (
    <div className={styles.container}>
      {showIcon && (
        <IconDate />
      )}

      <time className={styles.time}>
        {formatPostDate(date)}
      </time>
    </div>
  )
}
