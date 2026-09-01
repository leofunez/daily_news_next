// Types
import type { JSX } from "react";

// Styles
import styles from "./BreakingNews.module.css";

// Constants
import { BREAKING_NEWS } from "@/constants";
import Link from "next/link";

export default function BreakingNews(): JSX.Element {
  return (
    <section className={styles.container}>
      <div className={`wrapper ${styles.wrapper}`}>
        <span className={styles.title}>
          {BREAKING_NEWS}:
        </span>
        <Link className={`${styles.postLink} linkText`} href='/politics/duis-felis-urna-eleifend-eu-porta-sit-amet-tincidunt'>
          Mauris elementum lorem ut lacus accumsan ultrices massa dignissim
        </Link>
      </div>
    </section>
  )
}
