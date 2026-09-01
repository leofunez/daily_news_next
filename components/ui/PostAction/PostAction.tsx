// Types
import type { JSX } from "react";

// Styles
import styles from "./PostAction.module.css";

// Components
import IconBookmark from "@/components/icons/IconBookmark";
import IconListen from "@/components/icons/IconListen";
import IconPrint from "@/components/icons/IconPrint";
import IconShare from "@/components/icons/IconShare";
import IconEmail from "@/components/icons/IconEmail";
import IconLink from "@/components/icons/IconLink";

export default function PostAction(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={`${styles.iconList} ${styles.right}`}>
        <button className={styles.action}>
          <IconListen />
          <p className={styles.actionText}>
            Listen
          </p>
        </button>

        <button className={styles.action}>
          <IconShare size={18} />
        </button>

        <button className={styles.action}>
          <IconPrint />
        </button>

        <button className={styles.action}>
          <IconBookmark />
        </button>

        <button className={styles.action}>
          <IconEmail />
        </button>

        <button className={styles.action}>
          <IconLink />
        </button>
      </div>
    </div>
  )
}
